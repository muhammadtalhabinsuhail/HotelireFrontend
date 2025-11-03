"use client";

import { useVerification } from "../VerificationContext";
import { useState } from "react";

export default function PersonalInfo() {
  const { personalInfo, updatePersonalInfo } = useVerification();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    if (field === "legalFullName") {
      const cleaned = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 30);
      updatePersonalInfo({ [field]: cleaned });
    } else if (field === "displayName") {
      const cleaned = value.slice(0, 15);
      updatePersonalInfo({ [field]: cleaned });
    } else if (field === "mobileNumber") {
      // Extract only digits
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to 11 digits (1 for +1 and 10 for the number)
      const limited = digitsOnly.slice(0, 11);
      // Format as +1 XXX-XXX-XXXX
      let formatted = '+1';
      if (limited.length > 1) {
        formatted = '+1 ' + limited.slice(1, 4);
      }
      if (limited.length > 4) {
        formatted += '-' + limited.slice(4, 7);
      }
      if (limited.length > 7) {
        formatted += '-' + limited.slice(7, 11);
      }
      updatePersonalInfo({ [field]: formatted });
    } else {
      updatePersonalInfo({ [field]: value });
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2
        className="text-2xl font-bold text-[#2e2e2e] mb-2"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Personal & Contact Information
      </h2>
      <p
        className="text-gray-600 mb-8"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Please provide your accurate personal details for verification purposes.
      </p>

      <div className="bg-white rounded-[10px] shadow-md p-6 md:p-8 space-y-6">
        {/* Legal Full Name */}
        <div>
          <label
            className="block text-sm font-semibold text-[#2e2e2e] mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Legal Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.legalFullName}
            onChange={(e) => handleChange('legalFullName', e.target.value)}
            placeholder="Enter your full legal name"
            className="w-full h-14 px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent text-base"
            style={{ fontFamily: 'Inter, sans-serif' }}
            maxLength={30}
            data-testid="input-legal-name"
          />
          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Only alphabets allowed, max 30 characters ({personalInfo.legalFullName.length}/30)
          </p>
          {errors.legalFullName && (
            <p className="text-xs text-red-500 mt-1">{errors.legalFullName}</p>
          )}
        </div>

        {/* Display Name */}
        <div>
          <label
            className="block text-sm font-semibold text-[#2e2e2e] mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Display Name <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            value={personalInfo.displayName}
            onChange={(e) => handleChange('displayName', e.target.value)}
            placeholder="How should we display your name?"
            className="w-full h-14 px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent text-base"
            style={{ fontFamily: 'Inter, sans-serif' }}
            maxLength={15}
            data-testid="input-display-name"
          />
          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Maximum 15 characters ({personalInfo.displayName.length}/15)
          </p>
        </div>

        {/* Email */}
        <div>
          <label
            className="block text-sm font-semibold text-[#2e2e2e] mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={personalInfo.email}
            disabled
            className="w-full h-14 px-4 border border-gray-300 rounded-[10px] bg-gray-100 text-gray-600 cursor-not-allowed text-base"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="input-email"
          />
          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            This is your registered email and cannot be changed.
          </p>
        </div>

        {/* Mobile Number */}
        <div>
          <label
            className="block text-sm font-semibold text-[#2e2e2e] mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={personalInfo.mobileNumber}
            onChange={(e) => handleChange('mobileNumber', e.target.value)}
            placeholder="+1 (123) 456-7890"
            className="w-full h-14 px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent text-base"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="input-mobile"
          />
          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            11 digits required (+1 XXX-XXX-XXXX format)
          </p>
          {errors.mobileNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.mobileNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
}
