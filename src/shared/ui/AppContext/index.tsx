import React from "react";
import {MessageInstance} from "antd/es/message/interface";


type AppContextType = {
    messageApi: MessageInstance | null;
}

export const AppContext = React.createContext<AppContextType>({messageApi: null});
