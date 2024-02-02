import {createSlice} from "@reduxjs/toolkit";

import {AppSliceStore, UpdateAppAction} from "./types.ts";

const initialState: AppSliceStore = {
    errorType: null,
}

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        UPDATE_APP: (state, {payload}: UpdateAppAction) => {
            return {...state, ...payload}
        }
    }
})

export const { UPDATE_APP } = AppSlice.actions
