"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card className="overflow-hidden border border-gray-200 hover:shadow-[0px_8px_24px_rgba(63,44,119,0.15)] transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Image */}
        <div className="relative w-full md:w-[280px] h-[200px] md:h-[180px] flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={listing.image}
            alt={listing.name}
            fill
            className="object-cover"
          />
          <button
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110 z-10"
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            aria-label="Add to wishlist"
            data-testid={`button-wishlist-listing-${listing.id}`}
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                isWishlisted ? "fill-[#3f2c77] text-[#3f2c77]" : "text-[#3f2c77]"
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <h3 className="[font-family:'Poppins',Helvetica] font-bold text-[#3f2c77] text-lg md:text-xl mb-1 hover:text-[#2a2158] transition-colors duration-200">
                <Link href={`/hotels/${listing.id}`} prefetch={false} data-testid={`link-listing-${listing.id}`}>
                  {listing.name}
                </Link>
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="[font-family:'Inter',Helvetica] font-medium text-gray-600 text-sm">
                  {listing.location}
                </span>
                <Link
                  href={`/hotels/${listing.id}#map`}
                  prefetch={false}
                  className="flex items-center gap-1 text-[#3f2c77] hover:text-[#2a2158] transition-colors duration-200"
                  data-testid={`link-show-map-${listing.id}`}
                >
                  <MapPin className="w-3 h-3" />
                  <span className="[font-family:'Inter',Helvetica] font-medium text-sm underline">
                    Show on map
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-[#3f2c77] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-white text-base [font-family:'Inter',Helvetica]">
                  {listing.rating}
                </span>
              </div>
            </div>
          </div>

          <p className="[font-family:'Inter',Helvetica] font-normal text-gray-700 text-sm mb-3 line-clamp-2">
            {listing.description}
          </p>

          <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
            <div className="flex-1">
              <p className="[font-family:'Inter',Helvetica] font-semibold text-gray-800 text-sm mb-2">
                King Room
              </p>
              <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xs mb-3">
                1 extra-large double bed
              </p>
              
              {/* Key Offerings */}
              <div className="flex items-center gap-3 mb-2">
                <p className="[font-family:'Inter',Helvetica] font-semibold text-gray-800 text-sm">
                  Key Offerings
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {listing.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="[font-family:'Inter',Helvetica] font-medium text-[#3f2c77] text-xs px-2 py-1 bg-[#f5f6fd] rounded"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and CTA */}
            <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
              <div className="text-right">
                <p className="[font-family:'Poppins',Helvetica] font-bold text-[#3f2c77] text-2xl">
                  {listing.price}
                </p>
                <p className="[font-family:'Inter',Helvetica] font-normal text-gray-600 text-xs">
                  1 night, 2 adults, Taxes Extra
                </p>
              </div>
              <Button
                className="w-full sm:w-auto bg-[#febc11] hover:bg-[#febc11]/90 text-[#3f2c77] [font-family:'Poppins',Helvetica] font-semibold px-6"
                asChild
                data-testid={`button-availability-${listing.id}`}
              >
                <Link href={`/hotels/${listing.id}`} prefetch={false}>
                  See Availability
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
