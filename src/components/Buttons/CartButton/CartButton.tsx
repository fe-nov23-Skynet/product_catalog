import React from 'react';
import './cartButton.scss';
import classNames from 'classnames';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (...args: any[]) => void
  active: boolean,
}

export const CartButton: React.FC<Props> = (props) => {
  const { onClick, active } = props;

  return (
    <button
      onClick={onClick}
      className={classNames({
        'button-submit': !active,
        'button-submited': active,
      })}
    >
      {!active ? 'Add to cart' : 'Added to cart'}
    </button>
  );
};
