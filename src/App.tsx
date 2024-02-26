import { Outlet } from 'react-router-dom';
import AOS from 'aos';
import { useEffect } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import 'aos/dist/aos.css';
import { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';
import { SliderBar } from './components/Swiper';
import { SliderGoods } from './components/SliderGoods/SliderGoods';

export function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <div className="App">
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
