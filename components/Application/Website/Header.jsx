'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IoIosSearch } from 'react-icons/io';
import { HiMiniBars3 } from 'react-icons/hi2';
import { VscAccount } from 'react-icons/vsc';
import { useState } from 'react';
import Cart from './Cart';

import logo from '@/public/assets/images/logo-black.png';
import {
  WEBSITE_HOME,
  WEBSITE_SHOP,
  WEBSITE_LOGIN,
} from '@/routes/WebsiteRoute';

export default function Header() {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div className="fixed top-0 left-0 w-full z-[60] bg-black text-white text-center text-sm py-2">
        Free Shipping on Orders Above ₹999 🚚
      </div>

      {/* HEADER */}
      <header className="absolute top-[40px] left-0 w-full z-[999] pointer-events-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
          {/* LOGO */}
          <Link href={WEBSITE_HOME} className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={40} height={40} />
            <div>
              <p className="font-bold text-lg leading-none">KP STORE</p>
              <span className="text-xs opacity-80">Online Shop</span>
            </div>
          </Link>

          {/* MENU */}
          <nav className="hidden lg:flex gap-10 font-semibold tracking-wide">
            <Link href={WEBSITE_HOME} className="hover:text-orange-400">
              Home
            </Link>
            <Link href={WEBSITE_SHOP} className="hover:text-orange-400">
              Men
            </Link>
            <Link
              href={`${WEBSITE_SHOP}?category=women`}
              className="hover:text-orange-400"
            >
              Women
            </Link>
            <Link
              href={`${WEBSITE_SHOP}?category=fashion`}
              className="hover:text-orange-400"
            >
              Fashion
            </Link>
            <Link
              href={`${WEBSITE_SHOP}?category=kids`}
              className="hover:text-orange-400"
            >
              Kids
            </Link>
          </nav>

          {/* ICONS */}
          <div className="flex items-center gap-6">
            <IoIosSearch
              size={22}
              className="cursor-pointer hover:text-orange-400"
            />
            <Cart />
            <Link href={WEBSITE_LOGIN}>
              <VscAccount size={22} className="hover:text-orange-400" />
            </Link>

            {/* MOBILE MENU */}
            <button className="lg:hidden" onClick={() => setIsMobileMenu(true)}>
              <HiMiniBars3 size={26} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
