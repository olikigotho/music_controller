import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    Button, Grid, Typography, TextField, FormHelperText, 
    FormControl, Radio, RadioGroup, FormControlLabel, FormLabel
} from "@mui/material";




const Create = () => {
    const navigate = useNavigate(); // Retrieves the navigate function from the React Router to enable navigation within the application

    const defaultVotes = 2; // Sets the default number of votes to skip a song

    const [votesToSkip, setVotesToSkip] = useState(2); // Initializes the state variable for the number of votes required to skip a song with a default value of 2
    const [guestCanPause, setGuestCanPause] = useState(true); // Initializes the state variable for whether guests can control playback with a default value of true

    const handlesVotesChange = (e) => {
        // Update the votesToSkip state variable with the value entered in the input field
        setVotesToSkip(e.target.value); 
    };

    const handleGuestCanPauseChange = (e) => {
        // Updates the guestCanPause state variable based on the selected option in the radio buttons
        setGuestCanPause(e.target.value == "true" ? true : false); 
    };

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST", // Sets the HTTP method to POST for sending data
            headers: { "Content-Type": "application/json" }, // Sets the content type header to JSON
            body: JSON.stringify({
                votes_to_skip: votesToSkip, // Sets the votes_to_skip value in the request body
                guest_can_pause: guestCanPause, // Sets the guest_can_pause value in the request body
            }),
        };
        // send the resquest to the target of the fetch
        fetch("/api/create-room", requestOptions)
            // once we get a response, convert response to json.
            .then((response) => response.json())
            // move to the newly formed page
            .then((data) => navigate('/room/' + data.code));
    };
    return (
        <Grid container spacing={1}>
            {/* Grid item with 12 spaces, aligns content to center */}
            <Grid item xs={12} align="center">
                {/* Heading typography */}
                <Typography component="h4" variant="h4">
                    Create a room?
                </Typography>
            </Grid>
            {/* Grid item with 12 spaces, aligns content to center */}
            <Grid item xs={12} align="center">
                {/* Form control wrapper */}
                <FormControl component="fieldset">
                    {/* Form helper text */}
                    <FormHelperText style={{ textAlign: "center" }}>
                        {/* Aligns text to center */}
                        <span style={{ display: "block" }}>
                            Guest Control of Playback State
                        </span>
                    </FormHelperText>
                    {/* Radio group for selecting playback control */}
                    <RadioGroup
                        row
                        defaultValue="true"
                        onChange={handleGuestCanPauseChange}
                    >
                        {/* Radio button for Play/Pause control */}
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />
                        {/* Radio button for No Control */}
                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            {/* Grid item with 12 spaces, aligns content to center */}
            <Grid item xs={12} align="center">
                {/* Form control wrapper */}
                <FormControl>
                    {/* Text field for entering votes */}
                    <TextField
                        required={true}
                        type="number"
                        onChange={ handlesVotesChange }
                        defaultValue={defaultVotes}
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                        }}
                    />
                    {/* Form helper text */}
                    <FormHelperText style={{ textAlign: "center" }}>
                        {/* Aligns text to center */}
                        <span style={{ display: "block" }}>
                        Votes Required to Skip Song
                        </span>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" 
                    variant="contained"
                    onClick = { handleRoomButtonPressed }>
                    Create A Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}
    

export default Create