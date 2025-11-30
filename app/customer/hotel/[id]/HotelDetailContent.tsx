"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  ChevronDown,
  CalendarIcon,
  Users,
  MapPin,
  Minus,
  Plus,
  User,
  X,
  Star,
} from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faSquareParking,
  faUtensils,
  faSwimmingPool,
  faDumbbell,
  faSnowflake,
  faFire,
  faShirt,
  faTv,
  faHotTubPerson,
  faFireBurner,
  faPaw,
  faWheelchair,
  faElevator,
  faMugHot,
  faBell,
  faFireExtinguisher,
  faBriefcaseMedical,
  faVideo,
  faKey,
  faShieldHalved,
  faClock,
  faCouch,
  faMountainSun,
  faTree,
  faHotel,
  faSearch,
  faUserGroup,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// Canadian cities for location autocomplete
const canadianCities = [
  "Toronto, Ontario",
  "Montreal, Quebec",
  "Vancouver, British Columbia",
  "Calgary, Alberta",
  "Edmonton, Alberta",
  "Ottawa, Ontario",
  "Niagara Falls, Ontario",
  "Halifax, Nova Scotia",
  "Victoria, British Columbia",
  "Quebec City, Quebec",
];

// Property location (mock)
const propertyLocation = "Niagara Falls, Ontario";

// Room type for cart
interface CartItem {
  roomType: string;
  quantity: number;
  pricePerNight: number;
}

export default function HotelDetailPage({id}: {id: string}) {

  const router = useRouter();
  // Search bar state
  const [location, setLocation] = useState(propertyLocation);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  // Room selection state (quantity selectors before "Add")
  const [quadRoomQty, setQuadRoomQty] = useState(0);
  const [kingRoomQty, setKingRoomQty] = useState(0);

  // Cart state (rooms added to sidebar)
  const [cart, setCart] = useState<CartItem[]>([]);

  // Validation state
  const [showValidation, setShowValidation] = useState(false);


  const filteredCities = location
    ? canadianCities.filter((city) =>
        city.toLowerCase().includes(location.toLowerCase())
      )
    : [];

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setShowSuggestions(value.length > 0);
  };

  const selectCity = (city: string) => {
    setLocation(city);
    setShowSuggestions(false);
  };




  // Add room to cart
 const addToCart = (roomType: string, quantity: number, pricePerNight: number) => {
  if (quantity === 0) return;

  setCart(prev => {
    const existingIndex = prev.findIndex(item => item.roomType === roomType);
    let updated = [...prev];

    if (existingIndex >= 0) {
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity,
      };
    } else {
      updated.push({ roomType, quantity, pricePerNight });
    }

    // Reset HERE (AFTER cart updates)
    if (roomType === "Quad Room") setQuadRoomQty(0);
    if (roomType === "King Room") setKingRoomQty(0);

    return updated;
  });
};


  // Remove room from cart
  const removeFromCart = (roomType: string) => {
    setCart((prev) => prev.filter((item) => item.roomType !== roomType));
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.quantity * item.pricePerNight, 0);
  };

  // Calculate nights
  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };

  // Handle reserve
  const handleReserve = () => {
    if (!checkInDate || !checkOutDate || cart.length === 0) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    console.log("Reservation submitted:", { checkInDate, checkOutDate, adults, children, cart });
    alert("Reservation submitted successfully!");
  };

  // Amenities data
  const amenities = [
    { icon: faWifi, label: "Wi-Fi" },
    { icon: faSquareParking, label: "Free Parking" },
    { icon: faUtensils, label: "Kitchen" },
    { icon: faSwimmingPool, label: "Pool" },
    { icon: faDumbbell, label: "Gym/Fitness Center" },
    { icon: faSnowflake, label: "Air Conditioning" },
    { icon: faFire, label: "Heater" },
    { icon: faShirt, label: "Washer" },
    { icon: faShirt, label: "Dryer" },
    { icon: faTv, label: "TV" },
    { icon: faHotTubPerson, label: "Hot Tub" },
    { icon: faFireBurner, label: "BBQ Grill" },
    { icon: faPaw, label: "Pet Friendly" },
    { icon: faWheelchair, label: "Wheelchair Accessible" },
    { icon: faElevator, label: "Elevator" },
    { icon: faMugHot, label: "Breakfast Included" },
  ];

  // Safety features data
  const safetyFeatures = [
    { icon: faBell, label: "Smoke detectors" },
    { icon: faBell, label: "Carbon monoxide detectors" },
    { icon: faFireExtinguisher, label: "Fire extinguisher" },
    { icon: faBriefcaseMedical, label: "First aid kit" },
    { icon: faVideo, label: "Surveillance camera" },
    { icon: faKey, label: "Keyless entry" },
    { icon: faShieldHalved, label: "Security guard" },
    { icon: faClock, label: "24/7 front desk" },
  ];

  // Shared spaces data
  const sharedSpaces = [
    { icon: faUtensils, label: "Kitchen" },
    { icon: faMountainSun, label: "Balcony" },
    { icon: faCouch, label: "Living Room" },
    { icon: faHotel, label: "Rooftop" },
    { icon: faTree, label: "Patio" },
    { icon: faTree, label: "Garden" },
    { icon: faMountainSun, label: "Terrace" },
  ];

  return (
    <div className="bg-white w-full flex flex-col min-h-screen">
    
      {/* ============================================ */}
      {/* INLINE SEARCH BAR SECTION */}
      {/* ============================================ */}
      <section className="w-full bg-[#F5F6FD] py-6 px-4 md:px-8 lg:px-[203px]">
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            {/* Location */}
            <div className="flex-1 px-4 py-3 lg:py-0 lg:border-r border-gray-200 flex flex-col justify-center relative">
              <label
                htmlFor="location"
                className="font-semibold text-[#59A5B2] text-[13px] md:text-[15px] mb-1 flex items-center gap-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                onFocus={() => location && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Where are you going?"
                className="font-normal text-gray-600 text-[12px] md:text-[13px] border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                style={{ fontFamily: "Poppins, sans-serif" }}
                data-testid="input-location"
              />
              {showSuggestions && filteredCities.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-[300px] overflow-y-auto z-50">
                  {filteredCities.slice(0, 10).map((city) => (
                    <button
                      key={city}
                      onClick={() => selectCity(city)}
                      className="w-full text-left px-4 py-2 hover:bg-[#f5f6fd] text-sm text-[#59A5B2] transition-colors"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                      data-testid={`suggestion-${city}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
              {showValidation && !location && (
                <span className="text-red-500 text-xs mt-1">Please select a location</span>
              )}
            </div>

            {/* Check-in / Check-out */}
            <div className="flex-1 px-4 py-3 lg:py-0 lg:border-r border-gray-200 flex flex-col justify-center">
              <label
                className="font-semibold text-[#59A5B2] text-[13px] md:text-[15px] mb-1 flex items-center gap-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <CalendarIcon className="w-4 h-4" />
                Check in - Check out
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="font-normal text-gray-600 text-[12px] md:text-[13px] border-0 p-0 h-auto justify-start hover:bg-transparent"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    data-testid="button-date-picker"
                  >
                    {checkInDate && checkOutDate
                      ? `${format(checkInDate, "MMM dd, yyyy")} - ${format(checkOutDate, "MMM dd, yyyy")}`
                      : "Select dates"}
                    <ChevronDown className="ml-auto w-3.5 h-2" aria-hidden="true" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-4 flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#59A5B2] mb-2">Check-in</p>
                      <Calendar
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#59A5B2] mb-2">Check-out</p>
                      <Calendar
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        disabled={(date) => !checkInDate || date <= checkInDate}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {showValidation && (!checkInDate || !checkOutDate) && (
                <span className="text-red-500 text-xs mt-1">Please select check-in and check-out dates</span>
              )}
            </div>

            {/* Guests */}
            <div className="flex-1 px-4 py-3 lg:py-0 flex flex-col justify-center">
              <label
                className="font-semibold text-[#59A5B2] text-[13px] md:text-[15px] mb-1 flex items-center gap-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Users className="w-4 h-4" />
                Guests
              </label>
              <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="font-normal text-gray-600 text-[12px] md:text-[13px] border-0 p-0 h-auto justify-start hover:bg-transparent"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    data-testid="button-guests"
                  >
                    {`${adults} ${adults === 1 ? "adult" : "adults"}${children > 0 ? ` · ${children} ${children === 1 ? "child" : "children"}` : ""}`}
                    <ChevronDown className="ml-auto w-3.5 h-2" aria-hidden="true" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-4" align="start">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#59A5B2] text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Adults</p>
                        <p className="text-xs text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>Age 13+</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          disabled={adults <= 1}
                          data-testid="button-decrease-adults"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold" data-testid="text-adults-count">
                          {adults}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setAdults(adults + 1)}
                          data-testid="button-increase-adults"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#59A5B2] text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Children</p>
                        <p className="text-xs text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>Ages 2-12</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          disabled={children <= 0}
                          data-testid="button-decrease-children"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold" data-testid="text-children-count">
                          {children}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setChildren(children + 1)}
                          data-testid="button-increase-children"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            {/* <Button
              className="bg-[#59A5B2] hover:bg-[#4a8f9a] text-white px-6 self-center"
              data-testid="button-search"
            >
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4 mr-2" />
              Search
            </Button> */}
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="w-full px-4 md:px-8 lg:px-[203px] py-8">
        {/* Hotel Title */}
        <h1
          className="text-[28px] md:text-[32px] font-bold text-[#59A5B2] mb-1"
          style={{ fontFamily: "Poppins, sans-serif" }}
          data-testid="text-hotel-title"
        >
          Days Inn and Suites over the Niagara Falls
        </h1>
        <p className="text-gray-500 text-sm mb-2" style={{ fontFamily: "Inter, sans-serif" }} data-testid="text-hotel-subtitle">
          Horseshoe Falls, The Falls
        </p>
        <p className="text-gray-600 text-sm mb-6" style={{ fontFamily: "Inter, sans-serif" }} data-testid="text-hotel-location">
          Niagara Falls, Ontario
        </p>

        {/* Main Content + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Hotel Gallery - Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-lg" />
              <div className="grid grid-cols-2 gap-3">
                <div className="w-full h-[194px] bg-gray-200 rounded-lg" />
                <div className="w-full h-[194px] bg-gray-200 rounded-lg" />
                <div className="w-full h-[194px] bg-gray-200 rounded-lg" />
                <div className="w-full h-[194px] bg-gray-200 rounded-lg" />
              </div>
            </div>

            {/* Overview And Rules */}
            <section className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h2 className="text-[20px] font-bold text-[#59A5B2]" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Overview And Rules
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>3014 reviews</span>
                  <div className="flex items-center gap-1 bg-[#59A5B2] text-white px-2 py-1 rounded">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-sm">4.8</span>
                  </div>
                </div>
              </div>
              <p className="text-[14px] text-gray-700 leading-relaxed mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                Genius discounts at this property are subject to book dates, stay dates and other available deals.
              </p>
              <p className="text-[14px] text-gray-700 leading-relaxed mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                Just a 10-minute walk from Horseshoe Falls, this Days Inn by Wyndham Niagara Falls Near The Falls.
              </p>
              <p className="text-[14px] text-gray-700 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                All classically furnished rooms at the Days Inn by Wyndham Niagara Falls Near The falls include a seating area. A coffee maker and hairdryer are provided in every room. Some rooms offer an oval-shaped hot tub, while others are equipped with heart-shaped hot tub.
              </p>
            </section>

            {/* Most popular services & amenities */}
            <section className="mb-10">
              <h2 className="text-[20px] font-bold text-[#59A5B2] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Most popular services & amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FontAwesomeIcon icon={amenity.icon} className="w-5 h-5 text-[#59A5B2]" />
                    <span className="text-[13px] text-[#59A5B2]" style={{ fontFamily: "Inter, sans-serif" }}>
                      {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Safety Features */}
            <section className="mb-10">
              <h2 className="text-[20px] font-bold text-[#59A5B2] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Safety Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {safetyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FontAwesomeIcon icon={feature.icon} className="w-5 h-5 text-[#59A5B2]" />
                    <span className="text-[13px] text-[#59A5B2]" style={{ fontFamily: "Inter, sans-serif" }}>
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Shared Spaces */}
            <section className="mb-10">
              <h2 className="text-[20px] font-bold text-[#59A5B2] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Shared Spaces
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {sharedSpaces.map((space, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FontAwesomeIcon icon={space.icon} className="w-5 h-5 text-[#59A5B2]" />
                    <span className="text-[13px] text-[#59A5B2]" style={{ fontFamily: "Inter, sans-serif" }}>
                      {space.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================ */}
            {/* AVAILABLE ROOMS SECTION - NEW PDF DESIGN */}
            {/* ============================================ */}
            <section className="mb-12">
              <h2 className="text-[24px] font-bold text-[#59A5B2] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Available Rooms
              </h2>

              {/* Rooms Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Table Header - Desktop */}
                <div className="hidden md:grid grid-cols-12 bg-[#FEC328] py-4 px-6">
                  <div className="col-span-3 font-bold text-black text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Room Type
                  </div>
                  <div className="col-span-3 font-bold text-black text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Room Type
                  </div>
                  <div className="col-span-3 font-bold text-black text-sm text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Price for per night
                  </div>
                  <div className="col-span-3 font-bold text-black text-sm text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Select Rooms
                  </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden bg-[#FEC328] py-3 px-4">
                  <span className="font-bold text-black text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Available Rooms
                  </span>
                </div>

                {/* Room Row 1 - Quad Room */}
                <div className="border-b border-gray-200 p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Col 1: Room Images */}
                    <div className="col-span-1 md:col-span-3">
                      <p className="text-xs text-gray-500 mb-2 md:hidden" style={{ fontFamily: "Inter, sans-serif" }}>
                        Room Name
                      </p>
                      <div className="flex gap-2">
                        <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                        <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                      </div>
                    </div>

                    {/* Col 2: Room Type + Guest Icons */}
                    <div className="col-span-1 md:col-span-3">
                      <h3 className="font-semibold text-[#59A5B2] text-lg mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Quad Room
                      </h3>
                      <div className="flex items-center gap-1 justify-center">
                        <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                        <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                        <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                        <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                      </div>
                    </div>

                    {/* Col 3: Price */}
                    <div className="col-span-1 md:col-span-3 flex flex-col items-start md:items-center justify-center">
                      <span className="text-2xl font-bold text-[#59A5B2]" style={{ fontFamily: "Poppins, sans-serif" }}>
                        $390
                      </span>
                      <span className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                        Includes taxes and charges
                      </span>
                    </div>

                    {/* Col 4: Select Rooms */}
                    <div className="col-span-1 md:col-span-3 flex items-center justify-start md:justify-center gap-3 flex-wrap">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => setQuadRoomQty(Math.max(0, quadRoomQty - 1))}
                          disabled={quadRoomQty <= 0}
                          data-testid="button-quad-room-decrease"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-sm font-medium border-x border-gray-300 min-w-[40px] text-center" style={{ fontFamily: "Inter, sans-serif" }}>
                          {String(quadRoomQty).padStart(2, "0")}
                        </span>
                        <button
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                          onClick={() => setQuadRoomQty(quadRoomQty + 1)}
                          data-testid="button-quad-room-increase"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Add Button */}
                      <Button
                        variant="outline"
                        className="border-[#59A5B2] text-[#59A5B2] hover:bg-[#59A5B2] hover:text-white px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quadRoomQty === 0}
                        onClick={() => addToCart("Quad Room", quadRoomQty, 390)}
                        data-testid="button-add-quad-room"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Room Row 2 - King Room */}
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Col 1: Room Images */}
                    <div className="col-span-1 md:col-span-3">
                      <p className="text-xs text-gray-500 mb-2 md:hidden" style={{ fontFamily: "Inter, sans-serif" }}>
                        Room Name
                      </p>
                      <div className="flex gap-2">
                        <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                        <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                      </div>
                    </div>

                    {/* Col 2: Room Type + Guest Icons */}
                    <div className="col-span-1 md:col-span-3">
                      <h3 className="font-semibold text-[#59A5B2] text-lg mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                        King Room
                      </h3>
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                        <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4 text-[#59A5B2]" />
                      </div>
                    </div>

                    {/* Col 3: Price */}
                    <div className="col-span-1 md:col-span-3 flex flex-col items-start md:items-center justify-center">
                      <span className="text-3xl font-bold text-[#59A5B2]" style={{ fontFamily: "Poppins, sans-serif" }}>
                        $250
                      </span>
                      <span className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                        Includes taxes and charges
                      </span>
                    </div>

                    {/* Col 4: Select Rooms */}
                    <div className="col-span-1 md:col-span-3 flex items-center justify-start md:justify-center gap-3 flex-wrap">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => setKingRoomQty(Math.max(0, kingRoomQty - 1))}
                          disabled={kingRoomQty <= 0}
                          data-testid="button-king-room-decrease"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-sm font-medium border-x border-gray-300 min-w-[40px] text-center" style={{ fontFamily: "Inter, sans-serif" }}>
                          {String(kingRoomQty).padStart(2, "0")}
                        </span>
                        <button
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                          onClick={() => setKingRoomQty(kingRoomQty + 1)}
                          data-testid="button-king-room-increase"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Add Button */}
                      <Button
                        variant="outline"
                        className="border-[#59A5B2] text-[#59A5B2] hover:bg-[#59A5B2] hover:text-white px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={kingRoomQty === 0}
                        onClick={() => addToCart("King Room", kingRoomQty, 250)}
                        data-testid="button-add-king-room"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ============================================ */}
          {/* RIGHT SIDEBAR - BOOKING SUMMARY */}
          {/* ============================================ */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 p-6">
              {/* Check in - Check out */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Check in - Check out
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                  <CalendarIcon className="w-4 h-4 text-[#59A5B2]" />
                  <span>
                    {checkInDate && checkOutDate
                      ? `${format(checkInDate, "MMM dd yyyy")} - ${format(checkOutDate, "MMM dd yyyy")}`
                      : "Select dates"}
                  </span>
                </div>
                {showValidation && (!checkInDate || !checkOutDate) && (
                  <span className="text-red-500 text-xs mt-1 block">Please select dates</span>
                )}
              </div>

              {/* Guest */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Guest
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                  <Users className="w-4 h-4 text-[#59A5B2]" />
                  <span>{`${adults} adults · ${children} children · ${cart.reduce((sum, item) => sum + item.quantity, 0) || 1} room`}</span>
                </div>
              </div>

              {/* Booking Date / Selected Rooms */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Booking Details
                </h3>

                {cart.length === 0 ? (
                  <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                    No rooms selected
                  </p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700">
                            {item.quantity} {item.roomType}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.roomType)}
                            className="text-red-500 hover:text-red-700"
                            data-testid={`button-remove-${item.roomType.toLowerCase().replace(" ", "-")}`}
                            aria-label={`Remove ${item.roomType}`}
                          >
                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-red-500 hover:text-red-700" />
                          </button>
                        </div>
                        <span className="text-gray-800 font-medium">
                          ${item.quantity * item.pricePerNight}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {showValidation && cart.length === 0 && (
                  <span className="text-red-500 text-xs mt-2 block">Please add at least one room</span>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Total
                </span>
                <span className="text-2xl font-bold text-[#59A5B2]" style={{ fontFamily: "Poppins, sans-serif" }}>
                  ${calculateTotal()}
                </span>
              </div>

              {/* Reserve Button */}
              <Button
                className="w-full bg-[#59A5B2] hover:bg-[#4a8f9a] text-white font-semibold py-3"
                onClick={handleReserve}
                data-testid="button-reserve"
              >
                Reserve
              </Button>
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
}
