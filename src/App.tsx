import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';

export function App() {
  return (
    <div className="App">
      <Header />

      <div className="section">
        <div className="container">
          <Breadcrumbs />
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
