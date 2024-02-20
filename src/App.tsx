import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
  
export function App() {
  return (
    <div className="App">
      <Header />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
