import type {
    UserLoginRequest,
    UserLoginResponse,
    UserSignupRequest,
    UserSignupResponse,
} from 'englikh-contracts';

import { baseApi } from '@/shared/api/baseApi';

export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<UserLoginResponse, UserLoginRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),
        signup: build.mutation<UserSignupResponse, UserSignupRequest>({
            query: (body) => ({
                url: '/auth/signup',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation } = sessionApi;
