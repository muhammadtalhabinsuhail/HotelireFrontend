"use client";

import { useVerification } from "../VerificationContext";
import { CheckCircle2 } from "lucide-react";

export default function ReviewContinue() {
  const { personalInfo, propertyTypeData, complianceData } = useVerification();

  return (
    <div className="max-w-3xl mx-auto">
      <h2
        className="text-2xl font-bold text-[#2e2e2e] mb-2"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Review & Continue
      </h2>
      <p
        className="text-gray-600 mb-8"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Please review your information before proceeding to Property Basics.
      </p>

      <div className="bg-white rounded-[10px] shadow-md p-6 md:p-8 space-y-6">
        {/* Personal Information Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3
              className="text-lg font-bold text-[#2e2e2e]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Personal Information
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
            <div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Legal Full Name
              </p>
              <p className="text-base font-semibold text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {personalInfo.legalFullName || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Display Name
              </p>
              <p className="text-base font-semibold text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {personalInfo.displayName || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Email Address
              </p>
              <p className="text-base font-semibold text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {personalInfo.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Mobile Number
              </p>
              <p className="text-base font-semibold text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {personalInfo.mobileNumber || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Property Type Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3
              className="text-lg font-bold text-[#2e2e2e]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Property Type & Documents
            </h3>
          </div>
          <div className="pl-7 space-y-3">
            <div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Property Type
              </p>
              <p className="text-base font-semibold text-[#2e2e2e] capitalize" style={{ fontFamily: 'Inter, sans-serif' }}>
                {propertyTypeData.propertyType === "hotel" ? "Hotel Business" : 
                 propertyTypeData.propertyType === "guesthouse" ? "Guest House (Home Owner)" : 
                 "Not selected"}
              </p>
            </div>
            
            {propertyTypeData.propertyType === "hotel" && propertyTypeData.businessLicense && (
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Business License
                </p>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <p className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {propertyTypeData.businessLicense.name}
                  </p>
                </div>
              </div>
            )}
            
            {propertyTypeData.propertyType === "guesthouse" && propertyTypeData.propertyOwnership && (
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Property Ownership Document
                </p>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <p className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {propertyTypeData.propertyOwnership.name}
                  </p>
                </div>
              </div>
            )}
            
            {propertyTypeData.governmentId && (
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Government Issued ID
                </p>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <p className="text-base font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {propertyTypeData.governmentId.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Compliance Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <h3
              className="text-lg font-bold text-[#2e2e2e]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Compliance Acknowledgements
            </h3>
          </div>
          <div className="pl-7 space-y-2">
            <div className="flex items-center gap-2">
              {complianceData.ownershipConfirmed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <p className="text-base text-green-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Property ownership confirmed
                  </p>
                </>
              ) : (
                <p className="text-base text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Property ownership not confirmed
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {complianceData.termsAccepted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <p className="text-base text-green-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Terms & Conditions accepted
                  </p>
                </>
              ) : (
                <p className="text-base text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Terms & Conditions not accepted
                </p>
              )}
            </div>
            
            {complianceData.notes && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Additional Notes
                </p>
                <p className="text-base text-[#2e2e2e] bg-gray-50 p-3 rounded-lg break-words whitespace-pre-wrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {complianceData.notes}
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
              Once you proceed to the next step, you'll be able to come back and edit this information anytime before final submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
