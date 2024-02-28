import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

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
      <h1 className={Styles.home_page__title}>{t('homePage.title')}</h1>
      <div className={Styles.home_page__SlideBarWrapper}>
        <SliderBar />
      </div>
      <div className={Styles.home_page__SlideBarWrapper}>
        <SliderGoods title={t('sliders.new')} products={newestProducts} />
      </div>
      <div className={Styles.home_page__CategoryChoiseWrapper}>
        <h2 className={Styles.home_page__categoriestitle}>{t('homePage.categoriesTitle')}</h2>
        <Link className={Styles.home_page__category} to="tablets">
          <img className={Styles.home_page__image} src={Tablets_image} alt="" />
          <h3 className={Styles.home_page__categoryItem}>{t('homePage.tablets')}</h3>
          <span className={Styles.home_page__info}>{`${tabletsArr.length} ${t('homePage.models')}`}</span>
        </Link>

        <Link className={Styles.home_page__category} to="phones">
          <img className={Styles.home_page__image} src={Phones_image} alt="" />
          <h3 className={Styles.home_page__categoryItem}>{t('homePage.phone')}</h3>
          <span className={Styles.home_page__info}>{`${phonesArr.length} ${t('homePage.models')}`}</span>
        </Link>
        <Link className={Styles.home_page__category} to="accessories">
          <img className={Styles.home_page__image} src={Accessories_image} alt="" />
          <h3 className={Styles.home_page__categoryItem}>{t('homePage.accessories')}</h3>
          <span className={Styles.home_page__info}>{`${accessoriesArr.length} ${t('homePage.models')}`}</span>
        </Link>
      </div>
      <div className={Styles.home_page__SlideBarWrapper}>
        <SliderGoods title={t('sliders.hotPrice')} products={bestPriceProducts} />
      </div>
    </section>
  );
};
