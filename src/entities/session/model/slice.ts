import { createSlice } from '@reduxjs/toolkit';

import { sessionApi } from '../api/sessionApi';
import { SessionSliceStore } from './types';

const initialState: SessionSliceStore = {
    accessToken: null,
    user: null,
};

export const SessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            sessionApi.endpoints.login.matchFulfilled,
            (_, { payload }) => {
                return payload;
            },
        );
        builder.addMatcher(
            sessionApi.endpoints.signup.matchFulfilled,
            (_, { payload }) => {
                return payload;
            },
        );
    },
});
