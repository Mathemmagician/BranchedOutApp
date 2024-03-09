import React from 'react';

const NodeComponent = ({ node, onNodeSelect, onAddChild, onEdit, onDelete }) => {
  return (
    <div onClick={() => onNodeSelect(node)} style={{ margin: '10px', cursor: 'pointer' }}>
      {node.label}
      <button onClick={() => onAddChild(node.id)}>Add Child</button>
      <button onClick={() => onEdit(node)}>Edit</button>
      <button onClick={() => onDelete(node.id)}>Delete</button>
    </div>
  );
};

export default NodeComponent;
