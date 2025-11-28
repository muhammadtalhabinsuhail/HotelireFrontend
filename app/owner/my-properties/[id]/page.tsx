// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { DashboardNavbar } from "@/components/DashboardNavbar"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Checkbox } from "@/components/ui/checkbox"
// import { ArrowLeft, Edit2, MapPin, Clock, AlertCircle } from "lucide-react"
// import { properties } from "@/lib/data"

// export default function PropertyDetailPage({ params }: { params: { id: string } }) {

//     // const propertyId  : number = Number(params.id);
//   const property = properties[Number(params.id)]
//   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)


//   useEffect(() => {
 
//  alert(params.id)
//   }, [])
  

//   if (!property) {
//     return <div>Property not found</div>
//   }

//   const photos = [property.featured, property.photo2, property.photo3, property.photo4, property.photo5]

//   return (
//     <div className="flex-1 flex flex-col">
//       <DashboardNavbar title="Property Details" userName="Property Owner" />

//       <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
//         {/* Back Button */}
//         <Link href="/owner/my-properties">
//           <Button
//             variant="outline"
//             className="mb-6 border-[#59A5B2] text-[#59A5B2] hover:bg-[#59A5B2] hover:text-white bg-transparent"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Properties
//           </Button>
//         </Link>

//         <div className="space-y-6">
//           {/* Main Info Section */}
//           <Card className="shadow-sm">
//             <CardHeader className="flex flex-row items-start justify-between">
//               <div>
//                 <CardTitle className="text-2xl text-[#59A5B2]">{property.title}</CardTitle>
//                 <p className="text-sm text-gray-500 mt-2">{property.subtitle}</p>
//               </div>
//               <Button variant="ghost" size="sm" className="text-[#59A5B2] hover:bg-blue-50">
//                 <Edit2 className="w-4 h-4 mr-1" />
//                 Edit
//               </Button>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-xs font-semibold text-gray-600">Province & State</label>
//                   <p className="text-sm font-medium text-gray-900 mt-1">
//                     {property.province}, {property.state}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="text-xs font-semibold text-gray-600">Property Address</label>
//                   <p className="text-sm font-medium text-gray-900 mt-1">{property.address}</p>
//                 </div>
//               </div>
//               <div>
//                 <label className="text-xs font-semibold text-gray-600">Overview</label>
//                 <p className="text-sm text-gray-700 mt-1">{property.overview}</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Photos Gallery */}
//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-[#59A5B2] flex items-center justify-between">
//                 Photos
//                 <Button variant="ghost" size="sm" className="text-[#59A5B2] hover:bg-blue-50">
//                   <Edit2 className="w-4 h-4 mr-1" />
//                   Edit
//                 </Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {/* Main Featured Photo */}
//                 <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-100">
//                   <Image
//                     src={photos[currentPhotoIndex] || "/placeholder.svg"}
//                     alt={`Property photo ${currentPhotoIndex + 1}`}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>

//                 {/* Thumbnail Navigation */}
//                 <div className="flex gap-2 overflow-x-auto pb-2">
//                   {photos.map((photo, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentPhotoIndex(index)}
//                       className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
//                         currentPhotoIndex === index ? "border-[#59A5B2]" : "border-gray-200"
//                       }`}
//                     >
//                       <Image
//                         src={photo || "/placeholder.svg"}
//                         alt={`Thumbnail ${index + 1}`}
//                         fill
//                         className="object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Google Map Preview */}
//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-[#59A5B2] flex items-center gap-2">
//                 <MapPin className="w-5 h-5" />
//                 Location
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100">
//                 <iframe
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   loading="lazy"
//                   allowFullScreen
//                   src={property.mapLink}
//                 ></iframe>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Timings */}
//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-[#59A5B2] flex items-center justify-between">
//                 <span className="flex items-center gap-2">
//                   <Clock className="w-5 h-5" />
//                   Timings
//                 </span>
//                 <Button variant="ghost" size="sm" className="text-[#59A5B2] hover:bg-blue-50">
//                   <Edit2 className="w-4 h-4 mr-1" />
//                   Edit
//                 </Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="grid grid-cols-2 gap-4">
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <p className="text-xs font-semibold text-gray-600">Check-In Time</p>
//                 <p className="text-sm font-medium text-gray-900 mt-1">{property.checkInTime}</p>
//               </div>
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <p className="text-xs font-semibold text-gray-600">Check-Out Time</p>
//                 <p className="text-sm font-medium text-gray-900 mt-1">{property.checkOutTime}</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* House Rules */}
//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-[#59A5B2] flex items-center justify-between">
//                 <span className="flex items-center gap-2">
//                   <AlertCircle className="w-5 h-5" />
//                   House Rules & Overview
//                 </span>
//                 <Button variant="ghost" size="sm" className="text-[#59A5B2] hover:bg-blue-50">
//                   <Edit2 className="w-4 h-4 mr-1" />
//                   Edit
//                 </Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-gray-700">{property.houseRules}</p>
//             </CardContent>
//           </Card>

//           {/* Rooms Section */}
//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-[#59A5B2] flex items-center justify-between">
//                 Rooms
//                 <Button variant="ghost" size="sm" className="text-[#59A5B2] hover:bg-blue-50">
//                   <Edit2 className="w-4 h-4 mr-1" />
//                   Edit
//                 </Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {property.rooms.map((room) => (
//                 <div key={room.id} className="p-4 border border-gray-200 rounded-lg">
//                   <div className="flex items-start justify-between mb-3">
//                     <div>
//                       <h4 className="font-semibold text-gray-900">{room.name}</h4>
//                       <p className="text-xs text-gray-500">Quantity: {room.count}</p>
//                     </div>
//                     <Badge className={room.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
//                       {room.available ? "Available" : "Not Available"}
//                     </Badge>
//                   </div>
//                   <div className="flex gap-2 mb-3">
//                     <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
//                       <Image src={room.pic1 || "/placeholder.svg"} alt="Room" fill className="object-cover" />
//                     </div>
//                     <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
//                       <Image src={room.pic2 || "/placeholder.svg"} alt="Room" fill className="object-cover" />
//                     </div>
//                   </div>
//                   <p className="text-sm font-medium text-[#59A5B2]">${room.price}/night</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Amenities Section */}
//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-[#59A5B2] flex items-center justify-between">
//                 Amenities
//                 <Button variant="ghost" size="sm" className="text-[#59A5B2] hover:bg-blue-50">
//                   <Edit2 className="w-4 h-4 mr-1" />
//                   Edit
//                 </Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Essentials */}
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-3">Essentials</h4>
//                 <div className="grid grid-cols-2 gap-3">
//                   {property.amenities.essentials.map((amenity) => (
//                     <div key={amenity} className="flex items-center gap-2">
//                       <Checkbox checked disabled />
//                       <span className="text-sm text-gray-700">{amenity}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Safety Features */}
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-3">Safety Features</h4>
//                 <div className="grid grid-cols-2 gap-3">
//                   {property.amenities.safetyFeatures.map((feature) => (
//                     <div key={feature} className="flex items-center gap-2">
//                       <Checkbox checked disabled />
//                       <span className="text-sm text-gray-700">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Shared Spaces */}
//               <div>
//                 <h4 className="font-semibold text-gray-900 mb-3">Shared Spaces</h4>
//                 <div className="grid grid-cols-2 gap-3">
//                   {property.amenities.sharedSpaces.map((space) => (
//                     <div key={space} className="flex items-center gap-2">
//                       <Checkbox checked disabled />
//                       <span className="text-sm text-gray-700">{space}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }
