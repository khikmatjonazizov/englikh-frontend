import {createApi} from '@reduxjs/toolkit/query/react'

import {baseQuery} from "@/shared/api/baseQuery.ts";

export const baseApi = createApi({
    baseQuery,
    reducerPath: 'api',
    endpoints: () => ({}),
})
