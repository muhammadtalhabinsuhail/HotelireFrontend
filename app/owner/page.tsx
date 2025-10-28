"use client";

import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  DollarSign,
  Star,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ownerNavItems = [
  { title: "Overview", href: "/dashboard/owner", icon: LayoutDashboard },
  { title: "My Hotels", href: "/dashboard/owner/hotels", icon: Building2 },
  { title: "Bookings", href: "/dashboard/owner/bookings", icon: Calendar },
  { title: "Revenue", href: "/dashboard/owner/revenue", icon: DollarSign },
  { title: "Reviews", href: "/dashboard/owner/reviews", icon: Star },
  { title: "Guests", href: "/dashboard/owner/guests", icon: Users },
];

export default function PropertyOwnerDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar navItems={ownerNavItems} userType="owner" />
      
      <div className="flex-1 flex flex-col">
        <DashboardNavbar title="Overview" userName="Property Owner" />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-[#3f2c77] shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="[font-family:'Inter',Helvetica] text-sm font-medium text-gray-600">
                  My Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="[font-family:'Poppins',Helvetica] text-3xl font-bold text-[#3f2c77]" data-testid="stat-my-properties">
                  5
                </p>
                <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500 mt-1">
                  All active
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#FEBC11] shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="[font-family:'Inter',Helvetica] text-sm font-medium text-gray-600">
                  This Month Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="[font-family:'Poppins',Helvetica] text-3xl font-bold text-[#3f2c77]" data-testid="stat-month-bookings">
                  87
                </p>
                <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500 mt-1">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="[font-family:'Inter',Helvetica] text-sm font-medium text-gray-600">
                  Revenue This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="[font-family:'Poppins',Helvetica] text-3xl font-bold text-[#3f2c77]" data-testid="stat-revenue-month">
                  $28.5K
                </p>
                <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500 mt-1">
                  +18% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="[font-family:'Inter',Helvetica] text-sm font-medium text-gray-600">
                  Average Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="[font-family:'Poppins',Helvetica] text-3xl font-bold text-[#3f2c77]" data-testid="stat-avg-rating">
                  4.8
                </p>
                <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500 mt-1">
                  Based on 234 reviews
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-lg text-[#3f2c77] mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-[#3f2c77] hover:bg-[#2a2158] text-white transition-colors duration-200"
                data-testid="button-add-property"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
              <Button 
                variant="outline" 
                className="border-[#3f2c77] text-[#3f2c77] hover:bg-[#3f2c77] hover:text-white transition-colors duration-200"
                data-testid="button-view-bookings"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View All Bookings
              </Button>
              <Button 
                variant="outline"
                className="border-[#3f2c77] text-[#3f2c77] hover:bg-[#3f2c77] hover:text-white transition-colors duration-200"
                data-testid="button-manage-rooms"
              >
                Manage Rooms
              </Button>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My Properties */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="[font-family:'Poppins',Helvetica] text-lg font-semibold text-[#3f2c77]">
                  My Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="section-my-properties">
                  {["Grand Hotel Downtown", "Seaside Resort", "Mountain Lodge", "City Center Inn", "Airport Hotel"].map((property, i) => (
                    <div key={property} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-[#3f2c77] rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="[font-family:'Poppins',Helvetica] font-semibold text-sm text-gray-800">
                            {property}
                          </p>
                          <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500">
                            {90 - i * 10}% Occupied
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="[font-family:'Poppins',Helvetica] font-semibold text-sm text-[#FEBC11]">
                          ★ {(4.9 - i * 0.1).toFixed(1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="[font-family:'Poppins',Helvetica] text-lg font-semibold text-[#3f2c77]">
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="section-recent-bookings">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="[font-family:'Poppins',Helvetica] font-semibold text-sm text-gray-800">
                          Guest #{5000 + i}
                        </p>
                        <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500">
                          Check-in: Dec {20 + i}, 2025
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="[font-family:'Poppins',Helvetica] font-semibold text-sm text-[#3f2c77]">
                          ${180 + i * 20}
                        </p>
                        <span className="[font-family:'Inter',Helvetica] text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          Confirmed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Overview */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="[font-family:'Poppins',Helvetica] text-lg font-semibold text-[#3f2c77]">
                  Revenue Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3" data-testid="section-revenue-overview">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="[font-family:'Inter',Helvetica] text-sm text-gray-700">This Week</span>
                    <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#3f2c77]">$8,450</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="[font-family:'Inter',Helvetica] text-sm text-gray-700">This Month</span>
                    <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#3f2c77]">$28,500</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="[font-family:'Inter',Helvetica] text-sm text-gray-700">This Year</span>
                    <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#3f2c77]">$285,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="[font-family:'Inter',Helvetica] text-sm text-gray-700">Pending Payout</span>
                    <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#FEBC11]">$12,300</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="[font-family:'Poppins',Helvetica] text-lg font-semibold text-[#3f2c77]">
                  Recent Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="section-recent-reviews">
                  {["Amazing experience!", "Great location and service", "Very comfortable stay", "Highly recommend!"].map((review, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="[font-family:'Poppins',Helvetica] font-semibold text-sm text-gray-800">
                          Guest #{8000 + i}
                        </span>
                        <span className="[font-family:'Poppins',Helvetica] text-sm text-[#FEBC11]">
                          ★ {5 - i * 0.2}
                        </span>
                      </div>
                      <p className="[font-family:'Inter',Helvetica] text-sm text-gray-600">
                        {review}
                      </p>
                      <p className="[font-family:'Inter',Helvetica] text-xs text-gray-400 mt-1">
                        {i + 1} day{i !== 0 ? 's' : ''} ago
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
