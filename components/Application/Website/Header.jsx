'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IoIosSearch } from 'react-icons/io';
import { HiMiniBars3 } from 'react-icons/hi2';
import { VscAccount } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Cart from './Cart';
import logo from '@/public/assets/images/logo-black.png';

import {
  WEBSITE_HOME,
  WEBSITE_SHOP,
  WEBSITE_LOGIN,
} from '@/routes/WebsiteRoute';

export default function Header() {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');

  const router = useRouter();
  const pathname = usePathname();

  // Desktop search wrapper ref
  const desktopSearchRef = useRef(null);

  /* Close search on route change */
  useEffect(() => {
    setShowSearch(false);
  }, [pathname]);

  /* Desktop only: outside click + ESC */
  useEffect(() => {
    if (!showSearch) return;

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return; // 🚫 disable outside click on mobile

    const handleClickOutside = (e) => {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(e.target)
      ) {
        setShowSearch(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`${WEBSITE_SHOP}?search=${encodeURIComponent(search)}`);
    setSearch('');
    setShowSearch(false);
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-[9999] bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
          {/* LOGO */}
          <Link href={WEBSITE_HOME} className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={40} height={40} />
            <div>
              <p className="font-bold text-lg leading-none">KP STORE</p>
              <span className="text-xs opacity-80">Online Shop</span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex gap-10 font-semibold tracking-wide">
            <Link href={WEBSITE_HOME}>Home</Link>
            <Link href={WEBSITE_SHOP}>Men</Link>
            <Link href={`${WEBSITE_SHOP}?category=women`}>Women</Link>
            <Link href={`${WEBSITE_SHOP}?category=fashion`}>Fashion</Link>
            <Link href={`${WEBSITE_SHOP}?category=kids`}>Kids</Link>
          </nav>

          {/* ICONS */}
          <div className="flex items-center gap-6 relative">
            {/* SEARCH ICON */}
            <div ref={desktopSearchRef} className="relative">
              <IoIosSearch
                size={22}
                className="cursor-pointer"
                onClick={() => setShowSearch((prev) => !prev)}
              />

              {/* DESKTOP SEARCH */}
              {showSearch && (
                <form
                  onSubmit={handleSearch}
                  className="hidden lg:flex absolute right-0 top-10 bg-white rounded-md shadow-lg overflow-hidden z-50"
                >
                  <input
                    type="text"
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="px-4 py-2 text-black outline-none w-56"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-orange-500 text-white"
                  >
                    Go
                  </button>
                </form>
              )}
            </div>

            <Cart />

            <Link href={WEBSITE_LOGIN}>
              <VscAccount size={22} />
            </Link>

            <button className="lg:hidden" onClick={() => setIsMobileMenu(true)}>
              <HiMiniBars3 size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SEARCH OVERLAY */}
      {showSearch && (
        <div className="lg:hidden fixed inset-0 z-[10001] bg-black/70">
          <form
            onSubmit={handleSearch}
            className="w-full bg-white flex items-center px-4 py-3"
          >
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 text-black outline-none"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded"
            >
              Search
            </button>

            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="ml-3 text-black text-xl font-bold"
            >
              ✕
            </button>
          </form>
        </div>
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[10000] bg-black/90 text-white transform transition-transform duration-300
        ${isMobileMenu ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <Image src={logo} alt="logo" width={40} height={40} />
          <button onClick={() => setIsMobileMenu(false)}>
            <IoMdClose size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-6 px-6 py-10 text-lg">
          <Link onClick={() => setIsMobileMenu(false)} href={WEBSITE_HOME}>
            Home
          </Link>
          <Link onClick={() => setIsMobileMenu(false)} href={WEBSITE_SHOP}>
            Men
          </Link>
          <Link
            onClick={() => setIsMobileMenu(false)}
            href={`${WEBSITE_SHOP}?category=women`}
          >
            Women
          </Link>
          <Link
            onClick={() => setIsMobileMenu(false)}
            href={`${WEBSITE_SHOP}?category=fashion`}
          >
            Fashion
          </Link>
          <Link
            onClick={() => setIsMobileMenu(false)}
            href={`${WEBSITE_SHOP}?category=kids`}
          >
            Kids
          </Link>
        </nav>
      </div>
    </>
  );
}
