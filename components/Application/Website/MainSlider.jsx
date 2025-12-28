'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import slider1 from '@/public/assets/images/slider-1.jpg';
import slider2 from '@/public/assets/images/slider-2.jpg';
import slider3 from '@/public/assets/images/slider-3.jpg';
import slider4 from '@/public/assets/images/slider-4.jpg';

import { LuChevronRight, LuChevronLeft } from 'react-icons/lu';

/* ---------- Arrows ---------- */
const ArrowNext = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="w-12 h-12 md:w-14 md:h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white right-4 md:right-10"
  >
    <LuChevronRight size={22} className="text-gray-600" />
  </button>
);

const ArrowPrev = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="w-12 h-12 md:w-14 md:h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white left-4 md:left-10"
  >
    <LuChevronLeft size={22} className="text-gray-600" />
  </button>
);

/* ---------- SLIDES ---------- */
const slides = [
  {
    image: slider1,
    title: 'Modern Fashion',
    subtitle: 'Elevate Your Everyday Style',
  },
  {
    image: slider2,
    title: 'Built for Confidence',
    subtitle: 'Designed for Style',
  },
  {
    image: slider3,
    title: 'Wear Your Confidence',
    subtitle: 'Bold. Timeless. You.',
  },
  {
    image: slider4,
    title: 'KP STORE',
    subtitle: 'Premium Fashion for Modern Life',
  },
];

const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 3500,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Slider {...settings} className="h-screen">
        {slides.map((slide, index) => (
          <div key={index} className="relative h-screen">
            {/* IMAGE */}
            <Image
              src={slide.image}
              alt={`slider-${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/35" />

            {/* TEXT BOTTOM */}
            <div className="absolute bottom-6 md:bottom-20 left-0 w-full">
              <div className="px-4 md:px-20 text-white">
                <h2 className="text-2xl md:text-6xl font-bold">
                  {slide.title}
                </h2>
                <p className="mt-2 text-sm md:text-2xl opacity-90">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default MainSlider;
