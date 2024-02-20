
import { Link } from 'react-router-dom';
import './footer.scss';

export const Footer = () => (
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
        <a href="#">
          home
        </a>
      </div>
      <div className="footer__go-top go-top">
        <div className="go-top__title">Back to top</div>
        <div className="go-top__icon" />
      </div>
    </footer>
  </div>
);
