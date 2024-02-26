import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import AOS from 'aos';
import { useEffect } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import 'aos/dist/aos.css';
import { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';
import { useUIState } from './customHooks/useUIState';

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

      <Footer />
    </div>
  );
}

export default App;
