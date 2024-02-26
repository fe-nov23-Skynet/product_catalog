/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './header.scss';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useState } from 'react';
import { ReactComponent as Favorites } from '../../styles/icons/Favourites.svg';
import { ReactComponent as Cart } from '../../styles/icons/Cart.svg';
import { ReactComponent as Menu } from '../../styles/icons/menu.svg';
import { ReactComponent as Close } from '../../styles/icons/close.svg';
import { useFavoriteState } from '../../customHooks/useFavoriteState';
import { useCartState } from '../../customHooks/useCartState';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favoritesProducts } = useFavoriteState();
  const { cartCount } = useCartState();

  const navItemClassName = (
    { isActive }: { isActive: boolean },
  ) => cn({
    header_nav__link: !menuOpen,
    nav__link: menuOpen,
    'header_nav__link--active': isActive,
  });

  const boxItemClassName = (
    { isActive }: { isActive: boolean },
  ) => cn({
    header_box__link: !menuOpen,
    'header_nav__link--active': isActive,
  });

  const changeMenuOpen = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className="header">
        <NavLink
          to="/"
          className="header_logo__img"
          onClick={() => setMenuOpen(false)}
        />

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
                className={boxItemClassName}
              >
                {favoritesProducts.length !== 0 && (
                  <span>{favoritesProducts.length}</span>
                )}
                <Favorites />
              </NavLink>
            </div>

            <div className="header_box__container">
              <NavLink
                to="cart"
                className={boxItemClassName}
              >
                {cartCount !== 0 && (
                  <span>{cartCount}</span>
                )}
                <Cart />
              </NavLink>
            </div>
          </div>
        </div>

        {!menuOpen ? (
          <button className="burger-toggle" onClick={changeMenuOpen}>
            <Menu />
          </button>
        ) : (
          <button className="burger-toggle" onClick={changeMenuOpen}>
            <Close />
          </button>
        )}
      </header>

      {menuOpen && (
        <div className="menu">
          <nav className="nav nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  className={navItemClassName}
                  to="/"
                  onClick={changeMenuOpen}
                >
                  HOME
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className={navItemClassName}
                  to="phones"
                  onClick={changeMenuOpen}
                >
                  PHONES
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className={navItemClassName}
                  to="tablets"
                  onClick={changeMenuOpen}
                >
                  TABLETS
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  className={navItemClassName}
                  to="accessories"
                  onClick={changeMenuOpen}
                >
                  ACCESSORIES
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="menu__bottom">
            <NavLink
              to="favourites"
              className={(
                { isActive }: { isActive: boolean },
              ) => cn('menu_item', {
                'header_nav__link--active': isActive,
              })}
              onClick={changeMenuOpen}
            >
              {favoritesProducts.length !== 0 && (
                <span className="menu_item_image_fav">{favoritesProducts.length}</span>
              )}
              <Favorites />
            </NavLink>

            <NavLink
              to="cart"
              className={(
                { isActive }: { isActive: boolean },
              ) => cn('menu_item', {
                'header_nav__link--active': isActive,
              })}
              onClick={changeMenuOpen}
            >
              {cartCount !== 0 && (
                <span className="menu_item_image_cart">{cartCount}</span>
              )}
              <Cart />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
