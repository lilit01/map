import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../globals.css';
import { Keyboard, Pagination } from 'swiper/modules';

export default function Carousel(isSmallScreen: any) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={isSmallScreen ? false : { clickable: true }}
        modules={[Keyboard, Pagination]}
        breakpoints={{
          320: { // for small screens
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: { // for medium screens
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1233: { // for larger screens
            slidesPerView: 3,
            spaceBetween: 30,
          }
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={
              "/assets/images/home1.png"
            }
            alt="Skeleton"
          /></SwiperSlide>
        <SwiperSlide> <img
          src={
            "/assets/images/home2.png"
          }
          alt="Skeleton"
        /></SwiperSlide>
        <SwiperSlide> <img
          src={
            "/assets/images/home3.png"
          }
          alt="Skeleton"
        /></SwiperSlide>
        <SwiperSlide> <img
          src={
            "/assets/images/home1.png"
          }
          alt="Skeleton"
        /></SwiperSlide>
        <SwiperSlide> <img
          src={
            "/assets/images/home2.png"
          }
          alt="Skeleton"
        /></SwiperSlide>
      </Swiper>
    </>
  );
}

