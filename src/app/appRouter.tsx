import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";

const LazyHomePage = lazy(() => import('@/pages/home'))
const LazyIVerbPage = lazy(() => import('@/pages/iVerb'))
const LazyErrorPage = lazy(() => import('@/pages/error'))


export const appRouter = () =>
    createBrowserRouter([
        {
            path: '/',
            element: <LazyHomePage />,
        },
        {
            path: '/irregular-verb',
            element: <LazyIVerbPage />
        },
        {
            path: '/error',
            element: <LazyErrorPage />
        }
    ])
