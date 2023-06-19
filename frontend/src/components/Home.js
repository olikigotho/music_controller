import React, { useState, useEffect } from "react";
import JoinRoom from "./JoinRoom";
import Create from "./Create";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material"
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet } from "react-router-dom";

// Define a functional component named Home
// remember to add paths to frontend/urls.py
const Home = () => {
    const [roomCode, setRoomCode] = useState("")
    // life cycle method
    /* 
    This will check whether we are already in a room when
    when we open the home page. The home page will load once first.
    Later in the code, we will be able to automatically transfer the 
    person to the room which they were already in.
    */
    useEffect(() => {
        // Fetch the room code when the component mounts
        // runs asynchronously
        
        // Define an async function named fetchRoomCode
        const fetchRoomCode = async () => {
            // Send a GET request to the "/api/user-in-room" endpoint
            const response = await fetch("/api/user-in-room");

            // Parse the response as JSON
            const data = await response.json();

            // Update the state variable 'roomCode' with the received room code
            setRoomCode(data.code);
        };

        // Call the fetchRoomCode function when the component mounts
        fetchRoomCode();
    }, []);

    // Clear the rooms code
    const clearRoomCode = () => {
        setRoomCode(null);
    };
        

    // Define a nested functional component named HomePage
    const HomePage = () => {
        return (
            // Render a grid layout using MUI Grid components
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    {/* Render a heading */}
                    <Typography variant="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        {/* Render a button with a link */}
                        <Button color="primary" to="/join" component={Link}>
                            Join a Room
                        </Button>
                        {/* Render a button with a link  */}
                        <Button color="secondary" to="/create" component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );  
    }

    return (
        // Set up the Router component
        <Router>
            <div>
                {/* Define the routes */}
                <Routes>
                    {/* Render the HomePage component when the path is exactly "/" */}
                    <Route exact path="/" 
                        element={
                            roomCode ? (
                                <Navigate to={`/room/${roomCode}`} />
                            ) : (
                                <HomePage />
                            )
                        }/>
                    {/* Render the JoinRoom component when the path is "/join" */}
                    <Route path="/join" element={<JoinRoom />} />
                    {/* Render the Create component when the path is "/create" */}
                    <Route path="/create" element={<Create />} />
                    {/* Render the Room component when the path is "/room/:roomCode" */}
                    {/* Must have ": paranthesis to work*/ }
                    {/* ... is the spread operator. Callback enabables component 
                    to change aparent*/}
                    <Route path="/room/:roomCode" element={<Room leaveRoomCallback={clearRoomCode} />} />
                    {/* Render the Outlet component for any other unmatched routes */}
                    <Route path="/*" element={<Outlet />} />
                </Routes>
            </div>
        </Router> 
    );
}
 
export default Home