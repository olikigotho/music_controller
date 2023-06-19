import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate} from "react-router-dom";


const JoinRoom = () => {
    const navigate = useNavigate() // Accesses the navigation functionality from the React Router
    
    const [roomCode, setRoomCode] = useState("") // Defines state variable for the room code
    const [error, setError] = useState("") // Defines state variable for error message

    const handleTextFieldChange = (e) => {
        // Update the room code state when the text field value changes
        setRoomCode(e.target.value); 
    };

    const roomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: roomCode
            })
        };
        // Send a POST request to the backend API to join a room
        fetch('/api/join-room', requestOptions) 
            .then((response) => {
                if (response.ok) {
                    // Navigate to the joined room if the response is successful
                    navigate(`/room/${roomCode}`) 
                } else {
                    // Set an error message if the room is not found
                    setError("Room not found") 
                }
            })
            .catch((error) => {
                // Logs any error to the console that occurs during the API request
                console.log(error); 
            });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}  align="center">
                <Typography variant="h4" component="h4">
                    Join A Room
                </Typography>
            </Grid>
            <Grid item xs={12}  align="center">
                <TextField
                    error={ error } 
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={ roomCode }
                    helperText={ error }
                    variant="outlined"
                    onChange={ handleTextFieldChange }
                />
            </Grid>
            <Grid item xs={12}  align="center">
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick = { roomButtonPressed }
                    component = {Link}>
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12}  align="center">
                <Button 
                    variant="contained" 
                    color="secondary" 
                    to="/"
                    component = {Link}>
                    Back
                </Button>
            </Grid>
            
        </Grid>
    );
}

export default JoinRoom 