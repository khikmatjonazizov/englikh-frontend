import React, { useContext } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserLoginRequest } from 'englikh-contracts';

import { useLoginMutation } from '@/entities/session/api/sessionApi.ts';
import { handleRequestError } from '@/shared/lib/handleRequestError.ts';
import { AppContext } from '@/shared/ui/AppContext';

export const LoginForm: React.FC = () => {
    const nav = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const { messageApi } = useContext(AppContext);

    const onFinish = async (values: UserLoginRequest) => {
        try {
            await login(values).unwrap();
            nav('/', { replace: true });
        } catch (error) {
            messageApi && await handleRequestError(error, messageApi);
        }
    };

    const onClick = () => {
        nav('/auth?signup=true', { replace: true });
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter the correct email!' },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 8, message: 'Password must be at least 8 characters long!' },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button
                    style={{ width: '100%' }}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={isLoading}
                >
                    Log in
                </Button>
                Or <a onClick={onClick}>
                register now!
            </a>
            </Form.Item>
        </Form>
    );
};
