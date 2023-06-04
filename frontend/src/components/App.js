import React, { useState } from "react";
import { render } from "react-dom";
import Home from "./Home";
import {BrowserRouter as Router, Route, Routes, Link, Redirect } from "react-router-dom";


// This is the main React component.
// It is called by index.js and represents the top-level content rendered in the template: index.html.
const App = () => {
    const [content, setContent] = useState("Testing Now!")
    return (// JSX code representing the content to be rendered
        <Home />   
    );
};

// Getting the element with the id "app" from the document
const appDiv = document.getElementById("app");

// Rendering the App component and attaching it to the appDiv element
render(<App />, appDiv);

export default App;