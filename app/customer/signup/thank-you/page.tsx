"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function ThankYouPage() {



  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      {/* Left 40% image section */}
      <aside className="relative hidden md:block md:basis-2/5">
        <Image
          src="/figmaAssets/Rectangle-334.png"
          alt="Hotel room"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#3F2C77", opacity: 0.65 }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="px-8 lg:px-12">
            <h2 className="[font-family:'Poppins',Helvetica] text-white text-3xl lg:text-5xl font-bold max-w-[20ch]">
              Your perfect stay is one click away
            </h2>
          </div>
        </div>
      </aside>

      {/* Right 60% form section */}
      <main className="flex-1 md:basis-3/5 flex items-center justify-center py-10 px-6 lg:px-12 bg-white">
        <div className="w-full max-w-[720px]">
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
            {/* Success message */}
            <div className="flex items-center justify-center gap-3">
              <img
                className="w-[141px] h-[94px]"
                alt="Group"
                src="/figmaAssets/image 172.png"
              />
            </div>
            <h1
              className="text-center [font-family:'Poppins',Helvetica] text-3xl lg:text-4xl font-bold"
              style={{ color: "#41C23B" }}
            >
              Thank you for signed up
            </h1>

            <p className="text-center [font-family:'Inter',Helvetica] text-gray-600 text-lg">
              Please check your email
              <br />
              to verify your account
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
