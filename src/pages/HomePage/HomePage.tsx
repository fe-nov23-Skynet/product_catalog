import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Styles from './HomePage.module.scss';
import Tablets_image from '../../banner-images/Tablets.png';
import Phones_image from '../../banner-images/Phones.png';
import Accessories_image from '../../banner-images/Accessories.png';
import { SliderBar } from '../../components/Swiper';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';
import { SliderGoods } from '../../components/SliderGoods/SliderGoods';
import { getBestPrice } from '../../utils/getBestPrice';
import { getNewestProducts } from '../../utils/getNewestProduct';

export const HomePage: React.FC = () => {
  const [phonesArr, setPhonesArr] = useState<Product[]>([]);
  const [tabletsArr, setTabletsArr] = useState<Product[]>([]);
  const [accessoriesArr, setAccessoriesArr] = useState<Product[]>([]);

  const allProducts = [...phonesArr, ...tabletsArr, ...accessoriesArr];
  const bestPriceProducts = getBestPrice(allProducts);
  if (bestPriceProducts.length > 32) {
    bestPriceProducts.length = 32;
  }

  const newestProducts = getNewestProducts(allProducts);
  if (newestProducts.length > 32) {
    newestProducts.length = 32;
  }

  function reMapProducts(pArray: Product[], category: string) {
    return pArray.map(p => ({ ...p, category }));
  }

  useEffect(() => {
    getProducts('phones')
      .then(products => setPhonesArr(reMapProducts(products, 'phones')));
  }, []);

  useEffect(() => {
    getProducts('tablets')
      .then(products => setTabletsArr(reMapProducts(products, 'tablets')));
  }, []);

  useEffect(() => {
    getProducts('accessories')
      .then(products => setAccessoriesArr(reMapProducts(products, 'accessories')));
  }, []);

  return (
    <section>
      <Helmet>
        <title>{'home page'.toUpperCase()}</title>
      </Helmet>
      <h1 className={Styles.home_page__title}>Welcome to Nice Gadgets store!</h1>
      <div className={Styles.home_page__SlideBarWrapper}>
        <SliderBar />
      </div>
      <div className={Styles.home_page__SlideBarWrapper}>
        <SliderGoods title="Brand new models" products={newestProducts} />
      </div>
      <div className="container">
        <div className={Styles.home_page__CategoryChoiseWrapper}>
          <h2 className={Styles.home_page__categoriestitle}>Shop by category</h2>
          <Link className={Styles.home_page__category} to="tablets">
            <img className={Styles.home_page__image} src={Tablets_image} alt="" />
            <h3 className={Styles.home_page__categoryItem}>Tablets</h3>
            <span className={Styles.home_page__info}>{`${tabletsArr.length} models`}</span>
          </Link>

          <Link className={Styles.home_page__category} to="phones">
            <img className={Styles.home_page__image} src={Phones_image} alt="" />
            <h3 className={Styles.home_page__categoryItem}>Mobile phones</h3>
            <span className={Styles.home_page__info}>{`${phonesArr.length} models`}</span>
          </Link>
          <Link className={Styles.home_page__category} to="accessories">
            <img className={Styles.home_page__image} src={Accessories_image} alt="" />
            <h3 className={Styles.home_page__categoryItem}>Accessories</h3>
            <span className={Styles.home_page__info}>{`${accessoriesArr.length} models`}</span>
          </Link>
        </div>
      </div>
      <div className={Styles.home_page__SlideBarWrapper}>
        <SliderGoods title="Hot prices" products={bestPriceProducts} />
      </div>
    </section>
  );
};
