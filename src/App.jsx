import React from 'react';
import TreeCanvas from './TreeCanvas';
// import Toolbar from './Toolbar';
import './App.css'; // Assuming you'll have some CSS
import 'reactflow/dist/style.css';


function App() {
  return (
    <div className="App">
      {/* <Toolbar /> */}
      <TreeCanvas />
    </div>
  );
}

export default App;
