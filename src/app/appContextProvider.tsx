import React from "react";
import {message} from "antd";

import { AppContext } from "@/shared/ui/AppContext";

type AppContextProviderProps = {
    children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({children}) => {
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <AppContext.Provider value={{messageApi}}>
            {contextHolder}
            {children}
        </AppContext.Provider>
    )
}
