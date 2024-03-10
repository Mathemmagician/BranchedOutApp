import { memo } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';
 
function ValueNode({ data }) {
  return (
    <>
      <NodeToolbar 
        isVisible={true}
        // isVisible={data.toolbarVisible} 
        // position={data.toolbarPosition}
        position={Position.Bottom}
      >
        <button onClick={data.onAddChild} className='addButton'> Add </button>
        <button onClick={data.onDelete} className='deleteButton'> Delete </button>
      </NodeToolbar>
 
      <div style={{ padding: '10px 20px' }}>
        {data.label}
      </div>
 
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
};
 
export default ValueNode;