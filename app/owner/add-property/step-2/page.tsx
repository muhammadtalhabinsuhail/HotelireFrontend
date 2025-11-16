"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProperty } from "../PropertyContext";
import { ProgressSteps } from "../components/ProgressSteps";
import { PROPERTY_CLASSIFICATIONS } from "@/types/property";
import { ChevronDown, Upload, X, Image as ImageIcon, ArrowLeft } from "lucide-react";

type PhotoKey = "featured" | "photo2" | "photo3" | "photo4" | "photo5";

export default function Step2Page() {
  const router = useRouter();
  const { details, setDetails, nextStep, prevStep, saveAsDraft } = useProperty();
  
  const [formData, setFormData] = useState({
    classification: details.classification,
    title: details.title,
    subtitle: details.subtitle,
    propertyName: details.propertyName,
    googleMapLink: details.googleMapLink,
  });
  
  const [photos, setPhotos] = useState(details.photos);
  const [photoPreviews, setPhotoPreviews] = useState(details.photoPreviews);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragTarget, setDragTarget] = useState<PhotoKey | null>(null);

  const photoLabels: Record<PhotoKey, string> = {
    featured: "Featured Photo *",
    photo2: "Photo 2",
    photo3: "Photo 3",
    photo4: "Photo 4",
    photo5: "Photo 5",
  };

  const handlePhotoUpload = (key: PhotoKey, file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, [key]: "Only image files are accepted" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors({ ...errors, [key]: "Image must be less than 10MB" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotos({ ...photos, [key]: file });
      setPhotoPreviews({ ...photoPreviews, [key]: e.target?.result as string });
      setErrors({ ...errors, [key]: "" });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (key: PhotoKey) => {
    setPhotos({ ...photos, [key]: null });
    setPhotoPreviews({ ...photoPreviews, [key]: "" });
  };

  const validateGoogleMapsURL = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('google.com') && 
             (url.includes('maps.google.com') || url.includes('www.google.com/maps'));
    } catch {
      return false;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.classification) newErrors.classification = "Classification is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.subtitle) newErrors.subtitle = "Subtitle is required";
    else if (formData.subtitle.length > 150) newErrors.subtitle = "Maximum 150 characters";
    if (!formData.propertyName) newErrors.propertyName = "Property name is required";
    if (!formData.googleMapLink) {
      newErrors.googleMapLink = "Google Map link is required";
    } else if (!validateGoogleMapsURL(formData.googleMapLink)) {
      newErrors.googleMapLink = "Please enter a valid Google Maps URL";
    }
    if (!photos.featured) newErrors.featured = "Featured photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canProceed = () => {
    return (
      formData.classification &&
      formData.title &&
      formData.subtitle &&
      formData.subtitle.length <= 150 &&
      formData.propertyName &&
      formData.googleMapLink &&
      validateGoogleMapsURL(formData.googleMapLink) &&
      photos.featured
    );
  };

  const handleNext = () => {
    if (!validateForm()) return;

    setDetails({
      ...details,
      classification: formData.classification,
      title: formData.title,
      subtitle: formData.subtitle,
      propertyName: formData.propertyName,
      googleMapLink: formData.googleMapLink,
      photos,
      photoPreviews,
    });

    nextStep();
    router.push("/owner/add-property/step-3");
  };

  const handleBack = () => {
    setDetails({
      ...details,
      classification: formData.classification,
      title: formData.title,
      subtitle: formData.subtitle,
      propertyName: formData.propertyName,
      googleMapLink: formData.googleMapLink,
      photos,
      photoPreviews,
    });
    prevStep();
    router.push("/owner/add-property/step-1");
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
          <ProgressSteps currentStep={2} totalSteps={3} />
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
                data-testid="heading-step2"
              >
                Tell us about your property
              </h1>
              <p
                className="text-lg md:text-xl text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Basic information like classification, title, subtitle, location and photos
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Property Classification */}
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Property Classification *
                </label>
                <div className="relative">
                  <select
                    value={formData.classification}
                    onChange={(e) => {
                      setFormData({ ...formData, classification: e.target.value });
                      setErrors({ ...errors, classification: "" });
                    }}
                    className={`w-full h-12 px-4 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all ${
                      errors.classification ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    data-testid="select-classification"
                  >
                    <option value="">Select classification</option>
                    {PROPERTY_CLASSIFICATIONS.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.classification && (
                  <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {errors.classification}
                  </p>
                )}
              </div>

              {/* Property Title */}
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Property Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    setErrors({ ...errors, title: "" });
                  }}
                  placeholder="e.g., Cozy Downtown Apartment"
                  className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  data-testid="input-title"
                />
                {errors.title && (
                  <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Property Subtitle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    className="text-sm font-medium text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Property Subtitle *
                  </label>
                  <span
                    className="text-xs text-gray-500"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {formData.subtitle.length}/150
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => {
                    setFormData({ ...formData, subtitle: e.target.value });
                    setErrors({ ...errors, subtitle: "" });
                  }}
                  placeholder="Short tagline"
                  maxLength={150}
                  className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all ${
                    errors.subtitle ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  data-testid="input-subtitle"
                />
                {errors.subtitle && (
                  <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {errors.subtitle}
                  </p>
                )}
              </div>

              {/* Property Name */}
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Property Name *
                </label>
                <input
                  type="text"
                  value={formData.propertyName}
                  onChange={(e) => {
                    setFormData({ ...formData, propertyName: e.target.value });
                    setErrors({ ...errors, propertyName: "" });
                  }}
                  placeholder="e.g., John Doe's Property"
                  className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all ${
                    errors.propertyName ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  data-testid="input-property-name"
                />
                {errors.propertyName && (
                  <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {errors.propertyName}
                  </p>
                )}
              </div>

              {/* Google Map Link */}
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Google Map Link *
                </label>
                <input
                  type="url"
                  value={formData.googleMapLink}
                  onChange={(e) => {
                    setFormData({ ...formData, googleMapLink: e.target.value });
                    setErrors({ ...errors, googleMapLink: "" });
                  }}
                  placeholder="https://maps.google.com/..."
                  className={`w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] transition-all ${
                    errors.googleMapLink ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  data-testid="input-map-link"
                />
                {errors.googleMapLink && (
                  <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {errors.googleMapLink}
                  </p>
                )}
              </div>

              {/* Property Photos */}
              <div className="pt-6 space-y-4">
                <h3
                  className="text-lg font-semibold text-gray-900"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Property Photos
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(Object.keys(photoLabels) as PhotoKey[]).map((key) => (
                    <div key={key} className="space-y-2">
                      <label
                        className="text-sm font-medium text-gray-700"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {photoLabels[key]}
                      </label>
                      
                      {!photoPreviews[key] ? (
                        <div
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragTarget(null);
                            const file = e.dataTransfer.files[0];
                            if (file) handlePhotoUpload(key, file);
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragTarget(key);
                          }}
                          onDragLeave={() => setDragTarget(null)}
                          className={`relative aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                            dragTarget === key
                              ? "border-[#59A5B2] bg-[#59A5B2]/5"
                              : "border-gray-300 hover:border-[#59A5B2] hover:bg-gray-50"
                          }`}
                          data-testid={`upload-${key}`}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handlePhotoUpload(key, file);
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Upload className="w-8 h-8 text-[#59A5B2] mb-2" />
                          <p
                            className="text-xs text-gray-600 text-center px-2"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Drop image or click
                          </p>
                        </div>
                      ) : (
                        <div className="relative aspect-video rounded-lg overflow-hidden group">
                          <img
                            src={photoPreviews[key]}
                            alt={photoLabels[key]}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removePhoto(key)}
                            className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            data-testid={`button-remove-${key}`}
                          >
                            <X className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>
                      )}
                      
                      {errors[key] && (
                        <p className="text-xs text-red-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {errors[key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="hidden lg:block sticky top-32">
            <div className="bg-gradient-to-br from-[#59A5B2]/10 to-[#59A5B2]/5 rounded-2xl p-12 flex items-center justify-center min-h-[500px]">
              <div className="text-center">
                <ImageIcon className="w-32 h-32 text-[#59A5B2] mx-auto mb-6" />
                <p
                  className="text-xl text-gray-600"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Showcase your property with beautiful photos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 h-12 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex items-center gap-3">
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
    </div>
  );
}
