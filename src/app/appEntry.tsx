import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";


import '@/shared/styles/entry.css'
import {appStore} from "./appStore.ts";
import {appRouter} from "./appRouter.tsx";
import {Loader} from "@/shared/ui/Loader";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={appStore}>
            <Suspense
                fallback={
                    <Loader containerStyle={{height: '100dvh'}} iconStyle={{fontSize: '50px'}}/>
                }
            >
                <RouterProvider router={appRouter()}/>
            </Suspense>
        </Provider>
    </React.StrictMode>,
)
