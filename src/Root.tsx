import {
  Navigate, Route, Routes,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage/CartPage';
import { HomePage } from './pages/HomePage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CatalogPage } from './pages/CatalogPage';
import { useUIState } from './customHooks/useUIState';
import { Adminka } from './pages/Adminka/Adminka';

export const Root = () => {
  const { UIState } = useUIState();
  const { t } = useTranslation();

  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="phones">
            <Route index element={<CatalogPage pageTitle={t('phones.phones')} />} />
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<CatalogPage pageTitle={t('tablets.tablets')} />} />
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<CatalogPage pageTitle={t('accessories.accessories')} />} />
            <Route path=":id?" element={<ProductPage />} />
          </Route>
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="/adminka" element={<Adminka />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme={UIState.isDarkMode ? 'dark' : 'light'}
      />
    </>

  );
};
