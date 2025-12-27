'use client';

import { LuSearch, LuShoppingCart, LuUser } from 'react-icons/lu';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl"></span>
          <div>
            <h1 className="text-xl font-bold text-orange-500">Kothapage</h1>
            <p className="text-xs text-white/80">KP Store Online</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Men', 'Women', 'Fashion', 'Kids'].map(
            (item, i) => (
              <a
                key={i}
                className={`text-sm font-semibold cursor-pointer transition ${
                  item === 'Home'
                    ? 'text-orange-500'
                    : 'text-white hover:text-orange-400'
                }`}
              >
                {item}
              </a>
            )
          )}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5 text-white">
          <LuSearch
            size={20}
            className="cursor-pointer hover:text-orange-400"
          />

          <div className="relative cursor-pointer">
            <LuShoppingCart size={22} className="hover:text-orange-400" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          <LuUser size={22} className="cursor-pointer hover:text-orange-400" />
        </div>
      </div>
    </header>
  );
}
