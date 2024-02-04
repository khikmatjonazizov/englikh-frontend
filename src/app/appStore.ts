import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'

import {rootReducer} from "@/app/appReducers";
import {sessionApi} from '@/entities/session/api/sessionApi.ts'

const middlewares = [sessionApi.middleware];

export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        }).concat(middlewares);
    }
})

setupListeners(appStore.dispatch)

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>
