import React from "react";
import {Result} from "antd";

export const UnknownResult: React.FC = () => {
    return (
        <Result
            status="warning"
            title="There are some problems with your operation."
        />
    )
}
