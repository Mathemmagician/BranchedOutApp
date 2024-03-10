import { Handle, Position, NodeToolbar } from 'reactflow';
 
function ValueNode({ data }) {
  return (
    <>
      <NodeToolbar 
        isVisible={data.toolbarVisible} 
        position={Position.Bottom}
      >
        <button onClick={data.onTurnIntoIf} className='addButton'> Value {"=>"} IF </button>
        {/* <button onClick={data.onDelete} className='deleteButton'> X </button> */}
      </NodeToolbar>
 
      <div style={{ padding: '10px 20px' }}>
        {data.label}
      </div>
 
      <Handle type="target" position={Position.Left} />
    </>
  );
};
 
export default ValueNode;