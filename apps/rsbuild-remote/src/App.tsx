import './App.css';
//@ts-expect-error - Not correctly typed
import { Button } from 'host/Button';

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <Button />
    </div>
  );
};

export default App;
