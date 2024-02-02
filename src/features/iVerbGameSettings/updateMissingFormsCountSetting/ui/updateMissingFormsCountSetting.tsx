import React from "react";
import {Radio, RadioChangeEvent, Space} from "antd";

import {IVerbGameStore} from "@/entities/iVerbGame/model/types.ts";

interface UpdateDisplayedFormsSettingProps {
    temporaryMissingFormsCount: IVerbGameStore['settings']['missing_forms_count'];
    onChange: (temporaryMissingFormsCount: IVerbGameStore['settings']['missing_forms_count']) => void;
}

export const UpdateMissingFormsCountSetting: React.FC<UpdateDisplayedFormsSettingProps> = (props) => {
    const { temporaryMissingFormsCount, onChange } = props;

    const handleChange = (event: RadioChangeEvent) => {
        onChange(event.target.value)
    }

    return (
        <Space direction="vertical" style={{gap: '20px'}}>
            <h4 style={{margin: 0}}>Missing forms count</h4>
            <Radio.Group onChange={handleChange} value={temporaryMissingFormsCount} buttonStyle="solid">
                <Radio.Button value={1}>One</Radio.Button>
                <Radio.Button value={2}>Two</Radio.Button>
            </Radio.Group>
        </Space>
    )
}
