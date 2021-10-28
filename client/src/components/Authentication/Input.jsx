import React from "react";
import { TextField, Grid } from "@material-ui/core";

const Input = ({
    half,
    name,
    id,
    label,
    type,
    autoFocus,
    testID,
    handleChange,
    helperText,
    error
}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                required
                fullWidth
                variant="outlined"
                name={name}
                inputProps={{ "data-testid": testID }}
                onChange={handleChange}
                label={label}
                type={type}
                autoFocus={autoFocus}
                id={id}
                error={helperText ? true : false}
                helperText={helperText ? helperText : null}
            ></TextField>
        </Grid>
    );
};

export default Input;
