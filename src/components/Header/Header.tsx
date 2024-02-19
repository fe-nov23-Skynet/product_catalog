/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import s from './header.module.scss';
import { ReactComponent as Logo } from './Logo.svg';
import { ReactComponent as Favorites } from './Favourites.svg';
import { ReactComponent as Cart } from './Cart.svg';

export function Header() {
  return (
    <header className={s.header}>
      <a className={s.header_logo}>
        <Logo />
      </a>
      <div className={s.header_container}>
        <nav className={s.header_nav}>
          <a
            href="#"
            className={s.header_nav__link_active}
          >
            HOME
          </a>

          <a
            href="#"
            className={s.header_nav__link}
          >
            PHONES
          </a>

          <a
            href="#"
            className={s.header_nav__link}
          >
            TABLETS
          </a>

          <a
            href="#"
            className={s.header_nav__link}
          >
            ACCESSORIES
          </a>
        </nav>
        <div className={s.header_box}>
          <div className={s.header_box__container}>
            <a
              href="#"
              className={s.header_box__link}
            >
              <Favorites />
            </a>
          </div>

          <div className={s.header_box__container}>
            <a
              href="#"
              className={s.header_box__link}
            >
              <Cart />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
