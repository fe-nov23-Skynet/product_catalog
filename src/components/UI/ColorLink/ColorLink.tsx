import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import './colorLink.scss';

interface Props {
  color: string;
  to: string;
  selected?: boolean;
}

export const ColorLink: React.FC<Props> = (props) => {
  const { color, to: link, selected = false } = props;

  return (
    <Link
      to={link}
      className={classNames('color-link', { 'color-link--active': selected })}
    >
      <span
        className={classNames('color-link__circle', {
          'color-link--green': color === 'green',
          'color-link--black': false,
          'color-link--purple': false,
          'color-link--red': false,
          'color-link--white': color === 'white',
          'color-link--yellow': color === 'yellow',
          'color-link--gold': false,
          'color-link--midnightgreen': false,
          'color-link--silver': false,
          'color-link--spacegray': false,
          'color-link--rosegold': false,
          'color-link--coral': false,
          'color-link--spaceblack': false,
          'color-link--midnight': false,
          'color-link--pink': false,
          'color-link--blue': false,
          'color-link--sierrablue': false,
          'color-link--graphite': color === 'graphite',
        })}
      />
    </Link>
  );
};
