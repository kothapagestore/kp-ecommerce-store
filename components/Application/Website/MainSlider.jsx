'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import slider1 from '@/public/assets/images/slider-1.jpg';
import slider2 from '@/public/assets/images/slider-2.jpg';
import slider3 from '@/public/assets/images/slider-3.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center"
  >
    <LuChevronRight size={24} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center"
  >
    <LuChevronLeft size={24} />
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
    <section className="relative">
      <Slider {...settings}>
        {slides.map((img, i) => (
          <div key={i} className="relative h-[calc(100vh-80px)] w-full">
            <Image
              src={img}
              alt="slider"
              fill
              className="object-cover"
              priority
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </Slider>
    </section>
  );
}
