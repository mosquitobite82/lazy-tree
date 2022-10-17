import React from "react";
import "./App.scss";
import { TreeView, Node } from "./TreeView";

const nodeList: any[] = [
  { name: "A", id: "a", parent: null },
  { name: "B", id: "b", parent: null },
  { name: "C", id: "c", parent: null },
  { name: "D", id: "d", parent: "a" },
  { name: "E", id: "e", parent: "a" },
  { name: "F", id: "f", parent: "b" },
  { name: "G", id: "g", parent: "b" },
  { name: "H", id: "h", parent: "c" },
  { name: "I", id: "i", parent: "f" },
  { name: "J", id: "j", parent: "f" },
  { name: "K", id: "k", parent: "i" },
  { name: "L", id: "l", parent: "k" },
  { name: "M", id: "m", parent: "l" },
  { name: "N", id: "n", parent: "i" },
];

const rootNodes = nodeList.filter((node) => node.parent === null) as Node[];

function loadNodes(id: string) {
  return nodeList.filter((node) => node.parent === id) as Node[];
}

function selectLeaf(id: string) {
  const leaf = nodeList.filter((node) => node.id === id)[0] as Node;
  if (leaf) return leaf;
  return { name: "Error", id: "", parent: "" };
}
function onLeaf(leaf: Node) {
  alert(leaf.name);
}

const SectionComponent = (props: any) => <section>{props.name}</section>;

function App() {
  return (
    <div className="App">
      <TreeView
        Component={SectionComponent}
        loadChildren={loadNodes}
        selectLeaf={selectLeaf}
        onLeaf={onLeaf}
        nodes={rootNodes}
      />
    </div>
  );
}

export default App;
