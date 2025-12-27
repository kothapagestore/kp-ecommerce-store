'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import slider1 from '@/public/assets/images/slider-1.jpg';
import slider2 from '@/public/assets/images/slider-2.jpg';
import slider3 from '@/public/assets/images/slider-3.jpg';
import slider4 from '@/public/assets/images/slider-4.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/* ---------- Custom Arrows (ThePlaza style) ---------- */
const ArrowNext = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 
               bg-white/90 hover:bg-white w-12 h-12 rounded-full 
               flex items-center justify-center shadow"
  >
    <LuChevronRight size={26} className="text-gray-700" />
  </button>
);

const ArrowPrev = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 
               bg-white/90 hover:bg-white w-12 h-12 rounded-full 
               flex items-center justify-center shadow"
  >
    <LuChevronLeft size={26} className="text-gray-700" />
  </button>
);

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  const slides = [slider1, slider2, slider3, slider4];

  return (
    <>
      {/* ================= Announcement Bar ================= */}
      <div className="w-full bg-black text-white text-center py-2 text-sm tracking-wide">
        Free Shipping on Orders Above ₹999 🚚
      </div>

      {/* ================= Main Slider ================= */}
      <section className="relative">
        <Slider {...settings}>
          {slides.map((img, index) => (
            <div key={index} className="relative h-[100vh] w-full">
              {/* Background Image */}
              <Image
                src={img}
                alt="slider"
                fill
                priority
                className="object-cover"
              />

              {/* Professional Dark Overlay (ThePlaza style) */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
}
