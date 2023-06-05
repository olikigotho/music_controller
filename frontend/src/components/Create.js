import React, { setState } from "react";
import { Link } from "react-router-dom";
import { 
    Button, Grid, Typography, TextField, FormHelperText, 
    FormControl, Radio, RadioGroup, FormControlLabel, FormLabel
} from "@material-ui/core";


const Create = () => {
    const defaultVotes = 2;

    return(
        // number of pixels multiplied by 8 is the number in the grid
        // 12 is the maximum number of spaces
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" vairant="h4">
                    Create a room?
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset" >
                    <FormHelperText >
                        <div align="center">
                            Guest Control of Plackback State
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue="true">
                        <FormControlLabel
                            value="true" 
                            control={ <Radio color="primary" />} 
                            label="Play/Pause"
                            labelPlacement = "bottom"
                        />
                        <FormControlLabel
                            value="false" 
                            control={ <Radio color="secondary" />} 
                            label="No Control"
                            labelPlacement = "bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>    
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        required={ true }
                        type="number"
                        defaultValue={ defaultVotes }
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                        }}
                    />
                    <FormHelperText>
                        <div align = "center">
                            Votes Required to Skip Song
                        </div>
                    </FormHelperText>

                </FormControl>
            </Grid> 
        </Grid>
    );
}

export default Create