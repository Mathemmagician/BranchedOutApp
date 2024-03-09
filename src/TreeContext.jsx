import React, { createContext, useContext, useState } from 'react';

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
    <TreeContext.Provider value={{ tree, addNode, editNode, deleteNode }}>
      {children}
    </TreeContext.Provider>
  );
};
