import Image from "next/image"
import type { ReactNode } from "react"

type AuthLayoutProps = {
  children: ReactNode
  imageSrc?: string
  overlayColor?: string // hex, defaults to brand
  leftHeadline?: string
}

export default function AuthLayout({
  children,
  imageSrc = "figmaAssets/Rectangle-334.png",
  overlayColor = "#3F2C77",
  leftHeadline = "Your perfect stay is one click away",
}: AuthLayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      {/* Left 40% image section */}
      <aside className="relative hidden md:block md:basis-2/5">
        <Image src={imageSrc || "/placeholder.svg"} alt="Hotel room" fill className="object-cover" priority />
        {/* overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: overlayColor, opacity: 0.65 }} />
        {/* headline */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-8 lg:px-12">
            <h2 className="text-white text-3xl lg:text-5xl font-bold max-w-[20ch]">{leftHeadline}</h2>
          </div>
        </div>
      </aside>

      {/* Right 60% form section */}
      <main className="flex-1 md:basis-3/5 flex items-center justify-center py-10 px-6 lg:px-12 bg-white">
        <div className="w-full max-w-[720px]">{children}</div>
      </main>
    </div>
  )
}
