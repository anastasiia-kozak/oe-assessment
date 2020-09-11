import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionAddLocation } from './locationsSlice';
import './Popup.css'

export function AddLocationForm() {
    const dispatch = useDispatch();
    const [location, setLocations] = useState('');

    return (
        <div className='popup'>
            <div className='vertical-align-center centered'>
                <div className='align'>
                    <input type="text" placeholder="Please, enter ZIP Code" value={location} onChange={(event) => setLocations(event.target.value)}/>
                    <button className='popup-btn pinkie' onClick={() => dispatch(actionAddLocation(location))}>Add Location</button>
                </div>
            </div>
        </div>
    );
}
