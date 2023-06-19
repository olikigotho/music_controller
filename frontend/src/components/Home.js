import React, { useState } from "react";
import JoinRoom from "./JoinRoom";
import Create from "./Create";
import Room from "./Room";
import { BrowserRouter as Router, Route, Routes, Link, Redirect } from "react-router-dom";

// Define a functional component named Home
// remember to add paths to frontend/urls.py
const Home = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={ <p>This is the home page</p>} />
                    <Route path="/join" element={ <JoinRoom/>} />
                    <Route path="/create" element={ <Create/> } />
                    {/* Must have ": paranthesis to work*/ }
                    <Route path="/room/:roomCode" element={ <Room/> }/>
                </Routes>
            </div>
        </Router> 
    );
}
 
export default Home