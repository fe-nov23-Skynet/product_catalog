import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './slider.scss';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';

interface Props {
  title: string;
}

// const products = getProducts('products');

export const SliderGoods: React.FC<Props> = ({ title }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts('products')
      .then(prod => setProducts(prod));
  }, []);

  console.log(products);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="container swiper-goods">
      <h2 className="swiper-goods__title">{title}</h2>
      <div>
        <Swiper
          navigation
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={1}
        >
          <SwiperSlide className="product-card-block">
            <div className="product-card">
              card 1
              {/* <ProductCard product={products[1]} /> */}
            </div>
            <div className="product-card">
              card 2
            </div>
            <div className="product-card cl-3">
              card 3
            </div>
            <div className="product-card cl-4">
              card 4
            </div>
          </SwiperSlide>

          <SwiperSlide className="product-card-block">
            <div className="product-card cl-5">
              card 5
            </div>
            <div className="product-card  cl-6">
              card 6
            </div>
            <div className="product-card">
              card 7
            </div>
            <div className="product-card">
              card 8
            </div>
          </SwiperSlide>

          <SwiperSlide className="product-card-block">
            <div className="product-card">
              card 9
            </div>
            <div className="product-card">
              card 10
            </div>
            <div className="product-card">
              card 11
            </div>
            <div className="product-card">
              card 12
            </div>
          </SwiperSlide>

          <SwiperSlide className="product-card-block">
            <div className="product-card">
              card 13
            </div>
            <div className="product-card">
              card 14
            </div>
            <div className="product-card">
              card 15
            </div>
            <div className="product-card">
              card 16
            </div>
          </SwiperSlide>

          <SwiperSlide className="product-card-block">
            <div className="product-card">
              card 17
            </div>
            <div className="product-card">
              card 18
            </div>
            <div className="product-card">
              card 19
            </div>
            <div className="product-card">
              card 20
            </div>
          </SwiperSlide>

          <SwiperSlide className="product-card-block">
            <div className="product-card">
              card 21
            </div>
            <div className="product-card">
              card 22
            </div>
            <div className="product-card">
              card 23
            </div>
            <div className="product-card">
              card 24
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
