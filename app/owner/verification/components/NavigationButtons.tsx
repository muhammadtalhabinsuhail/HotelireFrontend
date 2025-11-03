"use client";

import { useVerification } from "../VerificationContext";
import { ArrowLeft, ArrowRight, Save, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function NavigationButtons() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    currentStep,
    currentSubstep,
    personalInfo,
    propertyTypeData,
    complianceData,
    propertyBasics,
    nextSubstep,
    prevSubstep,
    nextStep,
    prevStep,
    saveAsDraft
  } = useVerification();

  const canProceed = () => {
    if (currentStep === 1) {
      switch (currentSubstep) {
        case 1:
          // Check if mobile number has exactly 11 digits (1 country code + 10 digits)
          const digitCount = personalInfo.mobileNumber.replace(/\D/g, '').length;
          return personalInfo.legalFullName.length > 0 && digitCount === 11;
        case 2:
          return propertyTypeData.propertyType !== "" &&
                 propertyTypeData.governmentId !== null &&
                 (propertyTypeData.propertyType === "hotel" ? 
                   propertyTypeData.businessLicense !== null :
                   propertyTypeData.propertyOwnership !== null);
        case 3:
          return complianceData.ownershipConfirmed && 
                 complianceData.termsAccepted;
        case 4:
          return true;
        default:
          return false;
      }
    } else if (currentStep === 2) {
      switch (currentSubstep) {
        case 1:
          // Property Information - all required fields + valid postal code if provided
          const hasValidPostalCode = !propertyBasics.postalCode || 
                                     /^[A-Z]\d[A-Z]\s\d[A-Z]\d$/.test(propertyBasics.postalCode);
          return propertyBasics.propertyType.length > 0 &&
                 propertyBasics.propertyName.length > 0 &&
                 propertyBasics.street.length >= 5 &&
                 propertyBasics.province.length > 0 &&
                 propertyBasics.city.length > 0 &&
                 hasValidPostalCode;
        case 2:
          // Amenities & Safety - no required fields, always can proceed
          return true;
        case 3:
          // Policies - check-in and check-out times required
          return propertyBasics.checkInTime.length > 0 &&
                 propertyBasics.checkOutTime.length > 0;
        case 4:
          // Review - always can proceed
          return true;
        default:
          return false;
      }
    }
    return false;
  };

  const handleSubmitVerification = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear draft from localStorage after successful submission
      localStorage.removeItem("ownerVerificationDraft");
      
      // Show success toast
      toast({
        title: "Verification Submitted!",
        description: "Your property verification has been submitted for review. We'll notify you via email once it's approved.",
      });
      
      // Navigate to success page (will be created in next prompt)
      router.push("/owner/verification/success");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your verification. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && currentSubstep < 4) {
      nextSubstep();
    } else if (currentStep === 1 && currentSubstep === 4) {
      nextStep();
    } else if (currentStep === 2 && currentSubstep < 4) {
      nextSubstep();
    } else if (currentStep === 2 && currentSubstep === 4) {
      // Final submission
      handleSubmitVerification();
    }
  };

  const handleBack = () => {
    if (currentStep === 1 && currentSubstep > 1) {
      prevSubstep();
    } else if (currentStep === 2 && currentSubstep > 1) {
      prevSubstep();
    } else if (currentStep === 2 && currentSubstep === 1) {
      prevStep();
    }
  };

  const handleSaveDraft = () => {
    saveAsDraft();
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved. You can continue later from where you left off.",
    });
  };

  const showBackButton = currentStep > 1 || currentSubstep > 1;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
      {/* Left side - Back button */}
      <div className="w-full sm:w-auto">
        {showBackButton && (
          <button
            onClick={handleBack}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 h-[55px] bg-white border-2 border-[#59A5B2] text-[#59A5B2] font-semibold rounded-[10px] hover:bg-[#59A5B2] hover:text-white transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}
      </div>

      {/* Right side - Save Draft & Next buttons */}
      <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSaveDraft}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-[55px] bg-gray-100 text-gray-700 font-semibold rounded-[10px] hover:bg-gray-200 transition-all duration-300"
          style={{ fontFamily: 'Poppins, sans-serif' }}
          data-testid="button-save-draft"
        >
          <Save className="w-5 h-5" />
          Save as Draft
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed() || isSubmitting}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 h-[55px] font-semibold rounded-[10px] transition-all duration-300 ${
            canProceed() && !isSubmitting
              ? "bg-[#59A5B2] text-white hover:bg-[#4a8a95] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          style={{ fontFamily: 'Poppins, sans-serif' }}
          data-testid="button-next"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : currentStep === 2 && currentSubstep === 4 ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Submit for Review
            </>
          ) : currentStep === 1 && currentSubstep === 4 ? (
            <>
              Next → Property Basics
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
