// "use client"

// import Link from "next/link"
// import { DashboardNavbar } from "@/components/DashboardNavbar"
// import { PropertyCard } from "@/components/property_owner_listing_card"
// import { properties } from "@/lib/data"
// import { Button } from "@/components/ui/button"
// import { ChevronDown, Plus } from "lucide-react"

// export default function MyPropertiesPage() {
//   return (
//     <div className="flex-1 flex flex-col">
//       <DashboardNavbar title="My Properties" userName="Property Owner" />

//       <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
//         {/* Header & Filters */}
//         <div className="mb-8">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <h2 className="text-xl font-bold text-gray-900">Property Listings</h2>

//             <div className="flex items-center gap-3">
//               <Button
//                 variant="outline"
//                 className="h-9 rounded-full border-gray-200 bg-white px-4 text-xs font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 All Cities
//                 <ChevronDown className="ml-2 h-3 w-3" />
//               </Button>
//               <Button
//                 variant="outline"
//                 className="h-9 rounded-full border-gray-200 bg-white px-4 text-xs font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Property Purpose
//                 <ChevronDown className="ml-2 h-3 w-3" />
//               </Button>
//               <Button
//                 variant="outline"
//                 className="h-9 rounded-full border-gray-200 bg-white px-4 text-xs font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Property Type
//                 <ChevronDown className="ml-2 h-3 w-3" />
//               </Button>
//               <Button className="h-9 rounded-full bg-[#59A5B2] px-4 text-xs font-medium text-white hover:bg-[#468590]">
//                 New Add
//                 <Plus className="ml-1 h-3 w-3" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Property List */}
//         <div className="space-y-4">
//           {properties.map((property) => (
//             <Link key={property.id} href={`/owner/my-properties/${property.id}`}>
//               <div className="cursor-pointer transition-all hover:shadow-lg">
//                 <PropertyCard property={property} />
//               </div>
//             </Link>
//           ))}
//         </div>
//       </main>
//     </div>
//   )
// }
