import React from 'react';

function Toolbar({ onExportToPython }) {
  return (
    <div className="Toolbar">
      <button onClick={onExportToPython}>Export to Python</button>
    </div>
  );
}

export default Toolbar;
