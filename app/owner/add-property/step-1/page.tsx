"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProperty } from "../PropertyContext";
import { ProgressSteps } from "../components/ProgressSteps";
import { provinceToCities } from "@/lib/province-to-cities";
import {
  CA_PROVINCES,
  validateCanadianAddress,
  validateCanadianPostal,
  formatPostalCode,
} from "@/lib/addressValidation";
import { OWNERSHIP_DOCUMENT_TYPES } from "@/types/property";
import { ChevronDown, Upload, X, MapPin, Home } from "lucide-react";

export default function Step1Page() {
  const router = useRouter();
  const { location, setLocation, nextStep, saveAsDraft } = useProperty();
  
  const [selectedOption, setSelectedOption] = useState<1 | 2 | null>(
    location.useProfileAddress ? 1 : location.province ? 2 : null
  );
  const [formData, setFormData] = useState({
    province: location.province,
    city: location.city,
    street: location.street,
    postalCode: location.postalCode,
    documentType: location.ownershipDocument?.type || "",
    documentFile: location.ownershipDocument?.file || null,
    documentPreview: location.ownershipDocument?.preview || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  // Profile address (mock data - in production, fetch from user profile)
  const profileAddress = {
    street: "123 Main Street",
    city: "Toronto",
    province: "Ontario",
    postalCode: "M5H 2N2",
  };

  const cities = formData.province ? provinceToCities[formData.province] || [] : [];

  const handleOptionSelect = (option: 1 | 2) => {
    setSelectedOption(option);
    setErrors({});
    
    if (option === 1) {
      // Use profile address
      setFormData({
        ...formData,
        province: profileAddress.province,
        city: profileAddress.city,
        street: profileAddress.street,
        postalCode: profileAddress.postalCode,
        documentType: "",
        documentFile: null,
        documentPreview: "",
      });
    } else {
      // Reset for new location
      setFormData({
        province: "",
        city: "",
        street: "",
        postalCode: "",
        documentType: "",
        documentFile: null,
        documentPreview: "",
      });
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type !== "application/pdf") {
      setErrors({ ...errors, document: "Only PDF files are accepted" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, document: "File size must be less than 5MB" });
      return;
    }

    setFormData({
      ...formData,
      documentFile: file,
      documentPreview: file.name,
    });
    setErrors({ ...errors, document: "" });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const removeDocument = () => {
    setFormData({
      ...formData,
      documentFile: null,
      documentPreview: "",
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (selectedOption === 2) {
      if (!formData.province) newErrors.province = "Province is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.street) {
        newErrors.street = "Street address is required";
      } else if (!validateCanadianAddress(formData.street)) {
        newErrors.street = "Use a Canadian Street Address (e.g., 123 Queen Street W)";
      }
      if (!formData.postalCode) {
        newErrors.postalCode = "Postal code is required";
      } else if (!validateCanadianPostal(formData.postalCode)) {
        newErrors.postalCode = "Format: A1A 1A1";
      }
      if (!formData.documentType) newErrors.documentType = "Document type is required";
      if (!formData.documentFile) newErrors.document = "Ownership document is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canProceed = () => {
    if (!selectedOption) return false;
    if (selectedOption === 1) return true;
    
    return (
      formData.province &&
      formData.city &&
      formData.street &&
      validateCanadianAddress(formData.street) &&
      formData.postalCode &&
      validateCanadianPostal(formData.postalCode) &&
      formData.documentType &&
      formData.documentFile
    );
  };

  const handleNext = () => {
    if (!validateForm()) return;

    setLocation({
      useProfileAddress: selectedOption === 1,
      province: selectedOption === 1 ? profileAddress.province : formData.province,
      city: selectedOption === 1 ? profileAddress.city : formData.city,
      street: selectedOption === 1 ? profileAddress.street : formData.street,
      postalCode: selectedOption === 1 ? profileAddress.postalCode : formData.postalCode,
      ownershipDocument: selectedOption === 2 && formData.documentFile ? {
        type: formData.documentType,
        file: formData.documentFile,
        preview: formData.documentPreview,
      } : undefined,
    });

    nextStep();
    router.push("/owner/add-property/step-2");
  };

  const handleSaveExit = () => {
    saveAsDraft();
    router.push("/owner");
  };

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <ProgressSteps currentStep={1} totalSteps={3} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Form Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2e2e2e] leading-tight"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                data-testid="heading-step1"
              >
                Where would you like to list your property?
              </h1>
              <p
                className="text-lg md:text-xl text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Choose the location for your property listing
              </p>
            </div>

            {/* Option Cards */}
            <div className="space-y-4">
              {/* Option 1 - Profile Address */}
              <button
                onClick={() => handleOptionSelect(1)}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedOption === 1
                    ? "border-[#59A5B2] bg-[#59A5B2]/5 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
                data-testid="button-option-profile"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedOption === 1 ? "bg-[#59A5B2]" : "bg-gray-100"
                  }`}>
                    <Home className={`w-6 h-6 ${selectedOption === 1 ? "text-white" : "text-gray-500"}`} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-semibold text-gray-900 mb-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      I am going to list property where I live
                    </h3>
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      The address that I mentioned in my profile
                    </p>
                  </div>
                </div>
              </button>

              {/* Option 2 - New Location */}
              <button
                onClick={() => handleOptionSelect(2)}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedOption === 2
                    ? "border-[#59A5B2] bg-[#59A5B2]/5 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
                data-testid="button-option-new"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedOption === 2 ? "bg-[#59A5B2]" : "bg-gray-100"
                  }`}>
                    <MapPin className={`w-6 h-6 ${selectedOption === 2 ? "text-white" : "text-gray-500"}`} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-semibold text-gray-900 mb-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      I am going to list property to a new location
                    </h3>
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Enter a different address for this listing
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Option 1 Content - Profile Address (Readonly) */}
            {selectedOption === 1 && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4
                  className="text-base font-semibold text-gray-900 mb-4"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Your Profile Address
                </h4>
                <div className="space-y-2 text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <p>{profileAddress.street}</p>
                  <p>{profileAddress.city}, {profileAddress.province}</p>
                  <p>{profileAddress.postalCode}</p>
                </div>
              </div>
            )}

            {/* Option 2 Content - New Address Form */}
            {selectedOption === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Province */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Province *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.province}
                        onChange={(e) => {
                          setFormData({ ...formData, province: e.target.value, city: "" });
                          setErrors({ ...errors, province: "" });
                        }}
                        className={`w-full h-12 px-4 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all ${
                          errors.province ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        data-testid="select-province"
                      >
                        <option value="">Select province</option>
                        {CA_PROVINCES.map((prov) => (
                          <option key={prov} value={prov}>
                            {prov}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.province && (
                      <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.province}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      City *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.city}
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value });
                          setErrors({ ...errors, city: "" });
                        }}
                        disabled={!formData.province}
                        className={`w-full h-12 px-4 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        data-testid="select-city"
                      >
                        <option value="">Select city</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.city && (
                      <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                {/* Street Address */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => {
                      setFormData({ ...formData, street: e.target.value });
                      setErrors({ ...errors, street: "" });
                    }}
                    placeholder="e.g., 123 Queen Street W"
                    className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all ${
                      errors.street ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    data-testid="input-street"
                  />
                  {errors.street && (
                    <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {errors.street}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => {
                      const formatted = formatPostalCode(e.target.value);
                      setFormData({ ...formData, postalCode: formatted });
                      setErrors({ ...errors, postalCode: "" });
                    }}
                    placeholder="A1A 1A1"
                    maxLength={7}
                    className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all ${
                      errors.postalCode ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    data-testid="input-postal"
                  />
                  {errors.postalCode && (
                    <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                {/* Ownership Document Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h4
                    className="text-lg font-semibold text-gray-900 mb-4"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Ownership Document
                  </h4>

                  {/* Document Type */}
                  <div className="space-y-2 mb-4">
                    <label
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Document Type *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.documentType}
                        onChange={(e) => {
                          setFormData({ ...formData, documentType: e.target.value });
                          setErrors({ ...errors, documentType: "" });
                        }}
                        className={`w-full h-12 px-4 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all ${
                          errors.documentType ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        data-testid="select-document-type"
                      >
                        <option value="">Select document type</option>
                        {OWNERSHIP_DOCUMENT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.documentType && (
                      <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.documentType}
                      </p>
                    )}
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Upload Document (PDF, Max 5MB) *
                    </label>
                    
                    {!formData.documentFile ? (
                      <div
                        onDrop={handleDrop}
                        onDragOver={(e) => {
                          e.preventDefault();
                          if (formData.documentType) setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                          !formData.documentType
                            ? "bg-gray-50 border-gray-200 cursor-not-allowed"
                            : isDragging
                            ? "border-[#59A5B2] bg-[#59A5B2]/5"
                            : "border-gray-300 hover:border-[#59A5B2] hover:bg-gray-50 cursor-pointer"
                        }`}
                        data-testid="upload-document"
                      >
                        <input
                          type="file"
                          accept=".pdf"
                          disabled={!formData.documentType}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file);
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <Upload className={`w-12 h-12 mx-auto mb-4 ${
                          formData.documentType ? "text-[#59A5B2]" : "text-gray-300"
                        }`} />
                        <p
                          className="text-base font-medium text-gray-700 mb-1"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {formData.documentType
                            ? "Drop your PDF here or click to browse"
                            : "Select document type first"}
                        </p>
                        <p
                          className="text-sm text-gray-500"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          PDF only, maximum 5MB
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-1 flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 text-xs font-bold">PDF</span>
                          </div>
                          <span
                            className="text-sm text-gray-700 truncate"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {formData.documentPreview}
                          </span>
                        </div>
                        <button
                          onClick={removeDocument}
                          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                          data-testid="button-remove-document"
                        >
                          <X className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    )}
                    
                    {errors.document && (
                      <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {errors.document}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Illustration */}
          <div className="hidden lg:block sticky top-32">
            <div className="bg-gradient-to-br from-[#59A5B2]/10 to-[#59A5B2]/5 rounded-2xl p-12 flex items-center justify-center min-h-[500px]">
              <div className="text-center">
                <MapPin className="w-32 h-32 text-[#59A5B2] mx-auto mb-6" />
                <p
                  className="text-xl text-gray-600"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Choose your property location
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleSaveExit}
            className="px-6 h-12 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="button-save-exit"
          >
            Save & Exit
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-8 h-12 rounded-lg font-semibold transition-all ${
              canProceed()
                ? "bg-[#59A5B2] text-white hover:bg-[#4a8a95] shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="button-next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
