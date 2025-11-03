"use client";

import { useVerification } from "../VerificationContext";
import { useState, useRef } from "react";
import { Building2, Home, Upload, CheckCircle, X } from "lucide-react";

export default function PropertyTypeDocuments() {
  const { propertyTypeData, updatePropertyTypeData } = useVerification();
  const [uploading, setUploading] = useState<string>("");
  const [dragOver, setDragOver] = useState<string>("");
  
  // Refs to reset file inputs
  const businessLicenseRef = useRef<HTMLInputElement>(null);
  const propertyOwnershipRef = useRef<HTMLInputElement>(null);
  const governmentIdRef = useRef<HTMLInputElement>(null);

  const handlePropertyTypeSelect = (type: "hotel" | "guesthouse") => {
    updatePropertyTypeData({ propertyType: type });
  };

  const handleFileUpload = async (field: string, file: File | null) => {
    if (!file) return;

    setUploading(field);
    
    // Simulate file upload
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      updatePropertyTypeData({
        [field]: file,
        [`${field}Url`]: url
      });
      setUploading("");
    }, 1000);
  };

  const handleFileRemove = (field: string) => {
    updatePropertyTypeData({
      [field]: null,
      [`${field}Url`]: undefined
    });
    
    // Reset the corresponding file input
    if (field === 'businessLicense' && businessLicenseRef.current) {
      businessLicenseRef.current.value = '';
    } else if (field === 'propertyOwnership' && propertyOwnershipRef.current) {
      propertyOwnershipRef.current.value = '';
    } else if (field === 'governmentId' && governmentIdRef.current) {
      governmentIdRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(field);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver("");
  };

  const handleDrop = (e: React.DragEvent, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver("");
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(field, files[0]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2
        className="text-2xl font-bold text-[#2e2e2e] mb-2"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Property Type & Documents
      </h2>
      <p
        className="text-gray-600 mb-8"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Select your property type and upload the required documents.
      </p>

      {/* Property Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Hotel Business Card */}
        <button
          onClick={() => handlePropertyTypeSelect("hotel")}
          className={`p-6 rounded-[10px] border-2 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${
            propertyTypeData.propertyType === "hotel"
              ? "border-[#59A5B2] shadow-[0_4px_16px_rgba(89,165,178,0.25)] bg-[#59A5B2]/5"
              : "border-gray-300 opacity-70 hover:opacity-100"
          }`}
          data-testid="button-hotel"
        >
          <Building2
            className={`w-12 h-12 mb-4 mx-auto ${
              propertyTypeData.propertyType === "hotel" ? "text-[#59A5B2]" : "text-gray-400"
            }`}
          />
          <h3
            className="text-lg font-bold text-[#2e2e2e] mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Hotel Business
          </h3>
          <p
            className="text-sm text-gray-600"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Commercial hotel property
          </p>
        </button>

        {/* Guest House Card */}
        <button
          onClick={() => handlePropertyTypeSelect("guesthouse")}
          className={`p-6 rounded-[10px] border-2 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${
            propertyTypeData.propertyType === "guesthouse"
              ? "border-[#59A5B2] shadow-[0_4px_16px_rgba(89,165,178,0.25)] bg-[#59A5B2]/5"
              : "border-gray-300 opacity-70 hover:opacity-100"
          }`}
          data-testid="button-guesthouse"
        >
          <Home
            className={`w-12 h-12 mb-4 mx-auto ${
              propertyTypeData.propertyType === "guesthouse" ? "text-[#59A5B2]" : "text-gray-400"
            }`}
          />
          <h3
            className="text-lg font-bold text-[#2e2e2e] mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Guest House
          </h3>
          <p
            className="text-sm text-gray-600"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Home owner property
          </p>
        </button>
      </div>

      {/* Conditional Document Upload Sections */}
      {propertyTypeData.propertyType && (
        <div className="bg-white rounded-[10px] shadow-md p-6 md:p-8 space-y-6">
          {/* Hotel Business License */}
          {propertyTypeData.propertyType === "hotel" && (
            <div>
              <label
                className="block text-sm font-semibold text-[#2e2e2e] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Business License <span className="text-red-500">*</span>
              </label>
              <div 
                className={`border-2 border-dashed rounded-[10px] p-6 text-center transition-colors ${
                  dragOver === 'businessLicense' 
                    ? 'border-[#59A5B2] bg-[#59A5B2]/5' 
                    : 'border-gray-300 hover:border-[#59A5B2]'
                }`}
                onDragOver={(e) => handleDragOver(e, 'businessLicense')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'businessLicense')}
              >
                <input
                  ref={businessLicenseRef}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload('businessLicense', e.target.files?.[0] || null)}
                  className="hidden"
                  id="business-license"
                  data-testid="upload-business-license"
                />
                {propertyTypeData.businessLicense ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-6 h-6" />
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>
                        {propertyTypeData.businessLicense.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleFileRemove('businessLicense')}
                      className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                      data-testid="remove-business-license"
                      type="button"
                    >
                      <X className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="business-license" className="cursor-pointer block">
                    <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {uploading === 'businessLicense' ? 'Uploading...' : 'Click or drag & drop to upload PDF'}
                    </p>
                    <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Maximum file size: 5 MB
                    </p>
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Guest House Property Ownership */}
          {propertyTypeData.propertyType === "guesthouse" && (
            <div>
              <label
                className="block text-sm font-semibold text-[#2e2e2e] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Residential Property Ownership <span className="text-red-500">*</span>
              </label>
              <div 
                className={`border-2 border-dashed rounded-[10px] p-6 text-center transition-colors ${
                  dragOver === 'propertyOwnership' 
                    ? 'border-[#59A5B2] bg-[#59A5B2]/5' 
                    : 'border-gray-300 hover:border-[#59A5B2]'
                }`}
                onDragOver={(e) => handleDragOver(e, 'propertyOwnership')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'propertyOwnership')}
              >
                <input
                  ref={propertyOwnershipRef}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload('propertyOwnership', e.target.files?.[0] || null)}
                  className="hidden"
                  id="property-ownership"
                  data-testid="upload-property-ownership"
                />
                {propertyTypeData.propertyOwnership ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-6 h-6" />
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>
                        {propertyTypeData.propertyOwnership.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleFileRemove('propertyOwnership')}
                      className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                      data-testid="remove-property-ownership"
                      type="button"
                    >
                      <X className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="property-ownership" className="cursor-pointer block">
                    <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {uploading === 'propertyOwnership' ? 'Uploading...' : 'Click or drag & drop to upload PDF'}
                    </p>
                    <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Maximum file size: 5 MB
                    </p>
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Government Issued ID */}
          <div>
            <label
              className="block text-sm font-semibold text-[#2e2e2e] mb-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Government Issued ID <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Driving License, Passport, or Health Card
            </p>
            <div 
              className={`border-2 border-dashed rounded-[10px] p-6 text-center transition-colors ${
                dragOver === 'governmentId' 
                  ? 'border-[#59A5B2] bg-[#59A5B2]/5' 
                  : 'border-gray-300 hover:border-[#59A5B2]'
              }`}
              onDragOver={(e) => handleDragOver(e, 'governmentId')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'governmentId')}
            >
              <input
                ref={governmentIdRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload('governmentId', e.target.files?.[0] || null)}
                className="hidden"
                id="government-id"
                data-testid="upload-government-id"
              />
              {propertyTypeData.governmentId ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>
                      {propertyTypeData.governmentId.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleFileRemove('governmentId')}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                    data-testid="remove-government-id"
                    type="button"
                  >
                    <X className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                  </button>
                </div>
              ) : (
                <label htmlFor="government-id" className="cursor-pointer block">
                  <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {uploading === 'governmentId' ? 'Uploading...' : 'Click or drag & drop to upload image'}
                  </p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                    JPG, JPEG, or PNG • Maximum file size: 1 MB
                  </p>
                </label>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
