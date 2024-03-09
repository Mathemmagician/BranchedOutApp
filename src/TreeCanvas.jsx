import React from 'react';
import { useTree } from './TreeContext';
import NodeComponent from './NodeComponent';

const renderTree = (node, onNodeSelect, onEdit, onDelete) => {
  if (!node) return null;
  return (
    <div key={node.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <NodeComponent node={node} onNodeSelect={onNodeSelect} onEdit={onEdit} onDelete={onDelete} />
      {node.children && node.children.map(child => renderTree(child, onNodeSelect, onEdit, onDelete))}
    </div>
  );
};

function TreeCanvas() {
  const { tree, editNode, deleteNode } = useTree();

  const handleNodeSelect = (node) => {
    // Placeholder for node selection logic
    console.log('Selected node:', node);
  };

  const handleEditNode = (node) => {
    const newLabel = prompt("Edit node label:", node.label); // Simplistic edit dialog
    if (newLabel) {
      editNode(node.id, newLabel);
    }
  };

  const handleDeleteNode = (id) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this node?")) {
      deleteNode(id);
    }
  };

  return (
    <div className="TreeCanvas">
      {renderTree(tree, handleNodeSelect, handleEditNode, handleDeleteNode)}
    </div>
  );
}

export default TreeCanvas;
