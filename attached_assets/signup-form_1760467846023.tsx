"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
// New: searchable dropdowns
import Select from "react-select"
import countryList from "react-select-country-list"
import { provinceToCities } from "@/lib/province-to-cities"

type UserType = "customer" | "owner"
type AddressType = "canadian" | "international"

type SignupErrors = Partial<{
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  address: string
  province: string
  state: string
  city: string
  postalCode: string
  phoneNumber: string
  country: string
  agreeToTerms: string
}>

const BRAND = "#3F2C77"
const passwordRegex = /^(?=.*[A-Z])(?=.*\\d).{8,}$/
// Canadian postal format (A1A 1A1)
const canadianPostalRegex = /^[A-Z]\\d[A-Z][ ]?\\d[A-Z]\\d$/
// Strict Canadian phone (10 digits)
const MAX_PHONE_LEN = 10
const sanitizePhone = (s: string) => s.replace(/\\D/g, "").slice(0, MAX_PHONE_LEN)

const nameRegex = /^[A-Za-z ]{1,20}$/
const nameSanitize = (s: string) =>
  s
    .replace(/[^A-Za-z ]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 20)

const canadianAddressRegex = /^\d+\s+[A-Za-z0-9\s,'-]+$/

const PROVINCE_CITIES: Record<string, string[]> = provinceToCities

// Reference lists (kept small and fast)
const CA_PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
]
const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

// react-select styles to match brand subtly
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

export function SignupForm() {
  const router = useRouter()

  const [userType, setUserType] = useState<UserType>("customer")
  const [addressType, setAddressType] = useState<AddressType>("canadian")

  const countryOptions = useMemo(
    () =>
      countryList()
        .getData()
        .map((c) => ({ value: c.value, label: c.label })),
    [],
  )

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    // address fields
    address: "",
    province: "",
    state: "",
    city: "",
    postalCode: "",
    country: { value: "CA", label: "Canada" } as { value: string; label: string } | null,
    // phone and terms
    phoneNumber: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<SignupErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setField = (field: keyof typeof formData, value: any) => {
    if ((field === "firstName" || field === "lastName") && typeof value === "string") {
      value = nameSanitize(value)
    }
    if (field === "phoneNumber" && typeof value === "string") value = sanitizePhone(value)
    if (field === "postalCode" && typeof value === "string") value = value.toUpperCase()

    if (field === "province") {
      setFormData((prev) => ({ ...prev, province: value, city: "" }))
      validateField("province", value)
      setErrors((e) => ({ ...e, city: "" }))
      return
    }

    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field !== "agreeToTerms") validateField(field, value)
    else setErrors((e) => ({ ...e, agreeToTerms: "" }))
  }

  const validateField = (field: keyof typeof formData, raw: any) => {
    const value = typeof raw === "string" ? raw.trim() : raw
    let msg = ""

    switch (field) {
      case "firstName":
      case "lastName": {
        const v = String(value)
        if (!v) msg = "This field is Required."
        else if (!nameRegex.test(v)) msg = "Letters and Spaces Only"
        break
      }
      case "password":
        if (!value) msg = "Password is Required."
        else if (!passwordRegex.test(String(value))) msg = "Min 8 chars, 1 uppercase, 1 number."
        break
      case "confirmPassword":
        if (!value) msg = "Confirm Your Password."
        else if (String(value) !== formData.password.trim()) msg = "Passwords do not match."
        break
      case "address": {
        const v = String(value)
        if (!v) msg = "Address is Required."
        else {
          const isCanadianFlow =
            userType === "owner" ||
            (userType === "customer" && addressType === "canadian") ||
            (userType === "customer" && addressType === "international" && formData.country?.value === "CA")
          if (isCanadianFlow && !canadianAddressRegex.test(v)) {
            msg = "Use a Canadian Street Address (e.g., 123 Queen Street W)."
          }
        }
        break
      }
      case "province":
      case "state":
      case "city":
        if (!value) msg = "This field is required."
        break
      case "postalCode": {
        const v = String(value).toUpperCase()
        if (!v) msg = "Postal code is required."
        else if (!canadianPostalRegex.test(v)) msg = "Format: A1A 1A1"
        break
      }
      case "phoneNumber": {
        const v = String(value)
        if (!v) msg = "Phone number is required."
        else if (!/^\\d+$/.test(v)) msg = "Digits only."
        else if (v.length !== MAX_PHONE_LEN) msg = "Must be 10 digits."
        break
      }
      case "country":
        if (!value) msg = "Country is required."
        break
    }

    setErrors((prev) => ({ ...prev, [field]: msg }))
    return msg === ""
  }

  const validateAll = () => {
    const required: (keyof typeof formData)[] = ["firstName", "lastName", "password", "confirmPassword", "phoneNumber"]

    if (userType === "owner") {
      // Owner: Canadian fields only
      required.push("province", "city", "address", "postalCode")
    } else if (addressType === "canadian") {
      required.push("province", "city", "address", "postalCode")
    } else {
      // International
      required.push("country", "address")
      if (formData.country?.value === "CA") {
        required.push("province", "city", "postalCode")
      } else if (formData.country?.value === "US") {
        required.push("state", "city")
        // do not force Canadian postal for US/others
      } else {
        required.push("state", "city")
      }
    }

    const ok = required.every((f) => validateField(f, formData[f]))
    const termsOk = formData.agreeToTerms
    if (!termsOk) setErrors((e) => ({ ...e, agreeToTerms: "You must accept the terms." }))
    return ok && termsOk
  }

  const inputClass = (invalid?: string) =>
    [
      "h-12",
      "border-gray-300",
      "focus:border-(--color-ring)",
      "focus:ring-(--color-ring)",
      invalid && "border-red-500 ring-1 ring-red-500 focus:ring-red-500 focus:border-red-500",
    ]
      .filter(Boolean)
      .join(" ")

  // Helpers for react-select controlled values
  const toOption = (val: string | null) => (val ? { value: val, label: val } : null)

  return (
    <div className="space-y-8">
      {/* Logo + Title */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-3">
          <img className="w-[141px] h-[94px]" alt="Group" src="/figmaAssets/group-369.png" />
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold flex items-center justify-center" style={{ color: BRAND }}>
          {userType === "customer" ? "Register as Customer" : "Register as Property Owner"}
        </h1>

        <div className="mt-2 flex gap-2 justify-center">
          <Button
            type="button"
            aria-pressed={userType === "customer"}
            onClick={() => setUserType("customer")}
            className={`h-10 px-4 ${userType === "customer" ? "shadow-sm" : ""}`}
            style={{
              backgroundColor: userType === "customer" ? BRAND : "white",
              color: userType === "customer" ? "white" : BRAND,
              border: `1px solid ${BRAND}`,
            }}
          >
            As Customer
          </Button>
          <Button
            type="button"
            aria-pressed={userType === "owner"}
            onClick={() => {
              setUserType("owner")
              setAddressType("canadian")
              setFormData((p) => ({
                ...p,
                country: { value: "CA", label: "Canada" },
                state: "",
                province: "",
                city: "",
                postalCode: "",
              }))
            }}
            className={`h-10 px-4 ${userType === "owner" ? "shadow-sm" : ""}`}
            style={{
              backgroundColor: userType === "owner" ? BRAND : "white",
              color: userType === "owner" ? "white" : BRAND,
              border: `1px solid ${BRAND}`,
            }}
          >
            As Property Owner
          </Button>
        </div>
      </div>

      {/* Form */}
      <form
        noValidate
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          if (!validateAll()) return
          setIsSubmitting(true)
          setTimeout(() => {
            setIsSubmitting(false)
            router.push("/signup/thank-you")
          }, 900)
        }}
      >
        {/* Full Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Full Name</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setField("firstName", e.target.value)}
                onBlur={(e) => validateField("firstName", e.target.value)}
                className={inputClass(errors.firstName)}
                aria-invalid={!!errors.firstName || undefined}
              />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setField("lastName", e.target.value)}
                onBlur={(e) => validateField("lastName", e.target.value)}
                className={inputClass(errors.lastName)}
                aria-invalid={!!errors.lastName || undefined}
              />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setField("password", e.target.value)}
              onBlur={(e) => validateField("password", e.target.value)}
              className={inputClass(errors.password)}
              aria-invalid={!!errors.password || undefined}
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Confirm Password</Label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setField("confirmPassword", e.target.value)}
              onBlur={(e) => validateField("confirmPassword", e.target.value)}
              className={inputClass(errors.confirmPassword)}
              aria-invalid={!!errors.confirmPassword || undefined}
            />
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>
        </div>

        {userType === "customer" && (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  id="addr-ca"
                  type="radio"
                  name="addr-type"
                  checked={addressType === "canadian"}
                  onChange={() => {
                    setAddressType("canadian")
                    setFormData((p) => ({ ...p, country: { value: "CA", label: "Canada" }, state: "" }))
                  }}
                  className="h-4 w-4 accent-(--color-ring)"
                />
                <Label htmlFor="addr-ca" className="text-sm">
                  I prefer a Canadian address
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="addr-intl"
                  type="radio"
                  name="addr-type"
                  checked={addressType === "international"}
                  onChange={() => {
                    setAddressType("international")
                    setFormData((p) => ({ ...p, country: null, province: "", state: "", city: "", postalCode: "" }))
                  }}
                  className="h-4 w-4 accent-(--color-ring)"
                />
                <Label htmlFor="addr-intl" className="text-sm">
                  I prefer an International address
                </Label>
              </div>
            </div>
          </div>
        )}

        {/* Address groups */}
        {userType === "owner" || (userType === "customer" && addressType === "canadian") ? (
          <>
            {/* Canadian address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Province</Label>
                <Select
                  instanceId="ca-province"
                  options={CA_PROVINCES.map((p) => ({ value: p, label: p }))}
                  value={toOption(formData.province)}
                  onChange={(opt: any) => setField("province", opt?.value || "")}
                  styles={selectStyles}
                  placeholder="Select province"
                />
                {errors.province && <p className="text-xs text-red-500 mt-1">{errors.province}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">City</Label>
                <Select
                  instanceId="ca-city"
                  isDisabled={!formData.province}
                  options={(PROVINCE_CITIES[formData.province] || []).map((c) => ({ value: c, label: c }))}
                  value={toOption(formData.city)}
                  onChange={(opt: any) => setField("city", opt?.value || "")}
                  styles={selectStyles}
                  placeholder={formData.province ? "Select city" : "Select province first"}
                />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Address</Label>
              <Input
                placeholder="Street Address"
                value={formData.address}
                onChange={(e) => setField("address", e.target.value)}
                onBlur={(e) => validateField("address", e.target.value)}
                className={inputClass(errors.address)}
                aria-invalid={!!errors.address || undefined}
              />
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Postal Code</Label>
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
                <Label className="text-sm font-medium text-gray-700">Phone Number (Canada)</Label>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 bg-gray-50 px-3 text-sm text-gray-700 select-none">
                    +1
                  </span>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    maxLength={MAX_PHONE_LEN}
                    placeholder="10 digits"
                    value={formData.phoneNumber}
                    onChange={(e) => setField("phoneNumber", e.target.value)}
                    onBlur={(e) => validateField("phoneNumber", e.target.value)}
                    className={`${inputClass(errors.phoneNumber)} rounded-l-none border-l-0`}
                    aria-invalid={!!errors.phoneNumber || undefined}
                  />
                </div>
                {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* International address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Country</Label>
                <Select
                  instanceId="country"
                  options={countryOptions}
                  value={formData.country}
                  onChange={(opt: any) => {
                    setField("country", opt)
                    // reset state fields when country changes
                    setFormData((p) => ({ ...p, province: "", state: "", city: "", postalCode: "" }))
                  }}
                  styles={selectStyles}
                  placeholder="Select country"
                />
                {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
              </div>

              {formData.country?.value === "CA" ? (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Province</Label>
                  <Select
                    instanceId="intl-ca-province"
                    options={CA_PROVINCES.map((p) => ({ value: p, label: p }))}
                    value={toOption(formData.province)}
                    onChange={(opt: any) => setField("province", opt?.value || "")}
                    styles={selectStyles}
                    placeholder="Select province"
                  />
                  {errors.province && <p className="text-xs text-red-500 mt-1">{errors.province}</p>}
                </div>
              ) : formData.country?.value === "US" ? (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">State</Label>
                  <Select
                    instanceId="intl-us-state"
                    options={US_STATES.map((s) => ({ value: s, label: s }))}
                    value={toOption(formData.state)}
                    onChange={(opt: any) => setField("state", opt?.value || "")}
                    styles={selectStyles}
                    placeholder="Select state"
                  />
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Province/State</Label>
                  <Input
                    placeholder="Province/State"
                    value={formData.state}
                    onChange={(e) => setField("state", e.target.value)}
                    onBlur={(e) => validateField("state", e.target.value)}
                    className={inputClass(errors.state)}
                  />
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">City</Label>
                {formData.country?.value === "CA" ? (
                  <Select
                    instanceId="intl-ca-city"
                    isDisabled={!formData.province}
                    options={(PROVINCE_CITIES[formData.province] || []).map((c) => ({ value: c, label: c }))}
                    value={toOption(formData.city)}
                    onChange={(opt: any) => setField("city", opt?.value || "")}
                    styles={selectStyles}
                    placeholder={formData.province ? "Select city" : "Select province first"}
                  />
                ) : (
                  <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setField("city", e.target.value)}
                    onBlur={(e) => validateField("city", e.target.value)}
                    className={inputClass(errors.city)}
                  />
                )}
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Address</Label>
                <Input
                  placeholder="Street address"
                  value={formData.address}
                  onChange={(e) => setField("address", e.target.value)}
                  onBlur={(e) => validateField("address", e.target.value)}
                  className={inputClass(errors.address)}
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Postal/ZIP remains; Phone with +1 prefix kept for Canada */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Postal / ZIP</Label>
                <Input
                  maxLength={10}
                  placeholder={formData.country?.value === "CA" ? "A1A 1A1" : "ZIP / Postal"}
                  value={formData.postalCode}
                  onChange={(e) => setField("postalCode", e.target.value)}
                  onBlur={(e) => {
                    if (formData.country?.value === "CA") validateField("postalCode", e.target.value)
                    else
                      setErrors((prev) => ({
                        ...prev,
                        postalCode: e.target.value.trim() ? "" : "Postal/ZIP is required.",
                      }))
                  }}
                  className={inputClass(errors.postalCode)}
                />
                {errors.postalCode && <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Phone Number (Canada)</Label>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 bg-gray-50 px-3 text-sm text-gray-700 select-none">
                    +1
                  </span>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    maxLength={MAX_PHONE_LEN}
                    placeholder="10 digits"
                    value={formData.phoneNumber}
                    onChange={(e) => setField("phoneNumber", e.target.value)}
                    onBlur={(e) => validateField("phoneNumber", e.target.value)}
                    className={`${inputClass(errors.phoneNumber)} rounded-l-none border-l-0`}
                  />
                </div>
                {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>
          </>
        )}

        {/* Terms */}
        <div className="flex items-start gap-2 pt-2">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(v) => setField("agreeToTerms", Boolean(v))}
            className="mt-1"
          />
          <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
            I agree to the{" "}
            <a href="#" className="hover:underline" style={{ color: BRAND }}>
              Terms and Condition
            </a>{" "}
            and{" "}
            <a href="#" className="hover:underline" style={{ color: BRAND }}>
              Privacy Policy
            </a>
          </Label>
        </div>
        {errors.agreeToTerms && <p className="text-xs text-red-500">{errors.agreeToTerms}</p>}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-12 text-white transition-colors"
          style={{ backgroundColor: BRAND }}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>

      <div className="text-center text-xs text-gray-500 pt-4">Copyright 2025, All rights reserved. – Hotelire.ca</div>
    </div>
  )
}
