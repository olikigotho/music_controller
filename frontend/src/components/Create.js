import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
    Button, Grid, Typography, TextField, FormHelperText, 
    FormControl, Radio, RadioGroup, FormControlLabel, FormLabel
} from "@mui/material";




const Create = () => {
    const defaultVotes = 2;
    const [votesToSkip, setVotesToSkip] = useState(true);
    const [guestCanPause, setGuestCanPause] = useState(true);

    const handlesVotesChange = (e) => {
        setVotesToSkip(e.target.value);
    };
    const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value == "true" ? true : false,)
    };

    const handleRoomButtonPressed = () => {
        console.log(votesToSkip, guestCanPause)
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