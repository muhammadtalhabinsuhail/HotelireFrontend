"use client";

import { useVerification } from "../VerificationContext";
import { ChevronDown } from "lucide-react";

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

export default function PropertyPolicies() {
  const { propertyBasics, updatePropertyBasics } = useVerification();

  return (
    <div className="max-w-3xl mx-auto">
      <h2
        className="text-2xl font-bold text-[#2e2e2e] mb-2"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Policies
      </h2>
      <p
        className="text-gray-600 mb-8"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Set your property's check-in/check-out times and house rules.
      </p>

      <div className="bg-white rounded-[10px] shadow-md p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full h-14 px-4 pr-10 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent bg-white text-base appearance-none cursor-pointer"
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
  );
}
