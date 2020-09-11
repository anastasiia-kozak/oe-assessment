import React from 'react';
import { useDispatch } from 'react-redux';
import { actionRemoveLocation } from './locationsSlice';
import './Location.css';

export function Location(props) {
    const { location } = props;

    const dispatch = useDispatch();

    return (
        <div className="weather-block">
            <div className="weather">
                <h3>{location.zip}: {location.city}</h3>
                <span>{location.temp} F</span>
                <span>{location.status}</span>
                <button className='menu-btn delete-city' onClick={() => dispatch(actionRemoveLocation(location.id))} >X</button>
            </div>
        </div>
    );
}
