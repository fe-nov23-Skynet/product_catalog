/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './header.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useState } from 'react';
import { ReactComponent as Favorites } from '../../styles/icons/Favourites.svg';
import { ReactComponent as Cart } from '../../styles/icons/Cart.svg';
import { ReactComponent as Menu } from '../../styles/icons/menu.svg';
import { ReactComponent as Close } from '../../styles/icons/close.svg';
import { useFavoriteState } from '../../customHooks/useFavoriteState';
import { useCartState } from '../../customHooks/useCartState';
import { ToggleButton } from './ToggleButton';
import { useUIState } from '../../customHooks/useUIState';
import { DropdownInput } from '../DropdownInput';

export function Header() {
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [onClose, setOnClose] = useState(false);
  const { favoritesProducts } = useFavoriteState();
  const { cartCount } = useCartState();
  const { UIState } = useUIState();

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

  const changeMenuOpen = () => {
    if (menuOpen) {
      setOnClose(true);
    } else {
      setOnClose(false);
    }

    setTimeout(() => setMenuOpen(!menuOpen), 200);
  };

  return (
    <>
      <header className="header" id="top-page">
        <NavLink
          to="/"
          className={cn('header_logo__img', { dark__theme: UIState.isDarkMode })}
          onClick={() => setMenuOpen(false)}
        />

        <div className="header_container">
          {!isSearchOpened && (
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
          )}

          {/* <div className="dropdown_input">
            <DropdownInput
              isSearchOpened={isSearchOpened}
              setIsSearchOpened={setIsSearchOpened}
            />
          </div> */}

          <div className="header_box">
            <DropdownInput
              isSearchOpened={isSearchOpened}
              setIsSearchOpened={setIsSearchOpened}
            />

            <ToggleButton componentKey={1} />

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
          <div className="header_box">
            <ToggleButton onMobile componentKey={2} />
            <button className="burger-toggle" onClick={changeMenuOpen}>
              <Menu />
            </button>
          </div>

        ) : (
          <button className="burger-toggle" onClick={changeMenuOpen}>
            <Close />
          </button>
        )}
      </header>

      {menuOpen && (
        <div className={cn('menu', { '--close': onClose })}>
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
