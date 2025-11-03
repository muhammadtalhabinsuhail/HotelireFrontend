"use client";

import { useVerification } from "../VerificationContext";

export default function ProgressIndicator() {
  const { currentStep, currentSubstep } = useVerification();

  const totalSubsteps = 4; // Both steps have 4 substeps
  const progress = ((currentSubstep - 1) / (totalSubsteps - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      {/* Step Circles */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          {/* Step 1 Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                currentStep >= 1
                  ? "bg-[#59A5B2] text-white shadow-[0_4px_16px_rgba(89,165,178,0.25)]"
                  : "bg-gray-200 text-gray-500"
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              1
            </div>
            <span
              className="text-xs mt-2 text-gray-600"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Ownership
            </span>
          </div>

          {/* Connecting Line */}
          <div className="w-24 h-1 mx-4 bg-gray-200 relative overflow-hidden rounded">
            <div
              className="absolute top-0 left-0 h-full bg-[#59A5B2] transition-all duration-500"
              style={{ width: currentStep >= 2 ? '100%' : '0%' }}
            />
          </div>

          {/* Step 2 Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                currentStep >= 2
                  ? "bg-[#59A5B2] text-white shadow-[0_4px_16px_rgba(89,165,178,0.25)]"
                  : "border-2 border-gray-300 text-gray-400"
              }`}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              2
            </div>
            <span
              className="text-xs mt-2 text-gray-600"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Property Basics
            </span>
          </div>
        </div>
      </div>

      {/* Substep Progress Bar (shown for both steps) */}
      <div className="w-full">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#59A5B2] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            Step {currentSubstep} of 4
          </span>
          <span className="text-xs text-[#59A5B2] font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
            {Math.round(progress)}% Complete
          </span>
        </div>
      </div>
    </div>
  );
}
