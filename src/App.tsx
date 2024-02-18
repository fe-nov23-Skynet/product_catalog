import { Select } from './components/Select/Select';

function App() {
  const a = ['Phone 1', 'Size 2', 'Tablet 3', 'Screen 4', 'Size 2'];

  return (
    <div className="App">
      test vercel deploy with redeploy by commit
      <Select items={a} />
    </div>
  );
}

export default App;
