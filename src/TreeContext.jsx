import React, { createContext, useContext, useState } from 'react';


const exportToPython = (node) => {
  let code = "";

  const traverse = (node, depth = 0) => {
    if (!node || !node.children || node.children.length === 0) {
      code += "    ".repeat(depth) + `# Action for ${node.label}\n`;
      return;
    }

    node.children.forEach((child, index) => {
      const condition = `# Condition for ${child.label}`;
      if (index === 0) { // First child is an if statement
        code += "    ".repeat(depth) + `if ${condition}:\n`;
      } else { // Subsequent children are elifs
        code += "    ".repeat(depth) + `elif ${condition}:\n`;
      }
      traverse(child, depth + 1);
    });
  };

  traverse(node);
  return code;
};


const TreeContext = createContext();

export const useTree = () => useContext(TreeContext);

export const TreeProvider = ({ children }) => {
  const [tree, setTree] = useState({
    id: 'root',
    label: 'Root',
    children: [],
  });

  const addNode = (parentId, newNode) => {
    const addNodeRecursive = (node, parentId, newNode) => {
      if (node.id === parentId) {
        if (!node.children) {
          node.children = [];
        }
        node.children.push(newNode);
        return true; // Node added
      } else if (node.children) {
        for (let child of node.children) {
          if (addNodeRecursive(child, parentId, newNode)) {
            return true; // Node added
          }
        }
      }
      return false; // Node not added
    };
  
    setTree((currentTree) => {
      const newTree = { ...currentTree };
      addNodeRecursive(newTree, parentId, newNode);
      return newTree;
    });
  };
  
  const editNode = (id, newLabel) => {
    // This function will edit an existing node's label
    // Placeholder for now
  };

  const deleteNode = (id) => {
    // This function will delete a node from the tree
    // Placeholder for now
  };

  return (
    <TreeContext.Provider value={{ tree, addNode, editNode, deleteNode, exportToPython }}>
    {children}
    </TreeContext.Provider>
  );
};
