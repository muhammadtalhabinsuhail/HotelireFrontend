"use client";

import { useVerification } from "../VerificationContext";
import { ChevronDown } from "lucide-react";

const AMENITIES = [
  "Free WiFi",
  "Parking",
  "TV",
  "Breakfast Included",
  "Air Conditioning",
  "Pool",
  "Gym/Fitness Center",
  "Room Service",
  "Restaurant",
  "Bar/Lounge",
  "Spa",
  "Laundry Service"
];

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

const TIME_OPTIONS = [
  "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM",
  "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM",
  "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
  "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
];

export default function PropertyBasics() {
  const { propertyBasics, updatePropertyBasics } = useVerification();

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = propertyBasics.amenities.includes(amenity)
      ? propertyBasics.amenities.filter(a => a !== amenity)
      : [...propertyBasics.amenities, amenity];
    updatePropertyBasics({ amenities: newAmenities });
  };

  const handleProvinceChange = (province: string) => {
    updatePropertyBasics({ province, city: "" });
  };

  const validateStreetAddress = (value: string) => {
    // Canadian address format: number + street name
    return value;
  };

  const validatePostalCode = (value: string) => {
    // Remove all non-alphanumeric characters and convert to uppercase
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Canadian postal code format: A1A 1A1
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 3) return cleaned;
    
    // Add space after first 3 characters
    const formatted = cleaned.slice(0, 3) + ' ' + cleaned.slice(3, 6);
    return formatted.trim();
  };

  const availableCities = propertyBasics.province ? PROVINCE_CITIES[propertyBasics.province] || [] : [];

  return (
    <div className="max-w-4xl mx-auto">
      <h2
        className="text-2xl font-bold text-[#2e2e2e] mb-2"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Property Basics
      </h2>
      <p
        className="text-gray-600 mb-8"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Tell us about your property's details, amenities, and policies.
      </p>

      <div className="space-y-8">
        {/* Property Information Section */}
        <div className="bg-white rounded-[10px] shadow-md p-6 md:p-8">
          <h3
            className="text-xl font-bold text-[#2e2e2e] mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Property Information
          </h3>
          
          <div className="space-y-6">
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
                  onChange={(e) => updatePropertyBasics({ propertyType: e.target.value })}
                  className="w-full h-14 px-4 pr-10 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent bg-white text-base appearance-none cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  data-testid="select-property-type"
                >
                  <option value="">Select property type</option>
                  {PROPERTY_TYPES.map(type => (
                    <option  key={type} value={type}>{type}</option>
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
                onChange={(e) => updatePropertyBasics({ propertyName: e.target.value })}
                placeholder="Enter your property's official name"
                className="w-full h-14 px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent text-base"
                style={{ fontFamily: 'Inter, sans-serif' }}
                data-testid="input-property-name"
              />
            </div>

            {/* Address */}
            <div className="space-y-4">
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
                  placeholder="e.g., 123 Main Street"
                  className="w-full h-14 px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent text-base"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  data-testid="input-street"
                />
                <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Include street number and name
                </p>
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
                      onChange={(e) => updatePropertyBasics({ city: e.target.value })}
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
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={propertyBasics.postalCode}
                    onChange={(e) => updatePropertyBasics({ postalCode: validatePostalCode(e.target.value) })}
                    placeholder="A1A 1A1"
                    className="w-full h-14 px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent text-base uppercase"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    maxLength={7}
                    data-testid="input-postal-code"
                  />
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Format: A1A 1A1
                  </p>
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

        {/* Amenities & Safety Section */}
        <div className="bg-white rounded-[10px] shadow-md p-6 md:p-8">
          <h3
            className="text-xl font-bold text-[#2e2e2e] mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Amenities & Safety
          </h3>

          {/* Amenities Grid */}
          <div className="mb-6">
            <p
              className="text-sm font-semibold text-[#2e2e2e] mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Select Available Amenities
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {AMENITIES.map(amenity => (
                <label
                  key={amenity}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={propertyBasics.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-5 h-5 rounded border-gray-300 text-[#59A5B2] focus:ring-[#59A5B2]"
                    data-testid={`checkbox-amenity-${amenity.toLowerCase().replace(/\s/g, '-')}`}
                  />
                  <span className="text-base text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Policy Toggles */}
          <div className="space-y-4">
            <p
              className="text-sm font-semibold text-[#2e2e2e] mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Property Policies
            </p>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-[10px]">
              <div>
                <p className="text-base font-semibold text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Family Friendly
                </p>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Property is suitable for families with children
                </p>
              </div>
              <button
                onClick={() => updatePropertyBasics({ familyFriendly: !propertyBasics.familyFriendly })}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                  propertyBasics.familyFriendly ? 'bg-[#59A5B2]' : 'bg-gray-300'
                }`}
                data-testid="toggle-family-friendly"
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    propertyBasics.familyFriendly ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-[10px]">
              <div>
                <p className="text-base font-semibold text-[#2e2e2e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Pets Allowed
                </p>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Guests can bring pets
                </p>
              </div>
              <button
                onClick={() => updatePropertyBasics({ petsAllowed: !propertyBasics.petsAllowed })}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                  propertyBasics.petsAllowed ? 'bg-[#59A5B2]' : 'bg-gray-300'
                }`}
                data-testid="toggle-pets-allowed"
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    propertyBasics.petsAllowed ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Policies Section */}
        <div className="bg-white rounded-[10px] shadow-md p-6 md:p-8">
          <h3
            className="text-xl font-bold text-[#2e2e2e] mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Policies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Check-in Time */}
            <div>
              <label
                className="block text-sm font-semibold text-[#2e2e2e] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Check-in Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={propertyBasics.checkInTime}
                  onChange={(e) => updatePropertyBasics({ checkInTime: e.target.value })}
                  className="w-full h-14 px-4 pr-10 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent bg-white text-base appearance-none cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  data-testid="select-checkin-time"
                >
                  <option value="">Select check-in time</option>
                  {TIME_OPTIONS.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Check-out Time */}
            <div>
              <label
                className="block text-sm font-semibold text-[#2e2e2e] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Check-out Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={propertyBasics.checkOutTime}
                  onChange={(e) => updatePropertyBasics({ checkOutTime: e.target.value })}
                  className="w-full h-14 px-4 pr-10 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent bg-white text-base appearance-none cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  data-testid="select-checkout-time"
                >
                  <option value="">Select check-out time</option>
                  {TIME_OPTIONS.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* House Rules */}
          <div>
            <label
              className="block text-sm font-semibold text-[#2e2e2e] mb-2"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              House Rules <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              value={propertyBasics.houseRules}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  updatePropertyBasics({ houseRules: e.target.value });
                }
              }}
              placeholder="Enter any specific house rules for guests (e.g., No smoking, Quiet hours, etc.)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent resize-none text-base"
              style={{ fontFamily: 'Inter, sans-serif' }}
              maxLength={200}
              data-testid="textarea-house-rules"
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                Maximum 200 characters
              </p>
              <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                {propertyBasics.houseRules.length}/200
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
