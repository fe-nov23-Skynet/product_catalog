import { Link } from 'react-router-dom';
import './favouritesPage.scss';
import { useFavoriteState } from '../../customHooks/useFavoriteState';
import { Catalog } from '../Catalog';

export const FavouritesPage: React.FC = () => {
  const { favoritesProducts } = useFavoriteState();

  return (
    <div className="favourites_page">
      <h1 className="favourites_title">Favourites</h1>

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
