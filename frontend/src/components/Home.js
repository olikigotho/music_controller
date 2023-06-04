import React, { useState } from "react";
import JoinRoom from "./JoinRoom";
import Create from "./Create";
import { BrowserRouter as Router, Route, Routes, Link, Redirect } from "react-router-dom";

// Define a functional component named Home
// remember to add paths to frontend/urls.py
const Home = () => {
    const [content, setContent] = useState("This is the home page")
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={ <p>{ content }</p>} />
                    <Route path="/join" element={ <JoinRoom/> } />
                    <Route path="/create" element={ <Create/> } />
                </Routes>
            </div>
        </Router> 
    );
}
 
export default Home