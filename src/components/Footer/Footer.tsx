/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import './footer.scss';

export const Footer = () => (
  <div>
    <div className="divider" />
    <div className="container">
      <footer className="footer">
        <div className="footer__logo">
          {/* eslint-disable-next-line */}
          <Link to="/" className="home_link">
            home
          </Link>
        </div>
        <div className="footer__links">
          {/* eslint-disable-next-line */}
          <a href="#" target="_blanc">github</a>
          <a href="#/">
            home
          </a>
        </div>
        <div className="footer__go-top go-top">
          <div className="go-top__title">Back to top</div>
          <a href="#top-page" className="go-top__link">
            <div className="go-top__icon" />
          </a>
        </div>
      </footer>
    </div>
  </div>
);
