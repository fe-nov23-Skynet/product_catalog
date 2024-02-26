import {
  Navigate, Route, Routes,
} from 'react-router-dom';

import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage/CartPage';
import { HomePage } from './pages/HomePage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CatalogPage } from './pages/CatalogPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="phones">
        <Route index element={<CatalogPage pageTitle="Mobile phones" />} />
        <Route path=":id" element={<ProductPage />} />
      </Route>
      <Route path="tablets">
        <Route index element={<CatalogPage pageTitle="Tablets" />} />
        <Route path=":id" element={<ProductPage />} />
      </Route>
      <Route path="accessories">
        <Route index element={<CatalogPage pageTitle="Accessories" />} />
        <Route path=":id?" element={<ProductPage />} />
      </Route>
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
