import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="w-full bg-white min-h-[80px] lg:h-[111px] flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-[203px] py-4 lg:py-0 gap-4 lg:gap-0">
      <Link href="/">
        <Image
          src="/figmaAssets/logo_orignal.png"
          alt="Hotelire"
          width={141}
          height={94}
          className="w-[auto] h-[54px] lg:w-[auto] lg:h-[54px]"
        />
      </Link>

      <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-12 [font-family:'Inter',Helvetica] font-bold text-black text-[15px] lg:text-[17px]">
        <Link
          href="/explorecanada"
          prefetch={false}
          className="flex items-center gap-2 cursor-pointer hover:text-[#59A5B2] transition-colors duration-200"
        >
          <span>EXPLORE CANADA</span>
          {/* <ChevronDownIcon className="w-[13px] h-2" aria-hidden="true" /> */}
        </Link>
        <Link
          href="./customer/listing"
          prefetch={false}
          className="cursor-pointer hover:text-[#59A5B2] transition-colors duration-200"
        >
          SEARCH
        </Link>
        <Link
          href="/blog"
          prefetch={false}
          className="cursor-pointer hover:text-[#59A5B2] transition-colors duration-200"
        >
          BLOG
        </Link>
        <Link
          href="/contact"
          prefetch={false}
          className="cursor-pointer hover:text-[#59A5B2] transition-colors duration-200"
        >
          CONTACT
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
        <Button
          variant="outline"
          className="w-full sm:w-[160px] lg:w-[181px] h-[45px] lg:h-[55px] bg-[#f5f6fd] rounded-[5px] border border-solid border-[#d9d9d9] [font-family:'Poppins',Helvetica] font-semibold text-[#59A5B2] text-xs lg:text-sm transition-all duration-200 hover:shadow-lg"
          asChild
        >
          <a href="/customer/signin" rel="noopener noreferrer">
            LIST YOUR PROPERTY
          </a>
        </Button>
        {/* <Button className="w-full sm:w-[160px] lg:w-[181px] h-[45px] lg:h-[55px] bg-[#febc11] rounded-[5px] [font-family:'Poppins',Helvetica] font-semibold text-[#59A5B2] text-xs lg:text-sm transition-all duration-200 hover:bg-[#febc11]/90 hover:scale-105 hover:shadow-lg">
          <a href="/" rel="noopener noreferrer">
            DISCOVER MORE
          </a>
        </Button> */}
      </div>
    </nav>
  );
}