import './breadcrumbs.scss';
import cn from 'classnames';
import { Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ReactComponent as Home } from '../../styles/icons/Home_breadcrumbs.svg';
import { ReactComponent as Arrow } from '../../styles/icons/Chevron_arrow_breadcrumbs.svg';

export function Breadcrumbs() {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map((crumb, index, array) => {
      const formattedCrumb = crumb
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

      currentLink += `/${crumb}`;

      const isLast = index === array.length - 1;
      const linkClasses = cn('crumb_link', { 'crumb_link--active': isLast });

      return (
        <Fragment key={formattedCrumb}>
          {index === 0 && (
            <Link to="/">
              <Home />
            </Link>
          )}
          <div className="crumb" key={formattedCrumb}>
            <p className="crumb_arrow">
              <Arrow />
            </p>
            <Link className={linkClasses} to={currentLink}>{formattedCrumb}</Link>
          </div>
        </Fragment>
      );
    });

  return (
    <div className="breadcrumbs">
      {crumbs}
    </div>
  );
}
