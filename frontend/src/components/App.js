import React, { useState } from "react";
import { render } from "react-dom";

// This is the main React component.
// It is called by index.js and represents the top-level content rendered in the template: index.html.
const App = (props) => {
const [content, setContent] = useState("Testing Now!")
  return (
    <h1>{ content } {props.name}</h1> // JSX code representing the content to be rendered
  );
};

// Getting the element with the id "app" from the document
const appDiv = document.getElementById("app");

// Rendering the App component and attaching it to the appDiv element
render(<App name="Billy Bob"/>, appDiv);

export default App;