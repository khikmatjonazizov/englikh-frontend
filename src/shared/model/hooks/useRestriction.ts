import { useAppSelector } from '@/shared/model/hooks/reduxHooks.ts';

export const useRestriction = () => {
    const { accessToken } = useAppSelector(state => state.session)

    const isAuth = !!accessToken;

    return {
        isAuth,
    }
}
