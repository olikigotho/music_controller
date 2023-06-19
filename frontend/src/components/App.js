import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Home from "./Home";
import {BrowserRouter as Router, Route, Routes, Link, Redirect } from "react-router-dom";


// This is the main React component.
// It is called by index.js and represents the top-level content rendered in the template: index.html.
const App = () => {
    const [content, setContent] = useState("Testing Now!")
    return (// JSX code representing the content to be rendered
        // Move center to whaterver room we want to use it in
        <div className="center">
            <Home />
        </div>        
    );
};


// Wait for the DOM content to be loaded before running the rest of the code
document.addEventListener("DOMContentLoaded", function () {
    // Getting the element with the id "app" from the document
    const appDiv = document.getElementById("app");

    // Rendering the App component and attaching it to the appDiv element
    createRoot(appDiv).render(<App />);
});

export default App;