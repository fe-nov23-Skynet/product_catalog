import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './slider.scss';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Product } from '../../types/Product';

interface Props {
  title: string;
  products: Product[];
}

export const SliderGoods: React.FC<Props> = ({ title, products }) => {
  const a = 0; // remove when some code would be written

  return (
    <div className="container swiper-goods">
      <h2 className="swiper-goods__title">{title}</h2>
      <div>
        {products.length !== 0 && (
          <Swiper
            navigation
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: true,
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 20,
              },
              960: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 20,
              },
            }}
          >

            {products.map(product => (
              <SwiperSlide>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};
