import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Root } from './Root';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import './index.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container as HTMLDivElement);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
