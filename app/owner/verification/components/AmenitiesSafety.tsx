"use client";

import { useVerification } from "../VerificationContext";

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

export default function AmenitiesSafety() {
  const { propertyBasics, updatePropertyBasics } = useVerification();

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = propertyBasics.amenities.includes(amenity)
      ? propertyBasics.amenities.filter(a => a !== amenity)
      : [...propertyBasics.amenities, amenity];
    updatePropertyBasics({ amenities: newAmenities });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2
        className="text-2xl font-bold text-[#2e2e2e] mb-2"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Amenities & Safety
      </h2>
      <p
        className="text-gray-600 mb-8"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Select the amenities available at your property and set safety policies.
      </p>

      <div className="bg-white rounded-[10px] shadow-md p-6 md:p-8 space-y-6">
        {/* Amenities Grid */}
        <div>
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
        <div className="space-y-4 pt-4 border-t border-gray-200">
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
    </div>
  );
}
