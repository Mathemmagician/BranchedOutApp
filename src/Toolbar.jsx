import React from 'react';
import { useTree } from './TreeContext';

function Toolbar() {
  const { addNode, exportToPython } = useTree();

  const handleExport = () => {
    const pythonCode = exportToPython();
    console.log(pythonCode);
    // Here, you might want to show the code in the UI or copy it to the clipboard
  };

  const handleAddNode = () => {
    // For simplicity, we're adding a new node to the root every time
    const newNode = {
      id: Date.now().toString(), // Simple ID generation strategy
      label: `Node ${Date.now()}`,
      children: [],
    };
    addNode('root', newNode);
  };

  return (
    <div className="Toolbar">
      <button onClick={handleAddNode}>Add Node</button>
      <button onClick={handleExport}>Export to Python</button>
      {/* Implement other buttons similarly */}
    </div>
  );
}

export default Toolbar;
