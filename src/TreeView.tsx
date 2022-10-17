import * as React from "react";
import { useState } from "react";
import "./TreeView.scss";

export interface Node {
  id: string;
  name: string;
}

const _Node = {
  empty: () => {
    const emptyNode: Node = {
      id: "",
      name: "",
    };
    return emptyNode;
  },
};

const TreeNode = (props: any) => {
  const { name, id, loadChildren, selectLeaf, onLeaf, Component } = props;
  const [loaded, setLoaded] = useState(false);
  const [children, setChildren] = useState([] as Node[]);
  const [leaf, setLeaf] = useState(_Node.empty());

  const load = () => {
    if (!loaded) {
      const children = loadChildren(id);
      if (Array.isArray(children) && children.length > 0) {
        setChildren(children);
      } else {
        setChildren([]);
        const leaf = selectLeaf(id);
        setLeaf(leaf);
        onLeaf(leaf);
      }
      setLoaded(true);
    }
  };

  const isLeaf = loaded && children.length < 1 && leaf.id;
  const onClick = isLeaf ? onLeaf : load;

  // Used for simulating long running api call
  const delay = (delay: number, func: (id: number) => void) => {
    return () => setTimeout(func, delay);
  };
  const delayTime = loaded ? 0 : 2000;
  const clickHandler = delay(delayTime, onClick);

  return (
    <ul>
      <li className="tree-node" onClick={() => clickHandler()}>
        <details>
          <summary>
            <Component name={name} />
          </summary>
          {children.map((child: Node) => (
            <TreeNode
              Component={Component}
              key={child.id}
              id={child.id}
              name={child.name}
              loadChildren={loadChildren}
              selectLeaf={selectLeaf}
              onLeaf={onLeaf}
            />
          ))}
        </details>
      </li>
    </ul>
  );
};

export const TreeView = (props: any) => {
  const { loadChildren, selectLeaf, onLeaf, nodes, Component } = props;

  return (
    <section className="tree">
      {nodes.map((node: Node) => (
        <TreeNode
          Component={Component}
          key={node.id}
          id={node.id}
          name={node.name}
          loadChildren={loadChildren}
          selectLeaf={selectLeaf}
          onLeaf={onLeaf}
        />
      ))}
    </section>
  );
};
