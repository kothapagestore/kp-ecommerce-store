'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import slider1 from '@/public/assets/images/slider-1.jpg';
import slider2 from '@/public/assets/images/slider-2.jpg';
import slider3 from '@/public/assets/images/slider-3.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/* ---------- Arrows ---------- */
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 w-12 h-12 rounded-full flex items-center justify-center"
  >
    <LuChevronRight size={26} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 w-12 h-12 rounded-full flex items-center justify-center"
  >
    <LuChevronLeft size={26} />
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const slides = [slider1, slider2, slider3];

  return (
    <section className="relative w-full h-screen">
      <Slider {...settings}>
        {slides.map((img, i) => (
          <div key={i} className="relative w-full h-screen">
            <Image
              src={img}
              alt="slider"
              fill
              priority
              className="object-cover"
            />

            {/* Dark Professional Overlay */}
            <div className="absolute inset-0 bg-black/15" />
          </div>
        ))}
      </Slider>
    </section>
  );
}
