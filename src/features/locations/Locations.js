import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllLocations } from './locationsSlice';
import { AddLocationForm } from './AddLocationForm';
import { Location } from './Location';


export function Locations() {
    const locations = useSelector(selectAllLocations);

    return (
        <div>
            <AddLocationForm/>
            <div>
                {locations.map(location => {
                    return <Location key={location.id} location={location}/>;
                })}
            </div>
        </div>
    );
}
