import React from "react";
import { ReactFlowProvider } from 'reactflow';
import { useTree } from "./TreeContext";
import NodeComponent from "./NodeComponent";
import { FlowCanvas } from "./FlowCanvas";

const renderTree = (node, onNodeSelect, onAddChild, onEdit, onDelete) => {
  if (!node) return null;
  return (
    <div
      key={node.label}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <NodeComponent
        node={node}
        onNodeSelect={onNodeSelect}
        onAddChild={onAddChild}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      {node.children &&
        node.children.map((child) =>
          renderTree(child, onNodeSelect, onAddChild, onEdit, onDelete)
        )}
    </div>
  );
};

function TreeCanvas() {
  const { tree, addNode, editNode, deleteNode } = useTree();

  const handleAddChild = (parentId) => {
    const nodeLabel = prompt("Enter node label:");
    if (nodeLabel) {
      const newNode = {
        id: Date.now().toString(),
        label: nodeLabel,
        children: [],
      };
      addNode(parentId, newNode);
    }
  };

  const handleNodeSelect = (node) => {
    // Placeholder for node selection logic
    console.log("Selected node:", node);
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
    <div>
      {/* <div className="TreeCanvas">
        {renderTree(tree, handleNodeSelect, handleAddChild, handleEditNode, handleDeleteNode)}
      </div> */}
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
    </div>
  );
}

export default TreeCanvas;
