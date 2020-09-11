import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import { Locations } from './features/locations/Locations';
import {
    selectTheme,
    actionAddLocationPopupOpen,
    THEME_BLUE,
    THERE_PURPLE,
    THEME_ORANGE,
    actionChangeTemperatureUnit, selectTemperatureUnit
} from './features/globals/globalsSlice';
import { actionRefreshAllLocationsWeather } from './features/locations/locationsSlice';
import { actionSetTheme } from './features/globals/globalsSlice';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSyncAlt}  from '@fortawesome/free-solid-svg-icons';



function App() {
    const theme = useSelector(selectTheme);
    const convertTemperature = useSelector(selectTemperatureUnit);
    console.log(convertTemperature)
    const dispatch = useDispatch();


    const onClickChangeTheme = newTheme => dispatch(actionSetTheme(newTheme));
    const onClickChangeTemperatureToCelsius = () => dispatch(actionChangeTemperatureUnit('C'));
    const onClickChangeTemperatureToFahrenheit= () => dispatch(actionChangeTemperatureUnit('F'));

    return (
        <div className={'App ' + theme + '-gradient'}>
            <header className='App-header'>
                <div className='container'>
                    <div className='menu'>
                        <div className='left-side'>
                            <button className={theme === THEME_BLUE ? 'blue-gradient bg-button active' : 'blue-gradient bg-button'}  onClick={() => onClickChangeTheme(THEME_BLUE)}/>
                            <button className={theme === THERE_PURPLE ? 'purple-gradient bg-button active' : 'purple-gradient bg-button'} onClick={() => onClickChangeTheme(THERE_PURPLE)}/>
                            <button className={theme === THEME_ORANGE ? 'orange-gradient bg-button active' : 'orange-gradient bg-button'} onClick={() => onClickChangeTheme(THEME_ORANGE)}/>
                        </div>
                        <div className="center-side">
                            <button className={ convertTemperature === 'F' ? 'menu-btn line active' : 'menu-btn line'} onClick={() => onClickChangeTemperatureToFahrenheit()}>F</button>
                            <button className={ convertTemperature === 'C' ? 'menu-btn active' : 'menu-btn'} onClick={() => onClickChangeTemperatureToCelsius()}>C</button>
                        </div>
                        <div className="right-side">
                            <button className="menu-btn" onClick={() => dispatch(actionAddLocationPopupOpen())}>+</button>
                            <button className="menu-btn icon" onClick={() => dispatch(actionRefreshAllLocationsWeather())}><FontAwesomeIcon icon={faSyncAlt}/></button>
                        </div>
                    </div>
                </div>
            </header>


            <div className='container'>
                <span>Current Theme: {theme}</span>
                <h1>WEATHER</h1>
                <Locations/>
            </div>
        </div>
    );
}

export default App;
