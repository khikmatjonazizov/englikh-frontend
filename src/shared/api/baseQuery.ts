import {fetchBaseQuery} from '@reduxjs/toolkit/query'

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ENGLIKH_API_URL,
    prepareHeaders: (headers, {getState}) => {
        const {accessToken} = (getState() as RootState).session;

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
        }

        return headers
    },
})
