import React, { Component } from "react";
import {render } from "react-dom";

/* This is the main javascript component, It is called by index.js 
and it is to top of the react content rendered in the template: 
index.html
*/

// Exporting the class as a default export to index.html
export default class App extends Component {
    constructor(props) {
        super(props); // Calling the constructor of the parent class
    }

    // Render method to render the content within the template to the template
    render() {
        return (
            <h1>Testing React Code</h1> // JSX code representing the content to be rendered
        );
    }
}

// Getting the element with the id "app" from the document
const appDiv = document.getElementById("app");

// Rendering the App component and attaching it to the appDiv element
render(<App />, appDiv);
