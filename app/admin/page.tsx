"use client";

import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  Users,
  FileText,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const adminNavItems = [
  { title: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { title: "Manage Hotels", href: "/dashboard/admin/hotels", icon: Building2 },
  { title: "Bookings", href: "/dashboard/admin/bookings", icon: Calendar },
  { title: "Users", href: "/dashboard/admin/users", icon: Users },
  { title: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { title: "Content", href: "/dashboard/admin/content", icon: FileText },
];

export default function SuperAdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar navItems={adminNavItems} userType="admin" />
      
      <div className="flex-1 flex flex-col">
        <DashboardNavbar title="Overview" userName="Super Admin" />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-[#3f2c77] shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="[font-family:'Inter',Helvetica] text-sm font-medium text-gray-600">
                  Total Hotels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="[font-family:'Poppins',Helvetica] text-3xl font-bold text-[#3f2c77]" data-testid="stat-total-hotels">
                  152
                </p>
                <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500 mt-1">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#FEBC11] shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="[font-family:'Inter',Helvetica] text-sm font-medium text-gray-600">
                  Total Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="[font-family:'Poppins',Helvetica] text-3xl font-bold text-[#3f2c77]" data-testid="stat-total-bookings">
                  2,451
                </p>
                <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500 mt-1">
                  +8% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="[font-family:'Inter',Helvetica] text-sm font-medium text-gray-600">
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="[font-family:'Poppins',Helvetica] text-3xl font-bold text-[#3f2c77]" data-testid="stat-active-users">
                  8,234
                </p>
                <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500 mt-1">
                  +15% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="[font-family:'Inter',Helvetica] text-sm font-medium text-gray-600">
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="[font-family:'Poppins',Helvetica] text-3xl font-bold text-[#3f2c77]" data-testid="stat-revenue">
                  $124K
                </p>
                <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500 mt-1">
                  +23% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="[font-family:'Poppins',Helvetica] text-lg font-semibold text-[#3f2c77]">
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="section-recent-bookings">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="[font-family:'Poppins',Helvetica] font-semibold text-sm text-gray-800">
                          Booking #{1000 + i}
                        </p>
                        <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500">
                          Grand Hotel - Room 20{i}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="[font-family:'Poppins',Helvetica] font-semibold text-sm text-[#3f2c77]">
                          $250
                        </p>
                        <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500">
                          Today
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hotel Performance */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="[font-family:'Poppins',Helvetica] text-lg font-semibold text-[#3f2c77]">
                  Top Performing Hotels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-testid="section-top-hotels">
                  {["Grand Hotel", "Luxury Resort", "Beach Paradise", "Mountain View"].map((hotel, i) => (
                    <div key={hotel} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-[#3f2c77] rounded-lg flex items-center justify-center">
                          <span className="[font-family:'Poppins',Helvetica] font-bold text-white">
                            {hotel.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="[font-family:'Poppins',Helvetica] font-semibold text-sm text-gray-800">
                            {hotel}
                          </p>
                          <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500">
                            {85 - i * 5}% Occupancy
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="[font-family:'Poppins',Helvetica] font-semibold text-sm text-[#FEBC11]">
                          ★ {(4.8 - i * 0.1).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Management Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="[font-family:'Poppins',Helvetica] text-lg font-semibold text-[#3f2c77]">
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3" data-testid="section-user-management">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="[font-family:'Inter',Helvetica] text-sm text-gray-700">Property Owners</span>
                    <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#3f2c77]">124</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="[font-family:'Inter',Helvetica] text-sm text-gray-700">Customers</span>
                    <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#3f2c77]">8,110</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="[font-family:'Inter',Helvetica] text-sm text-gray-700">Pending Approvals</span>
                    <span className="[font-family:'Poppins',Helvetica] font-semibold text-[#FEBC11]">15</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Activity */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="[font-family:'Poppins',Helvetica] text-lg font-semibold text-[#3f2c77]">
                  System Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3" data-testid="section-system-activity">
                  {["New hotel registered", "Booking confirmed", "Payment received", "Review submitted"].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-[#3f2c77] rounded-full mt-1.5"></div>
                      <div className="flex-1">
                        <p className="[font-family:'Inter',Helvetica] text-sm text-gray-800">{activity}</p>
                        <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500">{i + 1} hour{i !== 0 ? 's' : ''} ago</p>
                      </div>
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
