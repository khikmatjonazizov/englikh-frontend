import React from "react";
import {Button, Form, Input, Space} from "antd";

import {useAppSelector} from "@/shared/model/hooks";
import {Loader} from "@/shared/ui/Loader";
import {useInputsStructure} from "@/features/iVerbGame/continueGame/model/hooks/useInputsStructure.ts";
import {UserAnswer} from "@/entities/iVerbGame/model/types.ts";
import {useContinueGame} from "@/features/iVerbGame/continueGame/model/hooks/useContinueGame.ts";

export const Play: React.FC = () => {
    const [form] = Form.useForm();
    const {
        current,
    } = useAppSelector(state => state.i_verb_game)
    const { inputsStructure } = useInputsStructure()
    const { continueGame } = useContinueGame()

    if(current === null) return <Loader />

    const onSubmit = (userAnswer: UserAnswer) => {
        continueGame(userAnswer)
        form.resetFields()
    }

    return (
        <Space direction="vertical">
            <Form
                form={form}
                onFinish={onSubmit}
            >
                {
                    inputsStructure.map(({placeholder}) => (
                        <Form.Item
                            key={placeholder}
                            name={placeholder.toLowerCase()}
                            rules={[{ required: true, message: `Please input ${placeholder}!`}]}
                        >
                            <Input placeholder={placeholder} size="large" autoFocus />
                        </Form.Item>
                    ))
                }
                <Form.Item>
                    <Button size="large" type="primary" style={{width: '100%'}} htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Space>
    )
}
