"use client";

import { useVerification } from "../VerificationContext";

export default function ComplianceNotes() {
  const { complianceData, updateComplianceData } = useVerification();

  const handleCheckboxChange = (field: string, checked: boolean) => {
    updateComplianceData({ [field]: checked });
  };

  const handleNotesChange = (value: string) => {
    if (value.length <= 150) {
      updateComplianceData({ notes: value });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2
        className="text-2xl font-bold text-[#2e2e2e] mb-2"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Compliance & Notes
      </h2>
      <p
        className="text-gray-600 mb-8"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Please confirm your ownership and agreement to our terms.
      </p>

      <div className="bg-white rounded-[10px] shadow-md p-6 md:p-8 space-y-6">
        {/* Ownership Confirmation */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="ownership-confirmed"
            checked={complianceData.ownershipConfirmed}
            onChange={(e) => handleCheckboxChange('ownershipConfirmed', e.target.checked)}
            className="w-5 h-5 mt-1 rounded border-gray-300 text-[#59A5B2] focus:ring-[#59A5B2] cursor-pointer"
            data-testid="checkbox-ownership"
          />
          <label
            htmlFor="ownership-confirmed"
            className="text-base text-[#2e2e2e] cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span className="font-semibold">I confirm I own this property.</span>
            <span className="text-red-500 ml-1">*</span>
            <p className="text-sm text-gray-600 mt-1">
              By checking this box, you certify that you are the legal owner or authorized representative of the property you are listing.
            </p>
          </label>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms-accepted"
            checked={complianceData.termsAccepted}
            onChange={(e) => handleCheckboxChange('termsAccepted', e.target.checked)}
            className="w-5 h-5 mt-1 rounded border-gray-300 text-[#59A5B2] focus:ring-[#59A5B2] cursor-pointer"
            data-testid="checkbox-terms"
          />
          <label
            htmlFor="terms-accepted"
            className="text-base text-[#2e2e2e] cursor-pointer"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span className="font-semibold">I agree to all Terms & Conditions.</span>
            <span className="text-red-500 ml-1">*</span>
            <p className="text-sm text-gray-600 mt-1">
              You agree to comply with all{" "}
              <a href="/terms" className="text-[#59A5B2] underline hover:text-[#4a8a95]">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-[#59A5B2] underline hover:text-[#4a8a95]">
                Privacy Policy
              </a>
              .
            </p>
          </label>
        </div>

        {/* Optional Notes */}
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-semibold text-[#2e2e2e] mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Additional Notes <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            id="notes"
            value={complianceData.notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Any additional information you'd like to share with us..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent resize-none text-base"
            style={{ fontFamily: 'Inter, sans-serif' }}
            maxLength={150}
            data-testid="textarea-notes"
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              Maximum 150 characters
            </p>
            <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              {complianceData.notes.length}/150
            </p>
          </div>
        </div>

        {/* Warning Message */}
        {(!complianceData.ownershipConfirmed || !complianceData.termsAccepted) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-[10px]">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-yellow-800" style={{ fontFamily: 'Inter, sans-serif' }}>
                You must confirm both checkboxes above to proceed to the next step.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
