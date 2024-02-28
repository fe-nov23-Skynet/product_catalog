import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Pagination, Navigation, Autoplay, EffectFade,
} from 'swiper/modules';
import Slide_1_image from '../../banner-images/banner-tablets.png';
import Slide_2_image from '../../banner-images/banner-phones.png';
import Slide_3_image from '../../banner-images/banner-accessories.png';
import Slide_4_image from '../../banner-images/banner.webp';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './swiper.scss';

export const SliderBar = () => (
  <div className="container">
    <div className="swiper-block">
      <Swiper
        navigation
        pagination={{ dynamicBullets: true }}
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
      >
        <SwiperSlide>
          <img src={Slide_4_image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide_2_image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide_3_image} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide_1_image} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
);
