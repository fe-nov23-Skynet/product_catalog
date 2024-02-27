import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, useLocation, useParams } from 'react-router-dom';
import { Root } from './Root';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container as HTMLDivElement);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const currProduct = pathname?.split('-')[1];

  const [prevProduct, setPrevProduct] = useState(currProduct);

  useEffect(() => {
    if (prevProduct !== currProduct) {
      window.scrollTo(0, 0);
      setPrevProduct(currProduct);
    }
  }, [pathname]);

  return null;
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Root />

      </Router>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
