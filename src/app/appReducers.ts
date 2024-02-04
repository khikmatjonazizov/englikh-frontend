import {combineReducers} from "@reduxjs/toolkit";

import {IVerbGameSlice} from "@/entities/iVerbGame/model/slice.ts";
import {AppSlice} from "@/entities/app/model/slice.ts";
import {baseApi} from "@/shared/api/baseApi.ts";
import {SessionSlice} from "@/entities/session/model/slice.ts";

export const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    [SessionSlice.name]: SessionSlice.reducer,
    [IVerbGameSlice.name]: IVerbGameSlice.reducer,
    [AppSlice.name]: AppSlice.reducer,
})
