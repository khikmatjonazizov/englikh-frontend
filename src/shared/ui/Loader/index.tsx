import React, {CSSProperties} from "react";
import {LoadingOutlined} from "@ant-design/icons";

interface LoaderProps {
    iconStyle?: CSSProperties;
    containerStyle?: CSSProperties;
}

export const Loader: React.FC<LoaderProps> = ({iconStyle, containerStyle}) => {
    return (
        <div style={{height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', ...containerStyle}}>
            <LoadingOutlined style={{fontSize: '30px', ...iconStyle}}/>
        </div>
    )
}
