import React from 'react';
import { useTranslation } from 'react-i18next';
import './cartButton.scss';
import classNames from 'classnames';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (...args: any[]) => void
  active: boolean,
}

export const CartButton: React.FC<Props> = (props) => {
  const { onClick, active } = props;
  const { t } = useTranslation();
  const add = t('button.add');
  const isAdd = t('button.isAdd');

  return (
    <button
      onClick={onClick}
      className={classNames({
        'button-submit': !active,
        'button-submited': active,
      })}
    >
      {!active ? add : isAdd}
    </button>
  );
};
