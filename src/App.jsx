import React from "react";
import { ClassComponent } from "./components/ClassComponent/ClassComponent";

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <ClassComponent min={1} max={10} />
      </div>
    );
  }
}
