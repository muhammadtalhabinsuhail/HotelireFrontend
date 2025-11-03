"use client";

import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Star, Users, Calendar } from "lucide-react";

export default function HotelDetailContent({ id }: { id: string }) {
  const [checkIn, setCheckIn] = useState("May 05");
  const [checkOut, setCheckOut] = useState("June 18");
  const [guests, setGuests] = useState("2 adults · 1 children · 1 room");

  // Mock hotel data - ready for API integration
  const hotel = {
    id: id,
    name: "Days Inn and Suites over the Niagara Falls",
    location: "Horseshoe Falls, The Falls, Niagara Falls",
    rating: 4.8,
    reviewCount: 3014,
    checkInDate: "May 16, 2025",
    checkOutDate: "June 15, 2025",
    propertyHighlights: "Just a 10-minute walk from Horseshoe Falls, this Days Inn by Wyndham Niagara Falls Near The Falls include All classically furnished rooms at this Days Inn by Wyndham Niagara Falls Hotel Near The Falls include a seating area.",
    overview: "Rental discounts at this property are subject to book dates, stay dates and other available deals. Please fill in the travel link from luminous falls, this Days Inn by...\n\nAll classically furnished rooms at this Days Inn by Wyndham Niagara Falls Near The Falls include a seating area. A coffee maker and cable TV are provided in every room. Some rooms offer an oval-shaped hot tub while others are equipped with...",
    images: [
      "/figmaAssets/rectangle-290.png",
      "/figmaAssets/rectangle-334.png",
      "/figmaAssets/rectangle-290.png",
      "/figmaAssets/rectangle-334.png",
      "/figmaAssets/rectangle-334.png"
    ],
    amenities: [
      { icon: "non-smoking", label: "Non-smoking rooms" },
      { icon: "kitchen", label: "Kitchen" },
      { icon: "wifi", label: "Free Wifi" },
      { icon: "parking", label: "Parking" },
      { icon: "safety", label: "Safety & security" },
      { icon: "living", label: "Living area" }
    ],
    rooms: [
      {
        id: 1,
        image: "/figmaAssets/rectangle-334.png",
        type: "Standard Room",
        benefits: ["Pay at the hotel", "Pay at the hotel", "Pay at the hotel"],
        sleeps: 3,
        price: 390,
        priceNote: "Includes taxes and charges",
        selector: "1(US$ 4,120)"
      },
      {
        id: 2,
        image: "/figmaAssets/rectangle-334.png",
        type: "Deluxe Room",
        benefits: ["Pay at the hotel", "Pay at the hotel", "Pay at the hotel"],
        sleeps: 2,
        price: 170,
        priceNote: "Includes taxes and charges",
        selector: "1(US$ 4,120)"
      }
    ]
  };

  return (
    <>
      {/* Search Bar Section */}
      <section className="w-full bg-[#F5F6FD] py-6 px-4 md:px-8 lg:px-[203px]">
      <SearchBar />
      </section>

      {/* Main Content Container */}
      <div className="w-full px-4 md:px-8 lg:px-[203px] py-8">
        
        {/* Hotel Title */}
        <h1
          className="text-[28px] md:text-[32px] font-bold text-[#59A5B2] mb-6"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {hotel.name}
        </h1>

        {/* Main Content + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            
            {/* Hotel Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {/* Large Image */}
              <div className="w-full h-[300px] md:h-[400px]">
                <img
                  src={hotel.images[0]}
                  alt="Hotel main view"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              {/* Small Images Grid */}
              <div className="grid grid-cols-2 gap-3">
                {hotel.images.slice(1).map((img, idx) => (
                  <div key={idx} className="w-full h-[194px]">
                    <img
                      src={img}
                      alt={`Hotel view ${idx + 2}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Property Highlights */}
            <section className="mb-8">
              <h2
                className="text-[20px] font-bold text-[#59A5B2] mb-4"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Property highlights
              </h2>
              <p
                className="text-[14px] text-gray-700 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {hotel.propertyHighlights}
              </p>
            </section>

            {/* Overview */}
            <section className="mb-8">
              <h2
                className="text-[20px] font-bold text-[#59A5B2] mb-4"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Overview
              </h2>
              <p
                className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {hotel.overview}
              </p>
            </section>

            {/* Most popular services & amenities */}
            <section className="mb-10">
              <h2
                className="text-[20px] font-bold text-[#59A5B2] mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Most popular services & amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#59A5B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <span className="text-[14px] text-[#59A5B2]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Non-smoking rooms
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#59A5B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-[14px] text-[#59A5B2]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Kitchen
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#59A5B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                  <span className="text-[14px] text-[#59A5B2]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Free Wifi
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#59A5B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-[14px] text-[#59A5B2]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Parking
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#59A5B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-[14px] text-[#59A5B2]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Safety & security
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#59A5B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <span className="text-[14px] text-[#59A5B2]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Living area
                  </span>
                </div>
              </div>
            </section>

            {/* Available Rooms */}
            <section className="mb-12">
              <h2
                className="text-[24px] font-bold text-[#59A5B2] mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Available Rooms
              </h2>
              
              {/* Rooms Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-5 bg-[#FEC328] py-4 px-4 font-bold text-[#000000] text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <div>Room Type</div>
                  <div>Benefits</div>
                  <div>Sleeps</div>
                  <div>Price for per night</div>
                  <div>Select Rooms</div>
                </div>
                
                {/* Rooms */}
                {hotel.rooms.map((room) => (
                  <div key={room.id} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 items-center">
                    {/* Room Image */}
                    <div className="flex flex-col gap-2">
                      <img
                        src={room.image}
                        alt={room.type}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* Benefits */}
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-sm text-[#59A5B2] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Your price includes:
                      </p>
                      {room.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                          <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Sleeps */}
                    <div className="flex items-center justify-center gap-1">
                      {Array.from({ length: room.sleeps }).map((_, idx) => (
                        <Users key={idx} className="w-5 h-5 text-[#59A5B2]" />
                      ))}
                    </div>
                    
                    {/* Price */}
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-[#59A5B2]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        ${room.price}
                      </span>
                      <span className="text-xs text-gray-500 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {room.priceNote}
                      </span>
                    </div>
                    
                    {/* Reserve Section */}
                    <div className="flex flex-col items-center gap-3">
                      <select
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#59A5B2] bg-white"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        data-testid={`select-room-${room.id}`}
                      >
                        <option>{room.selector}</option>
                        <option>2(US$ 8,240)</option>
                      </select>
                      <button
                        className="w-full px-6 py-2 bg-[#59A5B2] hover:bg-[#4c7e87] text-white font-semibold rounded-md transition-all duration-300"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        data-testid={`button-reserve-${room.id}`}
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              {/* Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
               
                </div>
                <div className="bg-[#59A5B2] text-white px-3 py-2 rounded-md font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {hotel.rating}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                {hotel.reviewCount} reviews
              </p>
              
                    {/* Check-in / Check-out */}
            <div className="mb-6">
              <div className="border border-gray-300 px-4 py-4 rounded-lg">
                <p className="text-sm font-semibold text-[#FEC328] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Check in - Check out
                </p>
                <p className="text-sm font-medium text-[#2D1B69]" style={{ fontFamily: "Inter, sans-serif" }}>
                  {hotel.checkInDate} - {hotel.checkOutDate}
                </p>
              </div>
            </div>

            {/* Guest Selection */}
            <div className="mb-8">
              <div className="border border-gray-300 px-4 py-4 rounded-lg">
                <label
                  className="block text-sm font-semibold text-[#FEC328] mb-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Guest
                </label>
                <p className="text-sm font-medium text-[#2D1B69]" style={{ fontFamily: "Inter, sans-serif" }}>
                  {guests}
                </p>
              </div>
            </div>
              
              {/* Reserve Button */}
              <button
                className="w-full py-4 bg-[#FEC328] hover:bg-[#e5af1f] text-[#000000] font-bold text-lg rounded-md transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                data-testid="button-reserve-sidebar"
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}
