import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { Location } from "./Location";

test('render location when presented', () => {
    const { getByText, getByRole } = render(
        <Provider store={store}>
            <Location location={{status: 'fulfilled', zip: '98004', city: 'Bellevue'}}/>
        </Provider>
    );

    expect(getByText(/98004/i)).toBeInTheDocument();
    expect(() => getByRole('generic', {name: "loading-icon"})).toThrow();
});

test('render spinner when location is loading', () => {
    const { getByRole } = render(
        <Provider store={store}>
            <Location location={{status: 'pending', zip: '98004', city: 'Bellevue'}}/>
        </Provider>
    );

    expect(getByRole('generic', {name: "loading-icon"})).toBeInTheDocument();
});
