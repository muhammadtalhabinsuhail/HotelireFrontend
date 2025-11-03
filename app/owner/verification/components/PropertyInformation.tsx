"use client";

import { useVerification } from "../VerificationContext";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const PROPERTY_TYPES = [
  "Hotel",
  "Motel",
  "Resort",
  "Bed & Breakfast",
  "Guest House",
  "Apartment",
  "Villa",
  "Cottage"
];

const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon"
];

// Province to Cities mapping
const PROVINCE_CITIES: Record<string, string[]> = {
  "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "Medicine Hat", "Grande Prairie"],
  "British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby", "Richmond", "Kelowna", "Kamloops"],
  "Manitoba": ["Winnipeg", "Brandon", "Steinbach", "Thompson", "Portage la Prairie"],
  "New Brunswick": ["Fredericton", "Moncton", "Saint John", "Dieppe", "Miramichi"],
  "Newfoundland and Labrador": ["St. John's", "Corner Brook", "Mount Pearl", "Paradise", "Grand Falls-Windsor"],
  "Northwest Territories": ["Yellowknife", "Hay River", "Inuvik", "Fort Smith", "Behchokǫ̀"],
  "Nova Scotia": ["Halifax", "Sydney", "Dartmouth", "Truro", "New Glasgow"],
  "Nunavut": ["Iqaluit", "Rankin Inlet", "Arviat", "Baker Lake", "Cambridge Bay"],
  "Ontario": ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham", "Vaughan", "Kitchener", "Windsor"],
  "Prince Edward Island": ["Charlottetown", "Summerside", "Stratford", "Cornwall"],
  "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay"],
  "Saskatchewan": ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw", "Swift Current"],
  "Yukon": ["Whitehorse", "Dawson City", "Watson Lake", "Haines Junction"]
};

export default function PropertyInformation() {
  const { propertyBasics, updatePropertyBasics } = useVerification();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleProvinceChange = (province: string) => {
    updatePropertyBasics({ province, city: "" });
    if (errors.province) {
      setErrors(prev => ({ ...prev, province: '' }));
    }
  };

  const validateStreetAddress = (value: string) => {
    // Canadian address format: should have street number and name
    const hasNumber = /\d/.test(value);
    if (value.length > 0 && !hasNumber) {
      setErrors(prev => ({ ...prev, street: 'Street address must include a number' }));
    } else if (value.length > 0 && value.length < 5) {
      setErrors(prev => ({ ...prev, street: 'Street address is too short' }));
    } else {
      setErrors(prev => ({ ...prev, street: '' }));
    }
    return value;
  };

  const validatePostalCode = (value: string) => {
    // Remove all non-alphanumeric characters and convert to uppercase
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    if (cleaned.length === 0) {
      setErrors(prev => ({ ...prev, postalCode: '' }));
      return '';
    }
    
    // Canadian postal code format: A1A 1A1
    let formatted = '';
    if (cleaned.length <= 3) {
      formatted = cleaned;
    } else {
      formatted = cleaned.slice(0, 3) + ' ' + cleaned.slice(3, 6);
    }
    
    // Validate format: Letter-Digit-Letter space Digit-Letter-Digit
    const postalCodeRegex = /^[A-Z]\d[A-Z]\s\d[A-Z]\d$/;
    if (formatted.length === 7 && !postalCodeRegex.test(formatted)) {
      setErrors(prev => ({ ...prev, postalCode: 'Invalid postal code format (should be A1A 1A1)' }));
    } else if (formatted.length > 0 && formatted.length < 7) {
      setErrors(prev => ({ ...prev, postalCode: '' }));
    } else {
      setErrors(prev => ({ ...prev, postalCode: '' }));
    }
    
    return formatted.trim();
  };

  const availableCities = propertyBasics.province ? PROVINCE_CITIES[propertyBasics.province] || [] : [];

  return (
    <div className="max-w-3xl mx-auto">
      <h2
        className="text-2xl font-bold text-[#2e2e2e] mb-2"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Property Information
      </h2>
      <p
        className="text-gray-600 mb-8"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Tell us about your property's basic details and location.
      </p>

      <div className="bg-white rounded-[10px] shadow-md p-6 md:p-8 space-y-6">
        {/* Property Type */}
        <div>
          <label
            className="block text-sm font-semibold text-[#2e2e2e] mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Property Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={propertyBasics.propertyType}
              onChange={(e) => {
                updatePropertyBasics({ propertyType: e.target.value });
                if (errors.propertyType) setErrors(prev => ({ ...prev, propertyType: '' }));
              }}
              className="w-full h-14 px-4 pr-10 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent bg-white text-base appearance-none cursor-pointer"
              style={{ fontFamily: 'Inter, sans-serif' }}
              data-testid="select-property-type"
            >
              <option value="">Select property type</option>
              {PROPERTY_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Property Name */}
        <div>
          <label
            className="block text-sm font-semibold text-[#2e2e2e] mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Official Property Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={propertyBasics.propertyName}
            onChange={(e) => {
              updatePropertyBasics({ propertyName: e.target.value });
              if (errors.propertyName) setErrors(prev => ({ ...prev, propertyName: '' }));
            }}
            placeholder="Enter your property's official name"
            className="w-full h-14 px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent text-base"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="input-property-name"
          />
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          {/* Street Address */}
          <div>
            <label
              className="block text-sm font-semibold text-[#2e2e2e] mb-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={propertyBasics.street}
              onChange={(e) => updatePropertyBasics({ street: validateStreetAddress(e.target.value) })}
              onBlur={(e) => validateStreetAddress(e.target.value)}
              placeholder="e.g., 123 Main Street"
              className={`w-full h-14 px-4 border rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent text-base ${
                errors.street ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
              data-testid="input-street"
            />
            {errors.street ? (
              <p className="text-xs text-red-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                {errors.street}
              </p>
            ) : (
              <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Include street number and name (e.g., 123 Main Street)
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Province */}
            <div>
              <label
                className="block text-sm font-semibold text-[#2e2e2e] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Province <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={propertyBasics.province}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  className="w-full h-14 px-4 pr-10 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent bg-white text-base appearance-none cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  data-testid="select-province"
                >
                  <option value="">Select province</option>
                  {PROVINCES.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* City */}
            <div>
              <label
                className="block text-sm font-semibold text-[#2e2e2e] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={propertyBasics.city}
                  onChange={(e) => {
                    updatePropertyBasics({ city: e.target.value });
                    if (errors.city) setErrors(prev => ({ ...prev, city: '' }));
                  }}
                  disabled={!propertyBasics.province}
                  className="w-full h-14 px-4 pr-10 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent bg-white text-base appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  data-testid="select-city"
                >
                  <option value="">{propertyBasics.province ? "Select city" : "Select province first"}</option>
                  {availableCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Postal Code */}
            <div>
              <label
                className="block text-sm font-semibold text-[#2e2e2e] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={propertyBasics.postalCode}
                onChange={(e) => updatePropertyBasics({ postalCode: validatePostalCode(e.target.value) })}
                onBlur={(e) => validatePostalCode(e.target.value)}
                placeholder="A1A 1A1"
                className={`w-full h-14 px-4 border rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent text-base uppercase ${
                  errors.postalCode ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
                maxLength={7}
                data-testid="input-postal-code"
              />
              {errors.postalCode ? (
                <p className="text-xs text-red-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {errors.postalCode}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Format: A1A 1A1
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label
                className="block text-sm font-semibold text-[#2e2e2e] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value="Canada"
                disabled
                className="w-full h-14 px-4 border border-gray-300 rounded-[10px] bg-gray-100 text-gray-600 cursor-not-allowed text-base"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
