"use client"

import { DashboardNavbar } from "@/components/DashboardNavbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Calendar } from "lucide-react"

export default function OwnerOverview() {
  return (
    <div className="flex-1 flex flex-col">
      <DashboardNavbar title="Overview" userName="Property Owner" />

      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-[#59A5B2] shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="font-medium text-sm text-gray-600">My Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#59A5B2]">4</p>
              <p className="text-xs text-gray-500 mt-1">All active</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#FEBC11] shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="font-medium text-sm text-gray-600">This Month Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#59A5B2]">87</p>
              <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="font-medium text-sm text-gray-600">Revenue This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#59A5B2]">$28.5K</p>
              <p className="text-xs text-gray-500 mt-1">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="font-medium text-sm text-gray-600">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#59A5B2]">4.8</p>
              <p className="text-xs text-gray-500 mt-1">Based on 234 reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg text-[#59A5B2] mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-[#59A5B2] hover:bg-[#468590] text-white transition-colors duration-200">
              <Building2 className="w-4 h-4 mr-2" />
              Add New Property
            </Button>
            <Button
              variant="outline"
              className="border-[#59A5B2] text-[#59A5B2] hover:bg-[#59A5B2] hover:text-white transition-colors duration-200 bg-transparent"
            >
              <Calendar className="w-4 h-4 mr-2" />
              View All Bookings
            </Button>
            <Button
              variant="outline"
              className="border-[#59A5B2] text-[#59A5B2] hover:bg-[#59A5B2] hover:text-white transition-colors duration-200 bg-transparent"
            >
              Manage Rooms
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
