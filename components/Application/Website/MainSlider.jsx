'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import slider1 from '@/public/assets/images/slider-1.jpg';
import slider2 from '@/public/assets/images/slider-2.jpg';
import slider3 from '@/public/assets/images/slider-3.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/* ---------- Custom Arrows ---------- */
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 
               bg-black/30 hover:bg-black/50 
               w-12 h-12 rounded-full flex items-center justify-center"
  >
    <LuChevronRight size={26} className="text-white" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 
               bg-black/30 hover:bg-black/50 
               w-12 h-12 rounded-full flex items-center justify-center"
  >
    <LuChevronLeft size={26} className="text-white" />
  </button>
);

/* ---------- Slider ---------- */
export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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

  const slides = [slider1, slider2, slider3];

  return (
    <section className="relative">
      <Slider {...settings}>
        {slides.map((img, i) => (
          <div key={i} className="relative h-screen w-full">
            {/* Background Image */}
            <Image
              src={img}
              alt="Hero Slide"
              fill
              priority
              className="object-cover"
            />

            {/* Professional Neutral Overlay */}
            <div className="absolute inset-0 bg-black/15"></div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
