import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

export const LOCATION_STATUS_PENDING = 'pending';
export const LOCATION_STATUS_FULFILLED = 'fulfilled';
export const LOCATION_STATUS_REJECTED = 'rejected';

export const actionAddLocation = zip => dispatch => {
    const id = nanoid();
    dispatch(actionAddPendingLocation(id, zip));
    dispatch(actionFetchLocationWeather({id, zip}));
};

export const actionRefreshAllLocationsWeather = () => (dispatch, getState) => {
    const locations = getState().locations.items;

    locations.forEach((value) => {
        dispatch(actionRefreshLocationWeather(value));
    });
};

export const actionFetchLocationWeather = createAsyncThunk('locations/actionFetchLocationWeather', async (payload) => {
    const {id, zip} = payload;
    const weather = await (fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=2a4b026a6e0dc1c5b25d4f46f6ce634c&units=imperial`))
        .then(response => response.json());
    return {
        id,
        temp: weather.main.temp,
        city: weather.name
    };
});

/**
 * Expect location object in payload
 * @type {AsyncThunk<unknown, void, {}>}
 */
export const actionRefreshLocationWeather = createAsyncThunk('locations/actionRefreshWeatherById', async (payload) => {
    const {id, zip} = payload;
    const weather = await (fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=2a4b026a6e0dc1c5b25d4f46f6ce634c&units=imperial`))
        .then(response => response.json());
    return {
        id,
        temp: weather.main.temp
    };
});

export const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        items: [],
    },
    reducers: {
        actionRemoveLocation: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(location => location.id !== id);
        },
        actionAddPendingLocation: {
            reducer: (state, action) => {
                const {id, zip, status, temp} = action.payload;
                state.items.push({id, zip, status, temp});
            },
            prepare: (id, zip) => {
                return {
                    payload: {
                        id,
                        zip,
                        temp: null,
                        city: null,
                        status: LOCATION_STATUS_PENDING
                    }
                };
            }
        }
    },
    extraReducers: {
        [actionFetchLocationWeather.fulfilled]: (state, action) => {
            const {id, temp, city} = action.payload;
            const location = state.items.find(value => value.id === id);

            if (location) {
                location.status = LOCATION_STATUS_FULFILLED;
                location.temp = temp;
                location.city = city;
            }
        },
        [actionFetchLocationWeather.rejected]: (state, action) => {
            const {id} = action.meta.arg;
            const location = state.items.find(value => value.id === id);
            location && (location.status = LOCATION_STATUS_REJECTED);
        },
        [actionRefreshLocationWeather.pending]: (state, action) => {
            const {id} = action.meta.arg;
            const location = state.items.find(value => value.id === id);
            location && (location.status = LOCATION_STATUS_PENDING);
        },
        [actionRefreshLocationWeather.fulfilled]: (state, action) => {
            const {id, temp} = action.payload;
            const location = state.items.find(value => value.id === id);
            location.temp = temp;
            location.status = LOCATION_STATUS_FULFILLED;
        },
        [actionRefreshLocationWeather.rejected]: (state, action) => {
            const {id} = action.meta.arg;
            const location = state.items.find(value => value.id === id);
            location && (location.status = LOCATION_STATUS_REJECTED);
        },
    }
});

export const selectAllLocations = state => state.locations.items;

export const { actionAddPendingLocation, actionRemoveLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
