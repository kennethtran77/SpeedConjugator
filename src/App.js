import './App.css';

import Sidebar from './components/Sidebar.js';
import Card from './components/Card.js';

function App() {
  return (
    <div className="row">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <Card />
      </div>
    </div>
  );
}

export default App;
