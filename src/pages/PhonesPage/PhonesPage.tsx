/* eslint-disable arrow-body-style */
import { useState } from 'react';
import { Select } from '../../components/Select/Select';
import phones from '../../productApi/phones.json';
import { Catalog } from '../Catalog';
import Styles from './Phones.module.scss';

export const PhonesPage: React.FC = () => {
  const phonesArr = phones;

  return (
    <div className={Styles.phones_page}>
      <h1 className={Styles.phones_page__title}>Mobile Phones</h1>
      <span className={Styles.phones_page__info}>{`${phonesArr.length} models`}</span>

      <Catalog products={phonesArr} />
    </div>
  );
};
