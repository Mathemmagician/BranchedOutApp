import React, { useState, useEffect } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';

function ValueNode({ id, data, }) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  useEffect(() => {
    setLabel(data.label); // Update local state if the data label changes externally
  }, [data.label]);

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      data.updateNode(id, label); // Save the label when Enter is pressed
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    data.updateNode(id, label); // Save the label when input loses focus
  };

  return (
    <>
      <NodeToolbar 
        isVisible={data.toolbarVisible} 
        position={Position.Bottom}
      >
        <button onClick={data.onTurnIntoIf} className='addButton'>Value {"=>"} IF</button>
      </NodeToolbar>
 
      <div style={{ padding: '10px 20px' }} onDoubleClick={() => setIsEditing(true)}>
        {isEditing ? (
          <input
            autoFocus
            value={label}
            onChange={handleLabelChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="nodrag"
            style={{ width: '120px', boxSizing: 'border-box' }} // Adjust width as needed
          />
        ) : (
          <span>{label}</span>
        )}
      </div>
 
      <Handle type="target" position={Position.Left} isConnectable={false} />
    </>
  );
};
 
export default ValueNode;
