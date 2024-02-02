import React from "react";
import {Radio, RadioChangeEvent, Space} from "antd";
import controls from "@/shared/data/settings_control_options.json";
import {IVerbGameStore} from "@/entities/iVerbGame/model/types.ts";

interface UpdateControlSettingsProps {
    onChange: (temporaryControl: IVerbGameStore['settings']['control']) => void;
    temporaryControl: IVerbGameStore['settings']['control'];
}

export const UpdateControlSetting: React.FC<UpdateControlSettingsProps> = (props) => {
    const {temporaryControl, onChange} = props;

    const handleChange = (event: RadioChangeEvent) => {
        onChange(event.target.value)
    }
    return (
        <Space direction="vertical" style={{gap: '20px'}}>
            <h4 style={{margin: 0}}>Control</h4>
            <Radio.Group
                onChange={handleChange}
                value={temporaryControl}
            >
                <Space direction="vertical">
                    {
                        controls.map((control, idx) => (
                            <Radio key={idx} value={control.value}>{control.name}</Radio>
                        ))
                    }
                </Space>
            </Radio.Group>
        </Space>
    )
}
