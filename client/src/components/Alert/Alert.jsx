import React from "react";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const AlertMessage = ({ field }) => {
    const alert = useSelector((state) => state.alert);
    if (alert.errors[field]) {
        return <Alert severity="error">{alert.errors[field]}</Alert>;
    } else if (alert.success[field]) {
        return <Alert severity="success">{alert.success[field]}</Alert>;
    } else return null;
};

export default AlertMessage;
