
import { Handle, Position, NodeToolbar } from 'reactflow';
 
function IfNode({ data }) {
  return (
    <>
      <NodeToolbar 
        isVisible={data.toolbarVisible} 
        position={Position.Bottom}
      >
        {/* <button onClick={data.onAddChild} className='addButton'> Add </button> */}
        <button onClick={data.onTurnIntoValue} className='convertButton'>Delete</button>
      </NodeToolbar>
 
      <div style={{ padding: '15px 15px' }}>
        {data.label}
      </div>
 
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} id="if" style={{ top: 10, background: '#555' }} />
      <Handle type="source" position={Position.Right} id="else" style={{ bottom: 3, top: 'auto'}} />
    </>
  );
};
 
export default IfNode;