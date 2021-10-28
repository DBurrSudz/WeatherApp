import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import getForecast from "../../store/actions/forecast";

/**
 * TODO: Build search bar.
 *
 * TODO: Map weather data from state when action is called to 'Day' component.
 *
 * TODO: Style component.
 */

const Forecast = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const { latitude, longitude } = pos.coords;
                    dispatch(getForecast(latitude, longitude));
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, []);
    return <div></div>;
};

export default Forecast;
