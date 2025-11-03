"use client";

import { useVerification } from "../VerificationContext";
import { CheckCircle2 } from "lucide-react";

export default function PropertyBasicsReview() {
  const { propertyBasics } = useVerification();

  return (
    <div className="max-w-3xl mx-auto">
      <h2
        className="text-2xl font-bold text-[#2e2e2e] mb-2"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Review Property Basics
      </h2>
      <p
        className="text-gray-600 mb-8"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Please review your property information before final submission.
      </p>

      <div className="bg-white rounded-[10px] shadow-md p-6 md:p-8 space-y-6">
        {/* Property Information Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3
              className="text-lg font-bold text-[#2e2e2e]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Property Information
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
            <div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Property Type
              </p>
              <p className="text-base font-semibold text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {propertyBasics.propertyType || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Property Name
              </p>
              <p className="text-base font-semibold text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {propertyBasics.propertyName || "Not provided"}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Full Address
              </p>
              <p className="text-base font-semibold text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {propertyBasics.street && propertyBasics.city && propertyBasics.province
                  ? `${propertyBasics.street}, ${propertyBasics.city}, ${propertyBasics.province}${propertyBasics.postalCode ? `, ${propertyBasics.postalCode}` : ''}, Canada`
                  : "Not provided"}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Amenities & Safety Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3
              className="text-lg font-bold text-[#2e2e2e]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Amenities & Safety
            </h3>
          </div>
          <div className="pl-7 space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Selected Amenities {propertyBasics.amenities.length > 0 && `(${propertyBasics.amenities.length})`}
              </p>
              {propertyBasics.amenities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {propertyBasics.amenities.map(amenity => (
                    <span
                      key={amenity}
                      className="px-3 py-1 bg-[#59A5B2]/10 text-[#59A5B2] rounded-full text-sm font-medium"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-base text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                  No amenities selected
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                {propertyBasics.familyFriendly ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <p className="text-base text-green-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Family Friendly
                    </p>
                  </>
                ) : (
                  <p className="text-base text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Not Family Friendly
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {propertyBasics.petsAllowed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <p className="text-base text-green-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Pets Allowed
                    </p>
                  </>
                ) : (
                  <p className="text-base text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    No Pets
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Policies Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3
              className="text-lg font-bold text-[#2e2e2e]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Policies
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
            <div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Check-in Time
              </p>
              <p className="text-base font-semibold text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {propertyBasics.checkInTime || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Check-out Time
              </p>
              <p className="text-base font-semibold text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {propertyBasics.checkOutTime || "Not set"}
              </p>
            </div>
            
            {propertyBasics.houseRules && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  House Rules
                </p>
                <p className="text-base text-[#2e2e2e] bg-gray-50 p-3 rounded-lg break-words whitespace-pre-wrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {propertyBasics.houseRules}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-[10px]">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-800" style={{ fontFamily: 'Inter, sans-serif' }}>
              Once you submit, your verification will be reviewed by our team. You can edit this information later from your dashboard if needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
