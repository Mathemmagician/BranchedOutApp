import React from 'react';

function Toolbar({ onExportToPython, onResetLayout }) {
  return (
    <div className="Toolbar">
      <button onClick={onExportToPython}>Export to Code</button>
      <button onClick={onResetLayout} style={{margin: "0px 10px"}}>{"Left => Right Layout"}</button>
    </div>
  );
}

export default Toolbar;
