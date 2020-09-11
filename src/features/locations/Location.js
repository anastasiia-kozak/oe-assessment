import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actionRemoveLocation, LOCATION_STATUS_REJECTED} from './locationsSlice';
import './Location.css';
import {selectTemperatureUnit} from "../globals/globalsSlice";

export function Location(props) {
    const { location } = props;
    const convertTemperature = useSelector(selectTemperatureUnit);

    const dispatch = useDispatch();

    const convertUnit = () => {
        let temp = 0;
        if (convertTemperature === 'C'){
            temp = ((location.temp - 32) * 5 / 9).toFixed(0) + 'C'
        } else {
            temp = location.temp + 'F'
        }
        return temp
    };

    return (
        <div className="weather-block">
            {location.status !== LOCATION_STATUS_REJECTED ?
                <div className="weather">
                    <h3>{location.zip}: {location.city}</h3>
                    <img alt='weather-icon' src={`http://openweathermap.org/img/wn/${location.icon}@2x.png`}/>
                    <span>{convertUnit()}</span>
                    <button className='menu-btn delete-city' onClick={() => dispatch(actionRemoveLocation(location.id))} >X</button>
                </div>
                :
                <div className="weather">
                    <span>Invalid ZIP Code: <b>{location.zip}</b></span>
                    <button className='menu-btn delete-city' onClick={() => dispatch(actionRemoveLocation(location.id))} >X</button>
                </div>
            }
        </div>
    );
}
