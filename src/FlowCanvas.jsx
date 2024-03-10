import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import ValueNode from "./ValueNode";
import IfNode from "./IfNode";
import FlowEdge from "./FlodEdge";

const nodeTypes = {
  valueNode: ValueNode,
  ifNode: IfNode,
};

const edgeTypes = {
  flowEdge: FlowEdge
}

const initialNodes = [
  {
    id: "1",
    type: "ifNode",
    position: { x: 10, y: 400 },
    data: { label: "Height - 180cm >= 0" },
  },
  {
    id: "2",
    type: "valueNode",
    position: { x: 250, y: 300 },
    data: { label: "Tall" },
  },
  {
    id: "3",
    type: "valueNode",
    position: { x: 250, y: 500 },
    data: { label: "Short" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    sourceHandle: "if",
    target: "2",
    label: "True",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-3",
    source: "1",
    sourceHandle: "else",
    target: "3",
    label: "False",
  },
];

export function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Function to convert a ValueNode into an IfNode and add children
  const turnValueNodeIntoIfNode = useCallback(
    (id) => {
      setNodes((nds) => {
        const newNodes = nds.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              type: "ifNode",
              data: { ...node.data, label: "Condition?" },
            };
          }
          return node;
        });

        // Find the position of the original node to place new value nodes
        const originalNodeIndex = nds.findIndex((n) => n.id === id);
        const originalNode = nds[originalNodeIndex];
        const trueNodePosition = {
          x: originalNode.position.x + 150,
          y: originalNode.position.y - 60,
        };
        const falseNodePosition = {
          x: originalNode.position.x + 150,
          y: originalNode.position.y + 60,
        };

        // Create new value nodes
        const trueNode = {
          id: `value-${id}-true`,
          type: "valueNode",
          position: trueNodePosition,
          data: { label: "True" },
        };
        const falseNode = {
          id: `value-${id}-false`,
          type: "valueNode",
          position: falseNodePosition,
          data: { label: "False" },
        };

        // Add new value nodes to the nodes array
        newNodes.push(trueNode, falseNode);

        return newNodes;
      });

      setEdges((eds) => {
        const trueEdge = {
          id: `e${id}-true`,
          source: id,
          sourceHandle: "if",
          target: `value-${id}-true`,
          label: "True",
          markerEnd: { type: MarkerType.ArrowClosed },
        };
        const falseEdge = {
          id: `e${id}-false`,
          source: id,
          sourceHandle: "else",
          target: `value-${id}-false`,
          label: "False",
          markerEnd: { type: MarkerType.ArrowClosed },
        };

        return [...eds, trueEdge, falseEdge];
      });
    },
    [setNodes, setEdges]
  );

  const updatedNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onTurnIntoIf:
            node.type === "valueNode"
              ? () => turnValueNodeIntoIfNode(node.id)
              : undefined,
        },
      })),
    [nodes, turnValueNodeIntoIfNode]
  );

  return (
    <div style={{ width: "700px", height: "800px" }}>
      <ReactFlow
        nodes={updatedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // fitView
      />
    </div>
  );
}
