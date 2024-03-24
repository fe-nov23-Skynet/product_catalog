import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, useLocation, useParams } from 'react-router-dom';
import createStore from 'react-auth-kit/createStore';
// import AuthProvider from 'react-auth-kit';
import { Auth0Provider } from '@auth0/auth0-react';
import { Root } from './Root';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import './i18n';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container as HTMLDivElement);

const authStore = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

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

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain as string}
      clientId={clientId as string}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <Router>
          <ScrollToTop />
          <Root />
        </Router>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
