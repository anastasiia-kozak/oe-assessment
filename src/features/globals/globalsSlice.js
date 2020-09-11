import { createSlice, nanoid } from '@reduxjs/toolkit';
import './globalsSlice.css'

export const THEME_BLUE = 'blue';
export const THERE_PURPLE = 'purple';
export const THEME_ORANGE = 'orange';

export const globalsSlice = createSlice({
    name: 'globals',
    initialState: {
        theme: THEME_BLUE,
    },
    reducers: {
        actionSetTheme: (state, action) => {
            const theme = action.payload;
            state.theme = theme;
        }
    }
});

export const { actionSetTheme } = globalsSlice.actions;

export const selectTheme = state => state.globals.theme;

export default globalsSlice.reducer;
