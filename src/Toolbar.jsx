import React from 'react';
import { useTree } from './TreeContext';


function Toolbar() {
  const { addNode } = useTree();

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
      {/* <button onClick={() => console.log("Add node")}>Add Node</button> */}
      <button onClick={handleAddNode}>Add Node</button>
      <button onClick={() => console.log("Edit node")}>Edit Node</button>
      <button onClick={() => console.log("Delete node")}>Delete Node</button>
      <button onClick={() => console.log("Export to Python")}>Export to Python</button>
    </div>
  );
}

export default Toolbar;
