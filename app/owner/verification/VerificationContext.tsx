"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PersonalInfo {
  legalFullName: string;
  displayName: string;
  email: string;
  mobileNumber: string;
}

interface PropertyTypeData {
  propertyType: "hotel" | "guesthouse" | "";
  businessLicense?: File | null;
  propertyOwnership?: File | null;
  governmentId?: File | null;
  businessLicenseUrl?: string;
  propertyOwnershipUrl?: string;
  governmentIdUrl?: string;
}

interface ComplianceData {
  ownershipConfirmed: boolean;
  termsAccepted: boolean;
  notes: string;
}

interface PropertyBasics {
  propertyType: string;
  propertyName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  amenities: string[];
  familyFriendly: boolean;
  petsAllowed: boolean;
  checkInTime: string;
  checkOutTime: string;
  houseRules: string;
}

interface VerificationContextType {
  currentStep: number;
  currentSubstep: number;
  personalInfo: PersonalInfo;
  propertyTypeData: PropertyTypeData;
  complianceData: ComplianceData;
  propertyBasics: PropertyBasics;
  setCurrentStep: (step: number) => void;
  setCurrentSubstep: (substep: number) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updatePropertyTypeData: (data: Partial<PropertyTypeData>) => void;
  updateComplianceData: (data: Partial<ComplianceData>) => void;
  updatePropertyBasics: (data: Partial<PropertyBasics>) => void;
  saveAsDraft: () => void;
  loadDraft: () => void;
  nextSubstep: () => void;
  prevSubstep: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSubstep, setCurrentSubstep] = useState(1);
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    legalFullName: "",
    displayName: "",
    email: "user@example.com",
    mobileNumber: "+1"
  });

  const [propertyTypeData, setPropertyTypeData] = useState<PropertyTypeData>({
    propertyType: "",
    businessLicense: null,
    propertyOwnership: null,
    governmentId: null
  });

  const [complianceData, setComplianceData] = useState<ComplianceData>({
    ownershipConfirmed: false,
    termsAccepted: false,
    notes: ""
  });

  const [propertyBasics, setPropertyBasics] = useState<PropertyBasics>({
    propertyType: "",
    propertyName: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Canada",
    amenities: [],
    familyFriendly: false,
    petsAllowed: false,
    checkInTime: "",
    checkOutTime: "",
    houseRules: ""
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    loadDraft();
  }, []);

  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    setPersonalInfo(prev => ({ ...prev, ...data }));
  };

  const updatePropertyTypeData = (data: Partial<PropertyTypeData>) => {
    setPropertyTypeData(prev => ({ ...prev, ...data }));
  };

  const updateComplianceData = (data: Partial<ComplianceData>) => {
    setComplianceData(prev => ({ ...prev, ...data }));
  };

  const updatePropertyBasics = (data: Partial<PropertyBasics>) => {
    setPropertyBasics(prev => ({ ...prev, ...data }));
  };

  const saveAsDraft = () => {
    const draftData = {
      currentStep,
      currentSubstep,
      personalInfo,
      propertyTypeData: {
        ...propertyTypeData,
        businessLicense: null,
        propertyOwnership: null,
        governmentId: null
      },
      complianceData,
      propertyBasics
    };
    localStorage.setItem("ownerVerificationDraft", JSON.stringify(draftData));
  };

  const loadDraft = () => {
    const draft = localStorage.getItem("ownerVerificationDraft");
    if (draft) {
      const data = JSON.parse(draft);
      setCurrentStep(data.currentStep || 1);
      setCurrentSubstep(data.currentSubstep || 1);
      setPersonalInfo(data.personalInfo || personalInfo);
      setPropertyTypeData(data.propertyTypeData || propertyTypeData);
      setComplianceData(data.complianceData || complianceData);
      setPropertyBasics(data.propertyBasics || propertyBasics);
    }
  };

  const nextSubstep = () => {
    if (currentStep === 1 && currentSubstep < 4) {
      setCurrentSubstep(currentSubstep + 1);
    } else if (currentStep === 2 && currentSubstep < 4) {
      setCurrentSubstep(currentSubstep + 1);
    }
  };

  const prevSubstep = () => {
    if (currentStep === 1 && currentSubstep > 1) {
      setCurrentSubstep(currentSubstep - 1);
    } else if (currentStep === 2 && currentSubstep > 1) {
      setCurrentSubstep(currentSubstep - 1);
    }
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(2);
      setCurrentSubstep(1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(1);
      setCurrentSubstep(4);
    }
  };

  return (
    <VerificationContext.Provider
      value={{
        currentStep,
        currentSubstep,
        personalInfo,
        propertyTypeData,
        complianceData,
        propertyBasics,
        setCurrentStep,
        setCurrentSubstep,
        updatePersonalInfo,
        updatePropertyTypeData,
        updateComplianceData,
        updatePropertyBasics,
        saveAsDraft,
        loadDraft,
        nextSubstep,
        prevSubstep,
        nextStep,
        prevStep
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification() {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error("useVerification must be used within VerificationProvider");
  }
  return context;
}
