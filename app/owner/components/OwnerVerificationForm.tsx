


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Select from "react-select"
import axios from "axios"
import FileUpload from "./FileUpload"

type OwnerBarrierErrors = Partial<{
  legalName: string
  displayName: string
  email: string
  province: string
  city: string
  address: string
  postalCode: string
  phone: string
  photoId: string
  ownershipDoc: string
  agreeOwnership: string
  agreeTerms: string
  idType: string
  proofType: string
}>

const BRAND = "#59A5B2"
const canadianPostalRegex = /^[A-Z]\d[A-Z][ ]?\d[A-Z]\d$/
const MAX_PHONE_LEN = 10

const sanitizePhone = (s: string) => s.replace(/\D/g, "").slice(0, MAX_PHONE_LEN)

const nameRegex = /^[A-Za-z\s-]{1,50}$/
const nameSanitize = (s: string) =>
  s
    .replace(/[^A-Za-z\s-]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 50)

const displayNameRegex = /^[A-Za-z\s]{1,15}$/
const displayNameSanitize = (s: string) =>
  s
    .replace(/[^A-Za-z\s]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 15)

const canadianAddressRegex = /^\d+\s+[A-Za-z0-9\s,'-]+$/

interface CanadianProvince {
  canadian_province_id: number
  canadian_province_name: string
}

interface CanadianCity {
  canadian_city_id: number
  canadian_city_name: string
  canadian_province_id: number
}

interface FileData {
  id: string
  file: File
  preview?: string
}

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 48,
    borderColor: state.isFocused ? BRAND : "#e5e7eb",
    boxShadow: state.isFocused ? `0 0 0 1px ${BRAND}` : "none",
    "&:hover": { borderColor: BRAND },
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected ? BRAND : state.isFocused ? "#f3f4f6" : "white",
    color: state.isSelected ? "white" : "#111827",
  }),
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function OwnerBarrierForm() {
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    legalName: "",
    displayName: "",
    email: "", // Pre-filled and disabled
    province: "",
    city: "",
    address: "",
    postalCode: "",
    phone: "",
    agreeOwnership: false,
    agreeTerms: false,
    canadian_provinceid: "",
    canadian_cityid: "",
    idType: "",
    proofType: "",
  })

  const [uploadedFiles, setUploadedFiles] = useState<{
    photoId: FileData | null
    ownershipDoc: FileData | null
  }>({
    photoId: null,
    ownershipDoc: null,
  })

  const [errors, setErrors] = useState<OwnerBarrierErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [canadianProvinces, setCanadianProvinces] = useState<CanadianProvince[]>([])
  const [canadianCities, setCanadianCities] = useState<CanadianCity[]>([])

  // Mock Canadian provinces and cities data to avoid API dependency
  const MOCK_PROVINCES: CanadianProvince[] = [
    { canadian_province_id: 1, canadian_province_name: "Alberta" },
    { canadian_province_id: 2, canadian_province_name: "British Columbia" },
    { canadian_province_id: 3, canadian_province_name: "Manitoba" },
    { canadian_province_id: 4, canadian_province_name: "New Brunswick" },
    { canadian_province_id: 5, canadian_province_name: "Newfoundland and Labrador" },
    { canadian_province_id: 6, canadian_province_name: "Nova Scotia" },
    { canadian_province_id: 7, canadian_province_name: "Ontario" },
    { canadian_province_id: 8, canadian_province_name: "Prince Edward Island" },
    { canadian_province_id: 9, canadian_province_name: "Quebec" },
    { canadian_province_id: 10, canadian_province_name: "Saskatchewan" },
  ]

  const MOCK_CITIES: Record<number, CanadianCity[]> = {
    1: [
      { canadian_city_id: 101, canadian_city_name: "Calgary", canadian_province_id: 1 },
      { canadian_city_id: 102, canadian_city_name: "Edmonton", canadian_province_id: 1 },
    ],
    2: [
      { canadian_city_id: 201, canadian_city_name: "Vancouver", canadian_province_id: 2 },
      { canadian_city_id: 202, canadian_city_name: "Victoria", canadian_province_id: 2 },
    ],
    7: [
      { canadian_city_id: 701, canadian_city_name: "Toronto", canadian_province_id: 7 },
      { canadian_city_id: 702, canadian_city_name: "Ottawa", canadian_province_id: 7 },
    ],
    9: [
      { canadian_city_id: 901, canadian_city_name: "Montreal", canadian_province_id: 9 },
      { canadian_city_id: 902, canadian_city_name: "Quebec City", canadian_province_id: 9 },
    ],
  }

  const ID_TYPE_OPTIONS = [
    { value: "Driver's License", label: "Driver's License" },
    { value: "Photo ID", label: "Photo ID" },
    { value: "Health Card", label: "Health Card" },
  ]

  const PROOF_TYPE_OPTIONS = [
    { value: "Gas Bill", label: "Gas Bill" },
    { value: "Electricity Bill", label: "Electricity Bill" },
    { value: "Internet Bill", label: "Internet Bill" },
    { value: "Bank Statement", label: "Bank Statement" },
  ]

  // Fetch provinces on mount
  useEffect(() => {
    setCanadianProvinces(MOCK_PROVINCES)
  }, [])

  // Fetch cities when province changes
  useEffect(() => {
    if (formData.canadian_provinceid) {
      setCanadianCities(MOCK_CITIES[formData.canadian_provinceid as unknown as number] || [])
    }
  }, [formData.canadian_provinceid])

  const setField = (field: keyof typeof formData, value: any) => {
    if (field === "legalName" && typeof value === "string") {
      value = nameSanitize(value)
    }
    if (field === "displayName" && typeof value === "string") {
      value = displayNameSanitize(value)
    }
    if (field === "phone" && typeof value === "string") {
      value = sanitizePhone(value)
    }
    if (field === "postalCode" && typeof value === "string") {
      value = value.toUpperCase()
    }

    if (field === "province") {
      setFormData((prev) => ({ ...prev, province: value, city: "" }))
      validateField("province", value)
      setErrors((e) => ({ ...e, city: "" }))
      return
    }

    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field !== "agreeOwnership" && field !== "agreeTerms") {
      validateField(field, value)
    } else {
      setErrors((e) => ({ ...e, [field]: "" }))
    }
  }

  const validateField = (field: keyof typeof formData, raw: any) => {
    const value = typeof raw === "string" ? raw.trim() : raw
    let msg = ""

    switch (field) {
      case "legalName": {
        const v = String(value)
        if (!v) msg = "Legal name is required."
        else if (!nameRegex.test(v)) msg = "Letters, spaces, and hyphens only. Max 50 characters."
        break
      }
      case "displayName": {
        const v = String(value)
        if (v && !displayNameRegex.test(v)) msg = "Letters and spaces only. Max 15 characters."
        break
      }
      case "email":
        if (!value) msg = "Email is required."
        break
      case "address": {
        const v = String(value)
        if (!v) msg = "Address is required."
        else if (!canadianAddressRegex.test(v)) {
          msg = "Use a Canadian street address (e.g., 123 Queen Street W)."
        }
        break
      }
      case "province":
      case "city":
        if (!value) msg = "This field is required."
        break
      case "postalCode": {
        const v = String(value).toUpperCase()
        if (!v) msg = "Postal code is required."
        else if (!canadianPostalRegex.test(v)) {
          msg = "Format: A1A 1A1"
        }
        break
      }
      case "phone": {
        const v = String(value)
        if (!v) msg = "Phone number is required."
        else if (!/^\d+$/.test(v)) msg = "Digits only."
        else if (v.length !== MAX_PHONE_LEN) msg = "Must be 10 digits."
        break
      }
    }

    setErrors((prev) => ({ ...prev, [field]: msg }))
    return msg === ""
  }

  const validateAll = () => {
    const fieldsToValidate: (keyof typeof formData)[] = [
      "legalName",
      "email",
      "province",
      "city",
      "address",
      "postalCode",
      "phone",
    ]

    const ok = fieldsToValidate.every((f) => validateField(f, formData[f]))

    const filesOk = uploadedFiles.photoId && uploadedFiles.ownershipDoc
    if (!filesOk) {
      setErrors((e) => ({
        ...e,
        photoId: !uploadedFiles.photoId ? "Photo ID is required." : "",
        ownershipDoc: !uploadedFiles.ownershipDoc ? "Ownership document is required." : "",
      }))
    }

    const checkboxesOk = formData.agreeOwnership && formData.agreeTerms
    if (!formData.agreeOwnership)
      setErrors((e) => ({
        ...e,
        agreeOwnership: "You must confirm ownership.",
      }))
    if (!formData.agreeTerms) setErrors((e) => ({ ...e, agreeTerms: "You must agree to the terms." }))

    return ok && filesOk && checkboxesOk
  }

  const inputClass = (invalid?: string) =>
    [
      "h-12",
      "border-gray-300",
      "focus:border-[#59A5B2]",
      "focus:ring-[#59A5B2]",
      invalid && "border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500",
    ]
      .filter(Boolean)
      .join(" ")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAll()) return

    setIsSubmitting(true)

    try {
      const payload = {
        email: formData.email,
        legalName: formData.legalName,
        displayName: formData.displayName || formData.legalName,
        province: formData.province,
        city: formData.city,
        address: formData.address,
        postalCode: formData.postalCode,
        phone: `+1${formData.phone}`,
        idType: formData.idType,
        proofType: formData.proofType,
        photoId: uploadedFiles.photoId?.id,
        ownershipDoc: uploadedFiles.ownershipDoc?.id,
        agreeOwnership: formData.agreeOwnership,
        agreeTerms: formData.agreeTerms,
      }

      const response = await axios.post(`${baseUrl}/api/owner/verify`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })

      if (response.status === 200 || response.status === 201) {
        router.push("/owner/verification-success")
      }
    } catch (error) {
      console.error("Verification error:", error)
      setErrors((prev) => ({
        ...prev,
        email: "Verification failed. Please try again.",
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <form noValidate className="space-y-6" onSubmit={handleSubmit}>
        {/* Legal Full Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Legal Full Name <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 ml-1">(As per Government Issued ID)</span>
          </Label>
          <Input
            placeholder="John Doe"
            value={formData.legalName}
            onChange={(e) => setField("legalName", e.target.value)}
            onBlur={(e) => validateField("legalName", e.target.value)}
            className={inputClass(errors.legalName)}
            aria-invalid={!!errors.legalName || undefined}
          />
          {errors.legalName && <p className="text-xs text-red-500 mt-1">{errors.legalName}</p>}
        </div>

        {/* Display Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Display Name <span className="text-xs text-gray-500 ml-1">(Optional)</span>
          </Label>
          <Input
            placeholder="John"
            value={formData.displayName}
            onChange={(e) => setField("displayName", e.target.value)}
            onBlur={(e) => validateField("displayName", e.target.value)}
            className={inputClass(errors.displayName)}
            aria-invalid={!!errors.displayName || undefined}
          />
          {errors.displayName && <p className="text-xs text-red-500 mt-1">{errors.displayName}</p>}
        </div>

        {/* Email (Pre-filled & Disabled) */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            disabled
            className="h-12 bg-gray-100 text-gray-500 border-gray-300"
            title="Email verified via authentication"
          />
          <p className="text-xs text-green-600">✓ Email verified</p>
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Province <span className="text-red-500">*</span>
            </Label>
            <Select
              instanceId="owner-province"
              options={canadianProvinces.map((p) => ({
                value: String(p.canadian_province_id),
                label: p.canadian_province_name,
              }))}
              value={
                canadianProvinces
                  .map((p) => ({
                    value: String(p.canadian_province_id),
                    label: p.canadian_province_name,
                  }))
                  .find((opt) => opt.value === String(formData.canadian_provinceid)) || null
              }
              onChange={(opt: any) => {
                setField("canadian_provinceid", opt ? Number.parseInt(opt.value) : "")
                setField("province", opt?.label || "")
              }}
              styles={selectStyles}
              placeholder="Select province"
            />
            {errors.province && <p className="text-xs text-red-500 mt-1">{errors.province}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </Label>
            <Select
              instanceId="owner-city"
              isDisabled={!formData.canadian_provinceid}
              options={(canadianCities || []).map((c) => ({
                value: String(c.canadian_city_id),
                label: c.canadian_city_name,
              }))}
              value={
                (canadianCities || [])
                  .map((c) => ({
                    value: String(c.canadian_city_id),
                    label: c.canadian_city_name,
                  }))
                  .find((opt) => opt.value === String(formData.canadian_cityid)) || null
              }
              onChange={(opt: any) => {
                setField("canadian_cityid", opt ? Number.parseInt(opt.value) : "")
                setField("city", opt?.label || "")
              }}
              styles={selectStyles}
              placeholder={formData.canadian_provinceid ? "Select city" : "Select province first"}
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="123 Main Street"
            value={formData.address}
            onChange={(e) => setField("address", e.target.value)}
            onBlur={(e) => validateField("address", e.target.value)}
            className={inputClass(errors.address)}
            aria-invalid={!!errors.address || undefined}
          />
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
        </div>

        {/* Postal Code & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Postal Code <span className="text-red-500">*</span>
            </Label>
            <Input
              maxLength={7}
              placeholder="A1A 1A1"
              value={formData.postalCode}
              onChange={(e) => setField("postalCode", e.target.value)}
              onBlur={(e) => validateField("postalCode", e.target.value)}
              className={inputClass(errors.postalCode)}
              aria-invalid={!!errors.postalCode || undefined}
            />
            {errors.postalCode && <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Mobile Phone <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-md border border-r-0 bg-gray-50 px-3 text-sm text-gray-700 select-none">
                +1
              </span>
              <Input
                type="tel"
                inputMode="numeric"
                maxLength={MAX_PHONE_LEN}
                placeholder="416 555 0123"
                value={formData.phone}
                onChange={(e) => setField("phone", e.target.value)}
                onBlur={(e) => validateField("phone", e.target.value)}
                className={`${inputClass(errors.phone)} rounded-l-none border-l-0`}
                aria-invalid={!!errors.phone || undefined}
              />
            </div>
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* File Uploads */}
        <div className="space-y-6 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Upload Documents</h3>

    

           <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Government Issued ID Type <span className="text-red-500">*</span>
              </Label>
              <Select
                instanceId="id-type"
                options={ID_TYPE_OPTIONS}
                value={
                  ID_TYPE_OPTIONS.find((opt) => opt.value === formData.idType) || null
                }
                onChange={(opt: any) => {
                  setField("idType", opt ? opt.value : "")
                }}
                styles={selectStyles}
                placeholder="Select ID type"
              />
              {errors.idType && <p className="text-xs text-red-500 mt-1">{errors.idType}</p>}
            </div>



          <FileUpload
            label="Government Issued Photo ID"
            description={formData.idType}
            acceptedTypes={["image/jpeg", "image/png"]}
            maxSize={1}
            fileType="photoId"
            onFileSelect={(fileData) =>
              setUploadedFiles((prev) => ({
                ...prev,
                photoId: fileData,
              }))
            }
            error={errors.photoId}
            uploadedFile={uploadedFiles.photoId}
            disabled={!formData.idType}
          />

<div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Proof of Residence Type <span className="text-red-500">*</span>
              </Label>
              <Select
                instanceId="proof-type"
                options={PROOF_TYPE_OPTIONS}
                value={
                  PROOF_TYPE_OPTIONS.find((opt) => opt.value === formData.proofType) || null
                }
                onChange={(opt: any) => {
                  setField("proofType", opt ? opt.value : "")
                }}
                styles={selectStyles}
                placeholder="Select proof of residence"
              />
              {errors.proofType && <p className="text-xs text-red-500 mt-1">{errors.proofType}</p>}
            </div>



          <FileUpload
            label="Residential Ownership Document"
            description={formData.proofType}
            acceptedTypes={["application/pdf"]}
            maxSize={3}
            fileType="ownershipDoc"
            onFileSelect={(fileData) =>
              setUploadedFiles((prev) => ({
                ...prev,
                ownershipDoc: fileData,
              }))
            }
            error={errors.ownershipDoc}
            uploadedFile={uploadedFiles.ownershipDoc}
            disabled={!formData.proofType}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <Checkbox
              id="ownership"
              checked={formData.agreeOwnership}
              onCheckedChange={(v) => setField("agreeOwnership", Boolean(v))}
              className="mt-1"
            />
            <Label htmlFor="ownership" className="text-sm text-gray-700 leading-relaxed">
              I confirm I am the lawful owner or authorized representative of this property.{" "}
              <span className="text-red-500">*</span>
            </Label>
          </div>
          {errors.agreeOwnership && <p className="text-xs text-red-500 ml-7">{errors.agreeOwnership}</p>}

          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={(v) => setField("agreeTerms", Boolean(v))}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
              I agree to the{" "}
              <a href="#" className="hover:underline font-medium" style={{ color: BRAND }}>
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="hover:underline font-medium" style={{ color: BRAND }}>
                Privacy Policy
              </a>
              <span className="text-red-500">*</span>
            </Label>
          </div>
          {errors.agreeTerms && <p className="text-xs text-red-500 ml-7">{errors.agreeTerms}</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6">
        
          <Button
            type="submit"
            className="flex-1 h-12 text-white font-semibold transition-colors"
            style={{ backgroundColor: BRAND }}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit for Verification"}
          </Button>
        </div>
      </form>
    </div>
  )
}
