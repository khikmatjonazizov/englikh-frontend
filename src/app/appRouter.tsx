import React, { lazy } from 'react';
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom';

import { useRestriction } from '@/shared/model/hooks/useRestriction.ts';


const LazyHomePage = lazy(() => import('@/pages/home'));
const LazyIVerbPage = lazy(() => import('@/pages/iVerb'));
const LazyErrorPage = lazy(() => import('@/pages/error'));
const LazyAuthPage = lazy(() => import('@/pages/auth'));
const LazyNotFoundPage = lazy(() => import('@/pages/notFound'));


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<LazyAuthPage />} />
                <Route path="/error" element={<LazyErrorPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<LazyHomePage />} />
                    <Route path="/irregular-verb" element={<LazyIVerbPage />} />
                </Route>
                <Route path="*" element={<LazyNotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export const PrivateRoute: React.FC = () => {
    const { isAuth } = useRestriction();
    if (isAuth) {
        return <Outlet />;
    } else {
        return <Navigate to="/auth" />;
    }
};
