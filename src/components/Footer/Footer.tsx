/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './footer.scss';
import cn from 'classnames';
import { useUIState } from '../../customHooks/useUIState';
import { LangSwitch } from '../UI/LangSwitch';
import { useTranslate } from '../../customHooks/useTranslate';

export const Footer = () => {
  const { UIState } = useUIState();
  const { t } = useTranslation();

  const { LanguageState, changeLanguage } = useTranslate();
  const toggleLanguage = () => {
    const newLanguage = LanguageState.language === 'en' ? 'ukr' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <div>
      <div className="divider" />
      <div className="container">
        <footer className="footer">
          <div className="footer__logo">
            {/* eslint-disable-next-line */}
            <Link to="/" className={cn('home_link', { dark__theme: UIState.isDarkMode })}>
              home
            </Link>
          </div>
          <div className="footer__links">
            {/* eslint-disable-next-line */}
            <a href="#" target="_blanc">github</a>
            <a href="#/">
              {t('footer.home')}
            </a>
          </div>

          <div className="footer__go-top go-top">
            <div className="go-top__title">{t('footer.go-top')}</div>
            <a href="#top-page" className="go-top__link">
              <div className="go-top__icon" />
            </a>
          </div>
          <div className="footer__language">
            <LangSwitch
              checked={LanguageState.language === 'en'}
              onCheck={toggleLanguage}
            />
          </div>
        </footer>
      </div>
    </div>
  );
};
