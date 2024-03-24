import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import AOS from 'aos';
import { useTranslation } from 'react-i18next';
import { useEffect, Suspense } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import 'aos/dist/aos.css';
import { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';
import { useUIState } from './customHooks/useUIState';
import { SupportChat } from './components/SupportChat';

// type LocalesType = {
//   en: { title: string },
//   ukr: { title: string },
// };

// const LOCALES = {
//   en: { title: 'English' },
//   ukr: { title: 'Ukrainian' },
// };

export function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  const { UIState } = useUIState();

  return (
    <div className={classNames('App', {
      'dark-theme': UIState.isDarkMode,
      'light-theme': !UIState.isDarkMode,
    })}
    >
      <Header />
      <main className="section">
        <div className="container">
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>
      <SupportChat />
      <Footer />
    </div>
  );
}

const WrappedApp = () => (
  <Suspense fallback="...loading">
    <App />
  </Suspense>
);

export default WrappedApp;
