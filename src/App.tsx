import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <div className="App">
      <div>Header</div>

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
