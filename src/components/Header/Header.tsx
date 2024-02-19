/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './header.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { ReactComponent as Logo } from '../../styles/icons/Logo.svg';
import { ReactComponent as Favorites } from '../../styles/icons/Favourites.svg';
import { ReactComponent as Cart } from '../../styles/icons/Cart.svg';

export function Header() {
  const navItemClassName = (
    { isActive }: { isActive: boolean },
  ) => cn('header_nav__link', {
    'header_nav__link--active': isActive,
  });

  return (
    <header className="header">
      <NavLink
        to="/"
        className="header_logo"
      >
        <Logo />
      </NavLink>
      <div className="header_container">
        <nav className="header_nav">
          <NavLink
            to="/"
            className={navItemClassName}
          >
            HOME
          </NavLink>

          <NavLink
            to="phones"
            className={navItemClassName}
          >
            PHONES
          </NavLink>

          <NavLink
            to="tablets"
            className={navItemClassName}
          >
            TABLETS
          </NavLink>

          <NavLink
            to="accessories"
            className={navItemClassName}
          >
            ACCESSORIES
          </NavLink>
        </nav>
        <div className="header_box">
          <div className="header_box__container">
            <NavLink
              to="favourites"
              className="header_box__link"
            >
              <Favorites />
            </NavLink>
          </div>

          <div className="header_box__container">
            <NavLink
              to="cart"
              className="header_box__link"
            >
              <Cart />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
