import React from 'react';
import { useTree } from './TreeContext';


function Toolbar() {
  const { tree, addNode, exportToPython } = useTree();

  const handleAddNode = () => {
    // For simplicity, we're adding a new node to the root every time
    const newNode = {
      id: Date.now().toString(), // Simple ID generation strategy
      label: `Node ${Date.now()}`,
      children: [],
    };
    addNode('root', newNode);
  };

  const handleExport = () => {
    const pythonCode = exportToPython(tree);
    console.log(pythonCode);
    // Here, you might want to show the code in the UI or copy it to the clipboard
  };

  return (
    <div className="Toolbar">
      {/* <button onClick={() => console.log("Add node")}>Add Node</button> */}
      <button onClick={handleAddNode}>Add Node</button>
      <button onClick={() => console.log("Edit node")}>Edit Node</button>
      <button onClick={() => console.log("Delete node")}>Delete Node</button>
      <button onClick={handleExport}>Export to Python</button>
    </div>
  );
}

export default Toolbar;
