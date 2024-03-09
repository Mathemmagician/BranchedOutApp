import React from 'react';
import { useTree } from './TreeContext';

function TreeCanvas() {
  const { tree } = useTree();

  return (
    <div className="TreeCanvas">
      <pre>{JSON.stringify(tree, null, 2)}</pre>
    </div>
  );
}

export default TreeCanvas;
