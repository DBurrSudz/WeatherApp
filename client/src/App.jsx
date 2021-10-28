import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Home from "./components/pages/Home";
import SavedWeather from "./components/pages/Saved";
import SignIn from "./components/pages/SignIn";

const App = () => {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Switch>
                <Route path="/" component={SignIn} exact />
                <Route path="/home" component={Home} />
                <Route path="/saved" component={SavedWeather} />
            </Switch>
        </BrowserRouter>
    );
};
export default App;
