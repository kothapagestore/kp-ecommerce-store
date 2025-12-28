'use client';

import {
  USER_DASHBOARD,
  WEBSITE_HOME,
  WEBSITE_LOGIN,
  WEBSITE_SHOP,
} from '@/routes/WebsiteRoute';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from '@/public/assets/images/logo-black.png';
import { IoIosSearch } from 'react-icons/io';
import Cart from './Cart';
import { VscAccount } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import userIcon from '@/public/assets/images/user.png';
import { IoMdClose } from 'react-icons/io';
import { HiMiniBars3 } from 'react-icons/hi2';
import Search from './Search';

const Header = () => {
  const auth = useSelector((store) => store.authStore.auth);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <div className="flex items-center justify-between lg:px-32 px-4 lg:py-6 py-4">
          {/* LOGO */}
          <Link href={WEBSITE_HOME}>
            <Image
              src={logo}
              width={383}
              height={146}
              alt="logo"
              className="lg:w-32 w-24"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-10">
            {[
              ['Home', WEBSITE_HOME],
              ['About', '/about-us'],
              ['Shop', WEBSITE_SHOP],
              ['T-shirt', `${WEBSITE_SHOP}?category=t-shirts`],
              ['Hoodies', `${WEBSITE_SHOP}?category=hoodies`],
              ['Oversized', `${WEBSITE_SHOP}?category=overshized`],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-white hover:text-primary font-medium transition"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-6">
            <button onClick={() => setShowSearch(!showSearch)}>
              <IoIosSearch
                size={24}
                className="text-white hover:text-primary"
              />
            </button>

            <Cart />

            {!auth ? (
              <Link href={WEBSITE_LOGIN}>
                <VscAccount
                  size={24}
                  className="text-white hover:text-primary"
                />
              </Link>
            ) : (
              <Link href={USER_DASHBOARD}>
                <Avatar>
                  <AvatarImage src={auth?.avatar?.url || userIcon.src} />
                </Avatar>
              </Link>
            )}

            {/* MOBILE MENU BUTTON */}
            <button className="lg:hidden" onClick={() => setIsMobileMenu(true)}>
              <HiMiniBars3 size={26} className="text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black/90 z-[999] transition-transform duration-300 ${
          isMobileMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4">
          <Image src={logo} alt="logo" className="w-24" />
          <button onClick={() => setIsMobileMenu(false)}>
            <IoMdClose size={28} className="text-white" />
          </button>
        </div>

        <ul className="flex flex-col gap-6 px-6 pt-10">
          {[
            ['Home', WEBSITE_HOME],
            ['About', '/about-us'],
            ['Shop', WEBSITE_SHOP],
            ['T-shirt', `${WEBSITE_SHOP}?category=t-shirts`],
            ['Hoodies', `${WEBSITE_SHOP}?category=hoodies`],
            ['Oversized', `${WEBSITE_SHOP}?category=overshized`],
          ].map(([label, href]) => (
            <li key={label}>
              <Link
                href={href}
                onClick={() => setIsMobileMenu(false)}
                className="text-white text-lg font-medium"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* SEARCH */}
      <Search isShow={showSearch} />
    </>
  );
};

export default Header;
