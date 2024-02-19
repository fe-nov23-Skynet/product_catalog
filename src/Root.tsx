import { Navigate, Route, Routes } from 'react-router-dom';

import { App } from './App';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Catalog } from './pages/Catalog';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<h1 className="title">Home Page</h1>} />
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="phones" element={<Catalog />} />
      <Route path="tablets" element={<h1 className="title">Tablets Page</h1>} />
      <Route path="accessories" element={<h1 className="title">Accessories Page</h1>} />
      <Route path="favourites" element={<h1 className="title">Favourites Page</h1>} />
      <Route path="cart" element={<h1 className="title">Cart Page</h1>} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
