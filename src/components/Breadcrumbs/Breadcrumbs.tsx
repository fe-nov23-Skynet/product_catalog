import './breadcrumbs.scss';
import cn from 'classnames';
import { useLocation, Link } from 'react-router-dom';
import { ReactComponent as Home } from '../../styles/icons/Home_breadcrumbs.svg';
import { ReactComponent as Arrow } from '../../styles/icons/Chevron_arrow_breadcrumbs.svg';

export function Breadcrumbs() {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`;

      const isLast = index === array.length - 1;
      const linkClasses = cn('crumb_link', { 'crumb_link--active': isLast });

      return (
        <>
          {index === 0 && <Home />}
          <div className="crumb" key={crumb}>
            <p className="crumb_arrow">
              <Arrow />
            </p>
            <Link className={linkClasses} to={currentLink}>{crumb}</Link>
          </div>
        </>
      );
    });

  return (
    <div className="breadcrumbs">
      {crumbs}
    </div>
  );
}
