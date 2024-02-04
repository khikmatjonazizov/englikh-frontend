import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';


import '@/shared/styles/entry.css';
import { appStore } from './appStore.ts';
import { AppRouter } from './appRouter.tsx';
import { Loader } from '@/shared/ui/Loader';
import { AppContextProvider } from './appContextProvider.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={appStore}>
            <Suspense
                fallback={
                    <Loader containerStyle={{ height: '100dvh' }} iconStyle={{ fontSize: '50px' }} />
                }
            >
                <AppContextProvider>
                    <AppRouter />
                </AppContextProvider>
            </Suspense>
        </Provider>
    </React.StrictMode>,
);
