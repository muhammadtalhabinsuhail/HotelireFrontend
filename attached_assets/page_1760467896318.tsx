import AuthLayout from "@/components/auth/auth-layout"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <AuthLayout>
      <div className="space-y-10">
        {/* Logo at top */}
        <div className="flex items-center gap-3">
          {/* Dummy logo image placeholder (replace later) */}
          <div className="h-10 w-10 rounded bg-[#F6C347]" aria-hidden />
          <p className="text-2xl font-bold" style={{ color: "#3F2C77" }}>
            Hotelire
          </p>
        </div>

        {/* Success icon + headings */}
        <div className="pt-6">
          <div className="mx-auto h-20 w-20 rounded-full bg-[#41C23B]/15 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#41C23B]" fill="currentColor" aria-hidden>
              <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
            </svg>
          </div>
          <h1 className="mt-6 text-center text-2xl lg:text-3xl font-bold text-[#41C23B]">Thank you for signed up</h1>
          <p className="mt-3 text-center text-gray-600">
            Please check your email <br className="hidden sm:block" /> to verify your account
          </p>

          <div className="mt-8 flex justify-center">
            <Link href="/signin" className="px-5 py-2 rounded-md text-white" style={{ backgroundColor: "#3F2C77" }}>
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
