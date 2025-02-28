import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import ValueNode from "./ValueNode";
import IfNode from "./IfNode";
import FlowEdge from "./FlodEdge";
import Toolbar from "./Toolbar";
import Dagre from "@dagrejs/dagre";

const nodeTypes = {
  valueNode: ValueNode,
  ifNode: IfNode,
};

const edgeTypes = {
  flowEdge: FlowEdge,
};

const initialNodes = [
  {
    id: "1",
    type: "ifNode",
    position: { x: 10, y: 400 },
    data: { label: "Height >= 180cm" },
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
    label: "T",
    labelStyle: {fill: 'green', fontSize: 12},
    labelBgStyle: { fill: '#242424', },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e1-3",
    source: "1",
    sourceHandle: "else",
    target: "3",
    label: "F",
    labelStyle: {fill: 'red', fontSize: 12},
    labelBgStyle: { fill: '#242424', },
  },
];

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const dagreGraph = new Dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    dagreGraph.setNode(node.id, { width: 150, height: 50 })
  ); // Assume fixed size for simplicity

  Dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
    };
  });

  return { nodes: layoutedNodes, edges };
};

export function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  const updateNodeLabel = useCallback(
    (id, newLabel) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node.id === id) {
            return { ...node, data: { ...node.data, label: newLabel } };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  const onResetLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    // Use requestAnimationFrame to ensure fitView works after nodes and edges have been updated
    window.requestAnimationFrame(() => fitView({ padding: 0.2 }));
  }, [nodes, edges, setNodes, setEdges, fitView]);

  const exportToPython = useCallback(() => {
    const findNodeById = (id) => nodes.find((n) => n.id === id);

    const generatePythonCode = (nodeId, depth = 0) => {
      const node = findNodeById(nodeId);
      if (!node) return "";

      const indent = "    ".repeat(depth); // Create an indentation string based on the current depth
      let code = "";

      if (node.type === "ifNode") {
        // Find the edges for the true and false branches of the if node
        const trueEdge = edges.find(
          (e) => e.source === nodeId && e.label.toLowerCase().charAt(0) === "t"
        );
        const falseEdge = edges.find(
          (e) => e.source === nodeId && e.label.toLowerCase().charAt(0) === "f"
        );

        // Generate the Python code for the true and false branches recursively, increasing the depth
        const trueBranchCode = trueEdge
          ? generatePythonCode(trueEdge.target, depth + 1)
          : "";
        const falseBranchCode = falseEdge
          ? generatePythonCode(falseEdge.target, depth + 1)
          : "";

        // Combine the code for the current if node with the code for its branches
        code += `${indent}if ${node.data.label}:\n${trueBranchCode}\n`;
        if (falseBranchCode) {
          code += `${indent}else:\n${falseBranchCode}`;
        }
      } else if (node.type === "valueNode") {
        // For value nodes, simply return the node's label with the correct indentation
        code += `${indent}# ${node.data.label}`;
      }

      return code;
    };

    // Assuming the root node has an ID of '1' or find it based on your logic
    const pythonCode = generatePythonCode("1");
    console.log(pythonCode);
    navigator.clipboard.writeText(pythonCode).then(() => {
      alert('Python pseudocode copied to clipboard (and printed to console)!');
    });
  }, [nodes, edges]);

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
          label: "T",
          labelStyle: {fill: 'green', fontSize: 12},
          labelBgStyle: { fill: '#242424', },
          markerEnd: { type: MarkerType.ArrowClosed },
        };
        const falseEdge = {
          id: `e${id}-false`,
          source: id,
          sourceHandle: "else",
          target: `value-${id}-false`,
          label: "F",
          labelStyle: {fill: 'red', fontSize: 12},
          labelBgStyle: { fill: '#242424', },
          markerEnd: { type: MarkerType.ArrowClosed },
        };

        return [...eds, trueEdge, falseEdge];
      });
    },
    [setNodes, setEdges]
  );

  const turnIfNodeIntoValueNode = useCallback(
    (id) => {
      // Confirm with the user
      if (
        !window.confirm(
          "Are you sure you want to delete this IfNode and all its children?"
        )
      ) {
        return;
      }

      setNodes((prevNodes) => {
        let newNodeLabel = "Converted Value Node"; // Default label

        // Find the first edge connected to the IfNode to use its label for the new ValueNode
        const connectedEdge = edges.find(
          (e) => e.source === id || e.target === id
        );
        if (connectedEdge) {
          newNodeLabel = connectedEdge.label; // Use the edge label if found
        }

        const updatedNodes = prevNodes.map((node) => {
          if (node.id === id) {
            // Update the label when converting to a ValueNode
            return {
              ...node,
              type: "valueNode",
              data: { ...node.data, label: newNodeLabel },
            };
          }
          return node;
        });

        // Recursively find and remove all child nodes and their edges
        const removeChildren = (nodeId, allNodes) => {
          const children = allNodes.filter((n) =>
            edges.find((e) => e.source === nodeId && e.target === n.id)
          );
          children.forEach((child) => {
            removeChildren(child.id, allNodes);
            const childIndex = allNodes.findIndex((n) => n.id === child.id);
            if (childIndex >= 0) {
              allNodes.splice(childIndex, 1);
            }
          });
        };

        removeChildren(id, updatedNodes);
        return updatedNodes;
      });

      setEdges((prevEdges) => {
        const allSubtreeNodeIds = new Set();
        const collectSubtreeNodeIds = (nodeId) => {
          allSubtreeNodeIds.add(nodeId);
          const childNodes = prevEdges
            .filter((e) => e.source === nodeId)
            .map((e) => e.target);
          childNodes.forEach(collectSubtreeNodeIds);
        };

        collectSubtreeNodeIds(id); // Start the collection with the current node being converted

        // Remove edges that are connected to the node and its subtree
        return prevEdges.filter((edge) => !allSubtreeNodeIds.has(edge.source));
      });
    },
    [setNodes, setEdges, nodes]
  );

  // Updating nodes to include the new function
  const updatedNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          updateNode: updateNodeLabel, // Add this line
          onTurnIntoIf:
            node.type === "valueNode"
              ? () => turnValueNodeIntoIfNode(node.id)
              : undefined,
          onTurnIntoValue:
            node.type === "ifNode"
              ? () => turnIfNodeIntoValueNode(node.id)
              : undefined,
        },
      })),
    [nodes, turnValueNodeIntoIfNode, turnIfNodeIntoValueNode, updateNodeLabel]
  );

  return (
    <div style={{ width: '80vw', height: '80vh' , }}>
      <Toolbar
        onExportToPython={exportToPython}
        onResetLayout={onResetLayout}
      />
      <ReactFlow
        nodes={updatedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        connect
      />
    </div>
  );
}
