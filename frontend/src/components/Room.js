import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material"
import Create from "./Create";

const Room = ({ leaveRoomCallback }) => {
    const { roomCode } = useParams(); // Retrieves the room code from the URL parameter using the "useParams" hook
    const navigate = useNavigate(); //Navigate

    const [votesToSkip, setVotesToSkip] = useState(2); // Defines a state variable for the number of votes required to skip a song
    const [guestCanPause, setGuestCanPause] = useState(false); // Defines a state variable for whether guests can control playback
    const [isHost, setIsHost] = useState(false); // Defines a state variable for whether the user is the host of the room
    const [showSettings, setShowSettings] = useState(false) // Show's settings for the room

    const getRoomDetails = () => {
    // Fetches room details from the backend API based on the room code
    fetch("/api/get-room" + "?code=" + roomCode)
        // returns without return statment since it"s one line
        // Converts the response to JSON
        .then((response) => {
            // if there isnt a room, navigate back to the home page
            if (!response.ok) {
                leaveRoomCallback();
                navigate("/");
            }
            return response.json();
        })
        .then((data) => {
            // Updates the state variables with the retrieved room details
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);

        });
    }

    const leaveButtonPressed = () => {
        // Prepare the request options for the POST request
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        };
      
        // Send a POST request to "/api/leave-room" endpoint
        fetch("/api/leave-room", requestOptions)
            .then((_response) => {
                // When the request is successful, navigate to the "/" route
                navigate("/");
            });
    };

    // update showSettings to the value
    const updateShowSettings = (value) =>  {
        setShowSettings(value);
    };

    const renderSettingsButton = () => {
        return (
            <Grid item xs={12} align = "center">
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    };

    const renderSettings = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Create
                        update={true}
                        votesToSkip={votesToSkip}
                        guestCanPause={guestCanPause}
                        roomCode={roomCode}
                        updateCallback={() => {}}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => updateShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    };

    useEffect(() => {
         // Executes the "getRoomDetails" function when the component mounts
        getRoomDetails();
      }, []); 

    if (showSettings) {
        return renderSettings();
    };
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
                    Votes: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            {/* If the user is a host, do not render the settings button 
            more security in the backend */}
            {isHost ? renderSettingsButton() : null}
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={leaveButtonPressed}>
                    Leave room
                </Button>
            </Grid>
        </Grid>
        
    );
}

export default Room