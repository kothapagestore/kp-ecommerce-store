'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { HiMiniBars3 } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { IoIosSearch } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';

import {
  WEBSITE_HOME,
  WEBSITE_SHOP,
  WEBSITE_LOGIN,
  USER_DASHBOARD,
} from '@/routes/WebsiteRoute';

import logo from '@/public/assets/images/logo-black.png';
import Cart from './Cart';
import Search from './Search';
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import userIcon from '@/public/assets/images/user.png';

export default function Header() {
  const auth = useSelector((s) => s.authStore.auth);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        {/* LOGO */}
        <Link href={WEBSITE_HOME}>
          <Image src={logo} alt="logo" className="w-28 brightness-0 invert" />
        </Link>

        {/* MENU */}
        <nav
          className={`fixed lg:static top-0 left-0 w-full lg:w-auto h-screen lg:h-auto bg-black lg:bg-transparent transition-all ${
            isMobileMenu ? 'left-0' : '-left-full'
          }`}
        >
          {/* Mobile Header */}
          <div className="lg:hidden flex justify-between items-center px-4 py-4 border-b border-gray-700">
            <Image src={logo} alt="logo" className="w-24 invert" />
            <IoMdClose
              size={26}
              className="cursor-pointer"
              onClick={() => setIsMobileMenu(false)}
            />
          </div>

          <ul className="lg:flex gap-10 px-6 lg:px-0 py-6 lg:py-0 font-medium tracking-wide">
            {[
              { name: 'Home', link: WEBSITE_HOME },
              { name: 'Men', link: WEBSITE_SHOP },
              { name: 'Women', link: `${WEBSITE_SHOP}?category=women` },
              { name: 'Fashion', link: `${WEBSITE_SHOP}?category=fashion` },
              { name: 'Kids', link: `${WEBSITE_SHOP}?category=kids` },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  onClick={() => setIsMobileMenu(false)}
                  className="block py-2 hover:text-orange-400"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-6">
          <button onClick={() => setShowSearch(!showSearch)}>
            <IoIosSearch size={22} />
          </button>

          <Cart />

          {!auth ? (
            <Link href={WEBSITE_LOGIN}>
              <VscAccount size={22} />
            </Link>
          ) : (
            <Link href={USER_DASHBOARD}>
              <Avatar className="w-8 h-8">
                <AvatarImage src={auth?.avatar?.url || userIcon.src} />
              </Avatar>
            </Link>
          )}

          {/* Mobile Menu */}
          <button className="lg:hidden" onClick={() => setIsMobileMenu(true)}>
            <HiMiniBars3 size={26} />
          </button>
        </div>
      </div>

      <Search isShow={showSearch} />
    </header>
  );
}
