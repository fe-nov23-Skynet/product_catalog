import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './favouritesPage.scss';
import { Helmet } from 'react-helmet';
import { useFavoriteState } from '../../customHooks/useFavoriteState';
import { Catalog } from '../Catalog';

export const FavouritesPage: React.FC = () => {
  const { favoritesProducts } = useFavoriteState();
  const { t } = useTranslation();

  return (
    <div className="favourites_page">
      <Helmet>
        <title>{'favorites'.toUpperCase()}</title>
      </Helmet>
      <h1 className="favourites_title">{t('favorite.title')}</h1>

      {favoritesProducts.length > 0 && (
        <span className="favourites_info">{`${favoritesProducts.length} ${t('favorite.desc')}`}</span>
      )}

      {favoritesProducts.length === 0 ? (
        <div className="empty_favourites">
          <h1 className="empty_text">Favourites are empty</h1>
          <h3>But it&apos;s never too late to fix it</h3>
          <Link to="/home" className="navigation_empty_favourites">Go shopping</Link>
        </div>
      ) : (
        <Catalog products={favoritesProducts} />
      )}
    </div>
  );
};
