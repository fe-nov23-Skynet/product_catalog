import { Navigate, Route, Routes } from 'react-router-dom';

import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage/CartPage';
import { HomePage } from './pages/HomePage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="phones">
        <Route index element={<PhonesPage />} />
        <Route path=":id" element={<ProductPage />} />
      </Route>
      <Route path="tablets">
        <Route index element={<TabletsPage />} />
        <Route path=":id" element={<ProductPage />} />
      </Route>
      <Route path="accessories">
        <Route index element={<AccessoriesPage />} />
        <Route path=":id?" element={<ProductPage />} />
      </Route>
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="cart" element={<CartPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
