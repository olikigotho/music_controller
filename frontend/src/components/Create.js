import React, { setState } from "react";
import { Link } from "react-router-dom";
import { 
    Button, Grid, Typography, TextField, FormHelperText, 
    FormControl, Radio, RadioGroup, FormControlLabel, FormLabel
} from "@material-ui/core";


const Create = () => {
    const defaultVotes = 2;
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
                    <FormHelperText>
                        {/* Div aligns text to center */}
                        <div align="center">
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    {/* Radio group for selecting playback control */}
                    <RadioGroup row defaultValue="true">
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
                        defaultValue={defaultVotes}
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                        }}
                    />
                    {/* Form helper text */}
                    <FormHelperText>
                        {/* Div aligns text to center */}
                        <div align="center">
                            Votes Required to Skip Song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
    );
}
    

export default Create