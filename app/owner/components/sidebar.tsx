import Link from "next/link"
import { LayoutDashboard, Home, Percent, Wallet, CreditCard, Mail } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
      <div className="flex h-full flex-col px-6 py-8">
        {/* Logo */}
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight">Roomy</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2.5 text-sm font-medium text-gray-900"
          >
            <Home className="h-5 w-5" />
            My Properties
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <Percent className="h-5 w-5" />
            Offers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <Wallet className="h-5 w-5" />
            Wallet
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <CreditCard className="h-5 w-5" />
            Payments
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <Mail className="h-5 w-5" />
            Inbox
          </Link>
        </nav>

        {/* User Profile */}
        <div className="border-t pt-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src="/woman-portrait.jpg" alt="Maria" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">Maria</span>
              <span className="text-xs text-gray-500">Featured | 120 properties</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
