import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';
import { SliderBar } from './components/Swiper';

export function App() {
  return (
    <div className="App">
      <Header />

      <SliderBar />

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
