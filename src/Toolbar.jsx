import React from 'react';

function Toolbar() {
  return (
    <div className="Toolbar">
      <button onClick={() => console.log("Add node")}>Add Node</button>
      <button onClick={() => console.log("Edit node")}>Edit Node</button>
      <button onClick={() => console.log("Delete node")}>Delete Node</button>
      <button onClick={() => console.log("Export to Python")}>Export to Python</button>
    </div>
  );
}

export default Toolbar;
