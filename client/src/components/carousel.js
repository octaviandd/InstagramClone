/** @format */

import carousel1 from "../assets/carousel1.jpg";
import carousel2 from "../assets/carousel2.jpg";
import carousel3 from "../assets/carousel3.jpg";
import carousel4 from "../assets/carousel4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import React from "react";

export default function Carousel() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      updateOnWindowResize={true}
      roundLengths={true}
      autoplay={(true, { disableOnInteraction: false, delay: 3000 })}
      lazy={true}
      fadeEffect={(true, { crossFade: true })}
      effect="slide"
    >
      <SwiperSlide>
        <img src={carousel1} alt="carousel1" width="240" height="426"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={carousel2} alt="carousel2" width="240" height="426"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={carousel3} alt="carousel3" width="240" height="426"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={carousel4} alt="carousel4" width="240" height="426"></img>
      </SwiperSlide>
    </Swiper>
  );
}
