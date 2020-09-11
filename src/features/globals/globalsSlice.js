import { createSlice } from '@reduxjs/toolkit';

export const THEME_BLUE = 'blue';
export const THERE_PURPLE = 'purple';
export const THEME_ORANGE = 'orange';

export const globalsSlice = createSlice({
    name: 'globals',
    initialState: {
        theme: THEME_BLUE,
        addLocationPopupShow: false,
        temperatureUnit: 'F',
    },
    reducers: {
        actionSetTheme: (state, action) => {
            state.theme = action.payload;
        },
        actionAddLocationPopupOpen: (state) => {
            state.addLocationPopupShow = true;
        },
        actionAddLocationPopupClose: (state) => {
            state.addLocationPopupShow = false;
        },
        actionChangeTemperatureUnit: (state, action) => {
            state.temperatureUnit = action.payload;
        },
    }
});

export const { actionSetTheme, actionAddLocationPopupClose, actionAddLocationPopupOpen, actionChangeTemperatureUnit } = globalsSlice.actions;

export const selectTheme = state => state.globals.theme;
export const selectAddLocationPopupShow = state => state.globals.addLocationPopupShow;
export const selectTemperatureUnit = state => state.globals.temperatureUnit;


export default globalsSlice.reducer;
