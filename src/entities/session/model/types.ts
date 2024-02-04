import type {UserLoginResponse} from 'englikh-contracts';

export type SessionSliceStore = {
    user: UserLoginResponse['user'] | null;
    accessToken: UserLoginResponse['accessToken'] | null;
};
