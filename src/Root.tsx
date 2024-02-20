import { Navigate, Route, Routes } from 'react-router-dom';

import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<h1 className="title">Home Page</h1>} />
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="phones" element={<PhonesPage />} />
      <Route path="tablets" element={<TabletsPage />} />
      <Route path="accessories" element={<AccessoriesPage />} />
      <Route path="favourites" element={<h1 className="title">Favourites Page</h1>} />
      <Route path="cart" element={<h1 className="title">Cart Page</h1>} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
