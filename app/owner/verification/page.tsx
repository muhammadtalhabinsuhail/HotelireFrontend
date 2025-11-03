"use client";

import { VerificationProvider, useVerification } from "./VerificationContext";
import ProgressIndicator from "./components/ProgressIndicator";
import PersonalInfo from "./components/PersonalInfo";
import PropertyTypeDocuments from "./components/PropertyTypeDocuments";
import ComplianceNotes from "./components/ComplianceNotes";
import ReviewContinue from "./components/ReviewContinue";
import PropertyInformation from "./components/PropertyInformation";
import AmenitiesSafety from "./components/AmenitiesSafety";
import PropertyPolicies from "./components/PropertyPolicies";
import PropertyBasicsReview from "./components/PropertyBasicsReview";
import NavigationButtons from "./components/NavigationButtons";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

function VerificationContent() {
  const { currentStep, currentSubstep } = useVerification();

  const renderSubstep = () => {
    if (currentStep === 1) {
      switch (currentSubstep) {
        case 1:
          return <PersonalInfo />;
        case 2:
          return <PropertyTypeDocuments />;
        case 3:
          return <ComplianceNotes />;
        case 4:
          return <ReviewContinue />;
        default:
          return <PersonalInfo />;
      }
    } else if (currentStep === 2) {
      switch (currentSubstep) {
        case 1:
          return <PropertyInformation />;
        case 2:
          return <AmenitiesSafety />;
        case 3:
          return <PropertyPolicies />;
        case 4:
          return <PropertyBasicsReview />;
        default:
          return <PropertyInformation />;
      }
    }
  };

  return (
    <div className="bg-[#f7f9fb] w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />

      <main className="flex-1 py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1
              className="text-3xl md:text-4xl font-bold text-[#2e2e2e] mb-3"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Property Owner Verification
            </h1>
            <p
              className="text-gray-600 text-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Complete the verification process to list your property on Hotelire
            </p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator />

          {/* Current Substep Content */}
          <div className="mb-8">
            {renderSubstep()}
          </div>

          {/* Navigation Buttons */}
          <NavigationButtons />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function VerificationPage() {
  return (
    <VerificationProvider>
      <VerificationContent />
    </VerificationProvider>
  );
}
