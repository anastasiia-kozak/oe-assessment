import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {actionAddLocation} from './locationsSlice';
import { selectAddLocationPopupShow, actionAddLocationPopupClose } from "../globals/globalsSlice";
import './Popup.css'

export function AddLocationForm() {
    const dispatch = useDispatch();
    const addLocationPopupShow = useSelector(selectAddLocationPopupShow);
    const [location, setLocations] = useState('');

    const onClickAdd = () => {
        setLocations('');
        dispatch(actionAddLocation(location));
        dispatch(actionAddLocationPopupClose());
    };

    const onClickClose = () => {
        dispatch(actionAddLocationPopupClose());
    };

    return (
        <div className={'popup ' + (addLocationPopupShow && 'active')}>
            <div className='vertical-align-center centered'>
                <div className='align'>
                    <input type="text" placeholder="Please, enter ZIP Code" value={location} onChange={(event) => setLocations(event.target.value)}/>
                    <button className='popup-btn border-btn' onClick={() => onClickClose()}>Close</button>
                    <button className='popup-btn fill-btn' onClick={() => onClickAdd()}>Add Location</button>
                </div>
            </div>
        </div>
    );
}
