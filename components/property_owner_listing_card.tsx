import Image from "next/image"
import { Heart, CreditCard, Calendar, MapPin, Building2 } from "lucide-react"
import type { Property1 } from "@/lib/data"

interface PropertyCardProps {
  property: Property1
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="group relative flex flex-col gap-6 overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md sm:flex-row">
      {/* Image Section */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg sm:w-72">
        <Image src={property.featured || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
       
          <div className="absolute left-3 top-3 rounded-md bg-[#FFD748] px-2.5 py-1 text-xs font-semibold text-black">
            Sponsored
          </div>
   
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {/* Header Row */}
          <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {/* {property.amenities.map((tag) => (
                <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600">
                  {tag}
                </span>
              ))} */}
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">${property.id}</div>
              <div className="text-xs text-gray-500">{property.id} Payments</div>
            </div>
          </div>

          {/* Title & Location */}
          <div className="mb-6">
            <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{property.title}</h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5" />
              {property.address}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Wishlist */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-gray-50">
              <Heart className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500">In Wishlist of</span>
              <span className="text-xs font-semibold text-gray-900">{property.id} visitors</span>
            </div>
          </div>

          {/* Down Payment */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-gray-50">
              <CreditCard className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500">Down Payment</span>
              <span className="text-xs font-semibold text-gray-900">
                ${property.id} <span className="font-normal text-gray-500">One Time</span>
              </span>
            </div>
          </div>

          {/* Installments */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-gray-50">
              <Building2 className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500">Installments</span>
              <span className="text-xs font-semibold text-gray-900">
                ${property.id}{" "}
                <span className="font-normal text-gray-500">{property.id} Payments</span>
              </span>
            </div>
          </div>

          {/* Due Payment */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-gray-50">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500">First Due Payment</span>
              <span className="text-xs font-semibold text-gray-900">{property.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
