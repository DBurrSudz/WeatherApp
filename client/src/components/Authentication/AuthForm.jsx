import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Container, Paper, Typography, Grid, Button } from "@material-ui/core";
import Alert from "../Alert/Alert";
import Input from "./Input";
import { login, register } from "../../store/actions/user";

const AuthForm = () => {
    const initialFormData = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: ""
    };

    const passwordRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const emailRegex = new RegExp("^(?=.{8,})");
    const dispatch = useDispatch();
    const [isSignup, setisSignup] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [data, setData] = useState(initialFormData);
    const firstRun = useRef(true);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validateForm());
    };

    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }
        if (!isSignup && Object.keys(formErrors).length === 0) {
            dispatch(login(data));
        }

        if (isSignup && Object.keys(formErrors).length === 0) {
            dispatch(register(data));
        }
    }, [formErrors]);

    /**
     * Wraps the setter function for the form data.
     * @param {*} e The current textfield being typed into.
     */
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    /**
     * Toggles the form between login and sign up.
     */
    const changeState = () => {
        setisSignup((prev) => !prev);
    };

    const validateForm = () => {
        let errors = {};
        if (data.email === "") {
            errors.email = "Email is a required field";
        }
        if (data.password === "") {
            errors.password = "Password is a required field";
        }

        //Form is is login mode
        if (!isSignup) return errors;
        //Form is in registration mode
        else {
            if (
                data.email === "" ||
                data.password === "" ||
                data.firstname === "" ||
                data.lastname === "" ||
                data.confirm_password === ""
            ) {
                if (!data.firstname)
                    errors.firstname = "First Name is required.";
                if (!data.lastname) errors.lastname = "Last Name is required.";
                if (!data.confirm_password)
                    errors.confirm_password = "Confirm Password is required.";
                return errors;
            } else {
                if (data.password !== data.confirm_password)
                    errors.confirm_password =
                        "Password and Confirm Password must be the same.";
                else {
                    //Regex to check password.
                    if (!passwordRegex.test(data.password))
                        errors.password =
                            "Password must be at least 8 characters long and contain at least 1 uppercase, 1 lowercase, 1 digit and 1 special character. ";
                }
                //Regex to check email.
                if (!emailRegex.test(data.email))
                    errors.email =
                        "Email address should be at least 8 characters long.";
                return errors;
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Typography data-testid="form-heading" variant="h3">
                    {isSignup ? "Sign Up" : "Sign In"}
                </Typography>
                <Alert field={isSignup ? "registration" : "login"} />
                <form data-testid="signin-form" onSubmit={onSubmit} noValidate>
                    <Grid container spacing={3}>
                        {isSignup && (
                            <>
                                <Input
                                    name="firstname"
                                    id="firstname"
                                    testID="firstname-field"
                                    label="Firstname"
                                    type="text"
                                    autoFocus
                                    handleChange={handleChange}
                                    helperText={formErrors.firstname}
                                    error
                                    half
                                ></Input>
                                <Input
                                    name="lastname"
                                    id="lastname"
                                    testID="lastname-field"
                                    label="Lastname"
                                    type="text"
                                    handleChange={handleChange}
                                    helperText={formErrors.lastname}
                                    half
                                ></Input>
                            </>
                        )}
                        <Input
                            name="email"
                            id="email"
                            label="Email Address"
                            type="email"
                            testID="email-field"
                            autoFocus
                            helperText={formErrors.email}
                            handleChange={handleChange}
                        ></Input>
                        <Input
                            name="password"
                            label="Password"
                            type="password"
                            testID="password-field"
                            helperText={formErrors.password}
                            handleChange={handleChange}
                        ></Input>
                        {isSignup && (
                            <>
                                <Input
                                    name="confirm_password"
                                    label="Confirm Password"
                                    type="password"
                                    testID="confirm-field"
                                    helperText={formErrors.confirm_password}
                                    handleChange={handleChange}
                                ></Input>
                            </>
                        )}
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button
                                data-testid="submit-button"
                                fullWidth
                                type="submit"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                data-testid="change-state"
                                fullWidth
                                onClick={changeState}
                                color="primary"
                            >
                                {isSignup
                                    ? "Already have an account? Login"
                                    : "Don't have an account? Register"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AuthForm;
