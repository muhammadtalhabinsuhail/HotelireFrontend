"use client";

import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle, FileCheck, Mail, Zap, Home } from "lucide-react";
import { useState } from "react";

export default function VerificationSuccessPage() {
  // This would come from backend API in production
  const [isApproved, setIsApproved] = useState(false);

  const handleDashboardClick = () => {
    if (!isApproved) {
      alert("Your verification request is still in progress. You'll be notified once approved.");
    } else {
      window.location.href = '/owner/dashboard';
    }
  };

  const handleCreateListingClick = () => {
    window.location.href = '/owner/create-listing';
  };

  return (
    <div className="bg-[#f7f9fb] w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />

      <main className="flex-1 py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          {/* Progress Section */}
          <div className="mb-12">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-[#59A5B2] transition-all duration-500 rounded-full"
                style={{ width: '100%' }}
              />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between items-start text-sm">
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center mb-1">
                  <CheckCircle className="w-5 h-5 text-[#59A5B2] mr-1" />
                  <span className="font-semibold text-[#59A5B2]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Step 1
                  </span>
                </div>
                <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Ownership & Authorization
                </p>
              </div>

              <div className="flex-1 text-center">
                <div className="flex items-center justify-center mb-1">
                  <CheckCircle className="w-5 h-5 text-[#59A5B2] mr-1" />
                  <span className="font-semibold text-[#59A5B2]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Step 2
                  </span>
                </div>
                <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Property Basics
                </p>
              </div>
            </div>
          </div>

          {/* Card 1 - Submission Confirmation */}
          <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.05)] p-8 md:p-12 text-center mb-6">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              You're all set
            </h1>

            <p
              className="text-lg text-[#6B6B6B] max-w-md mx-auto"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Verification typically takes 1–2 business days. We'll email you when it's approved.
            </p>
          </div>

          {/* Card 2 - What Happens Next */}
          <div className="bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.05)] p-6 md:p-8 mb-8">
            <h2
              className="text-2xl font-bold text-[#1E1E1E] mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              What happens next
            </h2>

            <div className="space-y-4">
              {/* Item 1: Compliance Review */}
              <div
                className="flex items-start gap-4 p-4 rounded-[10px] border border-gray-200 hover:bg-[#f9fbfb] transition-colors duration-200"
                data-testid="next-step-compliance"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-semibold text-[#1E1E1E] mb-1"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Compliance review
                  </h3>
                  <p
                    className="text-base text-[#6B6B6B]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Our team verifies ownership and identity. We may reach out if anything else is needed.
                  </p>
                </div>
              </div>

              {/* Item 2: Email Notification */}
              <div
                className="flex items-start gap-4 p-4 rounded-[10px] border border-gray-200 hover:bg-[#f9fbfb] transition-colors duration-200"
                data-testid="next-step-email"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-semibold text-[#1E1E1E] mb-1"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Email notification
                  </h3>
                  <p
                    className="text-base text-[#6B6B6B]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    You'll receive an approval email with next steps to publish your first listing.
                  </p>
                </div>
              </div>

              {/* Item 3: Faster Go-Live */}
              <div
                className="flex items-start gap-4 p-4 rounded-[10px] border border-gray-200 hover:bg-[#f9fbfb] transition-colors duration-200"
                data-testid="next-step-golive"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-semibold text-[#1E1E1E] mb-1"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Faster go-live
                  </h3>
                  <p
                    className="text-base text-[#6B6B6B]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Your saved property basics will prefill when creating listings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Go to Dashboard Button */}
            <button
              onClick={handleDashboardClick}
              className="flex items-center justify-center gap-2 px-8 h-[55px] bg-white border border-gray-300 text-[#2E2E2E] font-semibold rounded-[10px] hover:bg-gray-50 transition-all duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              data-testid="button-dashboard"
            >
              <Home className="w-4 h-4" />
              Go to Dashboard
            </button>

            {/* Create First Listing Button - Conditionally Rendered */}
            {isApproved && (
              <button
                onClick={handleCreateListingClick}
                className="flex items-center justify-center gap-2 px-8 h-[55px] bg-[#59A5B2] text-white font-semibold rounded-[10px] hover:bg-[#4a8a95] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                data-testid="button-create-listing"
              >
                Create First Listing
              </button>
            )}
          </div>

          {/* Admin Testing Toggle (Remove in production) */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsApproved(!isApproved)}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {isApproved ? '🔓 Admin: Set to Pending' : '🔒 Admin: Approve Verification'}
            </button>
            <p className="text-xs text-gray-400 mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              (This toggle simulates backend approval status - remove in production)
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
