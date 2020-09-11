import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from '../features/locations/locationsSlice';
import globalsReducer from '../features/globals/globalsSlice';

export default configureStore({
  reducer: {
    globals: globalsReducer,
    locations: locationsReducer
  },
});
