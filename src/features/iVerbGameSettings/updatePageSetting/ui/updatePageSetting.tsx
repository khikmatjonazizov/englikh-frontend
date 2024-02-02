import React from "react";
import {Radio, RadioChangeEvent, Space} from "antd";

import iVerbs from '@/shared/data/ex.json'
import {IVerbGameStore} from "@/entities/iVerbGame/model/types.ts";

interface UpdatePageSettingsProps {
    onChange: (temporaryPage: IVerbGameStore['settings']['page']) => void;
    temporaryPage: IVerbGameStore['settings']['page'];
}

export const UpdatePageSetting: React.FC<UpdatePageSettingsProps> = (props) => {
    const {temporaryPage, onChange} = props;

    const handleChange = (event: RadioChangeEvent) => {
        onChange(event.target.value)
    }

    return (
        <Space direction="vertical" style={{gap: '20px'}}>
            <h4 style={{margin: 0}}>Page</h4>
            <Radio.Group
                onChange={handleChange}
                value={temporaryPage}
            >
                <Space direction="vertical">
                    {
                        new Array(Math.ceil(iVerbs.length / 90)).fill(0).map((_, idx) => (
                            <Radio key={idx} value={String(idx + 1)}>Page {idx + 1}</Radio>
                        ))
                    }
                    <Radio value="all">All</Radio>
                </Space>
            </Radio.Group>
        </Space>
    )
}
