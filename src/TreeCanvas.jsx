import React from 'react';
import { useTree } from './TreeContext';
import NodeComponent from './NodeComponent';

const renderTree = (node, onNodeSelect) => {
  if (!node) return null;
  return (
    <div key={node.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <NodeComponent node={node} onNodeSelect={onNodeSelect} />
      {node.children && node.children.map(child => renderTree(child, onNodeSelect))}
    </div>
  );
};

function TreeCanvas() {
  const { tree } = useTree();

  const handleNodeSelect = (node) => {
    // Placeholder for node selection logic
    console.log('Selected node:', node);
  };

  return (
    <div className="TreeCanvas">
      {renderTree(tree, handleNodeSelect)}
    </div>
  );
}

export default TreeCanvas;
