import { BaseEdge, getStraightPath, EdgeLabelRenderer, getBezierPath, } from 'reactflow';

export default function FlowEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <span>delte</span>
      </EdgeLabelRenderer>
    </>
  );
}
