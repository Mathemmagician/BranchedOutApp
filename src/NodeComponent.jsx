import React from 'react';

const NodeComponent = ({ node, onNodeSelect }) => {
  return (
    <div onClick={() => onNodeSelect(node)} style={{ margin: '10px', cursor: 'pointer' }}>
      {node.label}
    </div>
  );
};

export default NodeComponent;
