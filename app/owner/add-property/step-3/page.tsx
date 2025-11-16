"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProperty } from "../PropertyContext";
import { ProgressSteps } from "../components/ProgressSteps";
import {
  Room,
  ROOM_TYPES,
  AVAILABLE_AMENITIES,
  SAFETY_FEATURES,
  SHARED_SPACES,
} from "@/types/property";
import { ChevronDown, Upload, X, Plus, Calendar, Bed, ArrowLeft, Check } from "lucide-react";

export default function Step3Page() {
  const router = useRouter();
  const {
    rooms: initialRooms,
    amenities: initialAmenities,
    setRooms,
    setAmenities,
    prevStep,
    saveAsDraft,
    resetForm,
  } = useProperty();
  
  const [rooms, setLocalRooms] = useState<Room[]>(initialRooms.length > 0 ? initialRooms : []);
  const [amenities, setLocalAmenities] = useState({
    available: initialAmenities.available || [],
    featured: initialAmenities.featured || [],
    safety: initialAmenities.safety || [],
    sharedSpaces: initialAmenities.sharedSpaces || [],
    checkInTime: initialAmenities.checkInTime || "",
    checkOutTime: initialAmenities.checkOutTime || "",
    rules: initialAmenities.rules || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Room Management
  const addRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name: "",
      type: "",
      count: 1,
      price: "",
      availabilityStart: "",
      availabilityEnd: "",
      image: null,
      imagePreview: "",
    };
    setLocalRooms([...rooms, newRoom]);
  };

  const updateRoom = (id: string, field: keyof Room, value: any) => {
    setLocalRooms(rooms.map(room => 
      room.id === id ? { ...room, [field]: value } : room
    ));
    setErrors({ ...errors, [`room-${id}-${field}`]: "" });
  };

  const removeRoom = (id: string) => {
    setLocalRooms(rooms.filter(room => room.id !== id));
  };

  const handleRoomImage = (id: string, file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, [`room-${id}-image`]: "Only image files accepted" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors({ ...errors, [`room-${id}-image`]: "Image must be less than 2MB" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      updateRoom(id, "image", file);
      updateRoom(id, "imagePreview", e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Amenity Management
  const toggleAmenity = (amenity: string) => {
    if (amenities.available.includes(amenity)) {
      setLocalAmenities({
        ...amenities,
        available: amenities.available.filter(a => a !== amenity),
        featured: amenities.featured.filter(a => a !== amenity),
      });
    } else {
      setLocalAmenities({
        ...amenities,
        available: [...amenities.available, amenity],
      });
    }
  };

  const toggleFeatured = (amenity: string) => {
    if (amenities.featured.includes(amenity)) {
      setLocalAmenities({
        ...amenities,
        featured: amenities.featured.filter(a => a !== amenity),
      });
    } else if (amenities.featured.length < 3) {
      setLocalAmenities({
        ...amenities,
        featured: [...amenities.featured, amenity],
      });
    }
  };

  const toggleSafety = (feature: string) => {
    if (amenities.safety.includes(feature)) {
      setLocalAmenities({
        ...amenities,
        safety: amenities.safety.filter(f => f !== feature),
      });
    } else {
      setLocalAmenities({
        ...amenities,
        safety: [...amenities.safety, feature],
      });
    }
  };

  const toggleSharedSpace = (space: string) => {
    if (amenities.sharedSpaces.includes(space)) {
      setLocalAmenities({
        ...amenities,
        sharedSpaces: amenities.sharedSpaces.filter(s => s !== space),
      });
    } else {
      setLocalAmenities({
        ...amenities,
        sharedSpaces: [...amenities.sharedSpaces, space],
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate rooms
    rooms.forEach(room => {
      if (!room.name) newErrors[`room-${room.id}-name`] = "Room name required";
      if (!room.type) newErrors[`room-${room.id}-type`] = "Room type required";
      if (!room.count || room.count < 1 || !Number.isInteger(room.count)) {
        newErrors[`room-${room.id}-count`] = "Room count must be a positive integer";
      }
      if (!room.price || parseFloat(room.price) <= 0) newErrors[`room-${room.id}-price`] = "Valid price required";
      if (!room.availabilityStart) newErrors[`room-${room.id}-start`] = "Start date required";
      if (!room.availabilityEnd) newErrors[`room-${room.id}-end`] = "End date required";
      
      // Validate end date is after start date
      if (room.availabilityStart && room.availabilityEnd) {
        const startDate = new Date(room.availabilityStart);
        const endDate = new Date(room.availabilityEnd);
        if (endDate <= startDate) {
          newErrors[`room-${room.id}-end`] = "End date must be after start date";
        }
      }
    });

    if (!amenities.checkInTime) newErrors.checkInTime = "Check-in time required";
    if (!amenities.checkOutTime) newErrors.checkOutTime = "Check-out time required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canProceed = () => {
    if (rooms.length === 0) return false;
    
    return rooms.every(room => 
      room.name && room.type && room.price && parseFloat(room.price) > 0 && 
      room.availabilityStart && room.availabilityEnd
    ) && amenities.checkInTime && amenities.checkOutTime;
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    setRooms(rooms);
    setAmenities(amenities);
    setIsSubmitting(true);

    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear draft and reset context
    localStorage.removeItem("propertyDraft");
    resetForm();
    
    // Navigate to success page
    router.push("/owner/add-property/success");
  };

  const handleBack = () => {
    setRooms(rooms);
    setAmenities(amenities);
    prevStep();
    router.push("/owner/add-property/step-2");
  };

  const handleSaveExit = () => {
    setRooms(rooms);
    setAmenities(amenities);
    saveAsDraft();
    router.push("/owner");
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  if (showPreview) {
    return (
      <div className="w-full">
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
            <ProgressSteps currentStep={3} totalSteps={3} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
          <div className="space-y-8">
            <div>
              <h1
                className="text-4xl font-bold text-[#2e2e2e] mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Preview & Publish
              </h1>
              <p
                className="text-lg text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Review your property listing before publishing
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Rooms ({rooms.length})
                </h3>
                <div className="space-y-3">
                  {rooms.map(room => (
                    <div key={room.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {room.name}
                        </p>
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {room.type} • {room.count} room(s)
                        </p>
                      </div>
                      <p className="text-lg font-bold text-[#59A5B2]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        ${room.price}/night
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Amenities ({amenities.available.length})
                </h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {amenities.available.join(", ") || "None selected"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Check-in / Check-out
                </h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Check-in: {amenities.checkInTime} • Check-out: {amenities.checkOutTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 px-6 h-12 border-2 border-[#59A5B2] text-[#59A5B2] font-semibold rounded-lg hover:bg-[#59A5B2]/5 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Back to Edit
              </button>
              <button
                onClick={handlePublish}
                disabled={isSubmitting}
                className={`flex-1 px-6 h-12 rounded-lg font-semibold transition-all ${
                  isSubmitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#59A5B2] text-white hover:bg-[#4a8a95] shadow-md hover:shadow-lg"
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
                data-testid="button-publish"
              >
                {isSubmitting ? "Publishing..." : "Publish Property"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <ProgressSteps currentStep={3} totalSteps={3} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1
              className="text-4xl md:text-5xl font-bold text-[#2e2e2e]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              data-testid="heading-step3"
            >
              Rooms, Amenities & Policies
            </h1>
            <p
              className="text-lg text-gray-600"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Add rooms, select amenities, safety features, and set your property policies
            </p>
          </div>

          {/* Rooms Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2
                className="text-2xl font-semibold text-gray-900"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Rooms
              </h2>
              <button
                onClick={addRoom}
                className="flex items-center gap-2 px-4 h-10 bg-[#59A5B2] text-white rounded-lg hover:bg-[#4a8a95] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
                data-testid="button-add-room"
              >
                <Plus className="w-5 h-5" />
                Add Room
              </button>
            </div>

            {rooms.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                <Bed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                  No rooms added yet. Click "Add Room" to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {rooms.map((room, index) => (
                  <div key={room.id} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3
                        className="text-lg font-semibold text-gray-900"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        Room {index + 1}
                      </h3>
                      <button
                        onClick={() => removeRoom(room.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        data-testid={`button-remove-room-${room.id}`}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Room Name *
                        </label>
                        <input
                          type="text"
                          value={room.name}
                          onChange={(e) => updateRoom(room.id, "name", e.target.value)}
                          placeholder="e.g., Deluxe Suite"
                          className={`w-full h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] ${
                            errors[`room-${room.id}-name`] ? "border-red-500" : "border-gray-300"
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          data-testid={`input-room-name-${room.id}`}
                        />
                        {errors[`room-${room.id}-name`] && (
                          <p className="text-xs text-red-500">{errors[`room-${room.id}-name`]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Room Type *
                        </label>
                        <div className="relative">
                          <select
                            value={room.type}
                            onChange={(e) => updateRoom(room.id, "type", e.target.value)}
                            className={`w-full h-10 px-4 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#59A5B2] ${
                              errors[`room-${room.id}-type`] ? "border-red-500" : "border-gray-300"
                            }`}
                            style={{ fontFamily: 'Inter, sans-serif' }}
                            data-testid={`select-room-type-${room.id}`}
                          >
                            <option value="">Select type</option>
                            {ROOM_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Room Count *
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={room.count}
                          onChange={(e) => updateRoom(room.id, "count", parseInt(e.target.value) || 1)}
                          className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2]"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          data-testid={`input-room-count-${room.id}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Price (CAD/night) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={room.price}
                          onChange={(e) => updateRoom(room.id, "price", e.target.value)}
                          placeholder="0.00"
                          className={`w-full h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] ${
                            errors[`room-${room.id}-price`] ? "border-red-500" : "border-gray-300"
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          data-testid={`input-room-price-${room.id}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Availability Start *
                        </label>
                        <input
                          type="date"
                          value={room.availabilityStart}
                          onChange={(e) => updateRoom(room.id, "availabilityStart", e.target.value)}
                          className={`w-full h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] ${
                            errors[`room-${room.id}-start`] ? "border-red-500" : "border-gray-300"
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          data-testid={`input-room-start-${room.id}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Availability End *
                        </label>
                        <input
                          type="date"
                          value={room.availabilityEnd}
                          onChange={(e) => updateRoom(room.id, "availabilityEnd", e.target.value)}
                          className={`w-full h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] ${
                            errors[`room-${room.id}-end`] ? "border-red-500" : "border-gray-300"
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          data-testid={`input-room-end-${room.id}`}
                        />
                      </div>
                    </div>

                    {/* Room Image */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Room Picture
                      </label>
                      {!room.imagePreview ? (
                        <div className="relative aspect-video max-w-xs border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#59A5B2] transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleRoomImage(room.id, file);
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <Upload className="w-8 h-8 text-[#59A5B2] mb-2" />
                          <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Upload room image (JPG/PNG, max 2MB)
                          </p>
                        </div>
                      ) : (
                        <div className="relative aspect-video max-w-xs rounded-lg overflow-hidden group">
                          <img src={room.imagePreview} alt="Room" className="w-full h-full object-cover" />
                          <button
                            onClick={() => {
                              updateRoom(room.id, "image", null);
                              updateRoom(room.id, "imagePreview", "");
                            }}
                            className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Amenities */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Available Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {AVAILABLE_AMENITIES.map(amenity => (
                <label
                  key={amenity}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                    amenities.available.includes(amenity)
                      ? "border-[#59A5B2] bg-[#59A5B2]/5"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={amenities.available.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="w-4 h-4 text-[#59A5B2] rounded focus:ring-[#59A5B2]"
                  />
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Featured Amenities */}
          {amenities.available.length > 0 && (
            <section className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Featured Amenities
                </h2>
                <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Select up to 3 amenities to feature ({amenities.featured.length}/3 selected)
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {amenities.available.map(amenity => (
                  <label
                    key={amenity}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                      amenities.featured.includes(amenity)
                        ? "border-[#59A5B2] bg-[#59A5B2]/5"
                        : "border-gray-300 hover:border-gray-400"
                    } ${amenities.featured.length >= 3 && !amenities.featured.includes(amenity) ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={amenities.featured.includes(amenity)}
                      onChange={() => toggleFeatured(amenity)}
                      disabled={amenities.featured.length >= 3 && !amenities.featured.includes(amenity)}
                      className="w-4 h-4 text-[#59A5B2] rounded focus:ring-[#59A5B2] disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          )}

          {/* Safety Features */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Safety & Property Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {SAFETY_FEATURES.map(feature => (
                <label
                  key={feature}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                    amenities.safety.includes(feature)
                      ? "border-[#59A5B2] bg-[#59A5B2]/5"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={amenities.safety.includes(feature)}
                    onChange={() => toggleSafety(feature)}
                    className="w-4 h-4 text-[#59A5B2] rounded focus:ring-[#59A5B2]"
                  />
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {feature}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Check-in/Check-out */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Check-In / Check-Out Times
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Check-in Time *
                </label>
                <div className="relative">
                  <select
                    value={amenities.checkInTime}
                    onChange={(e) => {
                      setLocalAmenities({ ...amenities, checkInTime: e.target.value });
                      setErrors({ ...errors, checkInTime: "" });
                    }}
                    className={`w-full h-12 px-4 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#59A5B2] ${
                      errors.checkInTime ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    data-testid="select-checkin"
                  >
                    <option value="">Select time</option>
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Check-out Time *
                </label>
                <div className="relative">
                  <select
                    value={amenities.checkOutTime}
                    onChange={(e) => {
                      setLocalAmenities({ ...amenities, checkOutTime: e.target.value });
                      setErrors({ ...errors, checkOutTime: "" });
                    }}
                    className={`w-full h-12 px-4 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#59A5B2] ${
                      errors.checkOutTime ? "border-red-500" : "border-gray-300"
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    data-testid="select-checkout"
                  >
                    <option value="">Select time</option>
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          {/* Shared Spaces */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Shared Spaces
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {SHARED_SPACES.map(space => (
                <label
                  key={space}
                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                    amenities.sharedSpaces.includes(space)
                      ? "border-[#59A5B2] bg-[#59A5B2]/5"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={amenities.sharedSpaces.includes(space)}
                    onChange={() => toggleSharedSpace(space)}
                    className="w-4 h-4 text-[#59A5B2] rounded focus:ring-[#59A5B2]"
                  />
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {space}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* House Rules */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              House Rules & Policies
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Rules & Policies
                </label>
                <span className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {amenities.rules.length}/500
                </span>
              </div>
              <textarea
                value={amenities.rules}
                onChange={(e) => setLocalAmenities({ ...amenities, rules: e.target.value })}
                maxLength={500}
                rows={6}
                placeholder="Enter your property rules and policies..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59A5B2] resize-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
                data-testid="textarea-rules"
              />
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 h-12 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveExit}
              className="px-6 h-12 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
              data-testid="button-save-exit"
            >
              Save & Exit
            </button>
            
            <button
              onClick={() => setShowPreview(true)}
              disabled={!canProceed()}
              className={`px-8 h-12 rounded-lg font-semibold transition-all ${
                canProceed()
                  ? "bg-[#59A5B2] text-white hover:bg-[#4a8a95] shadow-md hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
              data-testid="button-preview"
            >
              Preview & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
