import React, { useContext } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserSignupRequest } from 'englikh-contracts';

import { useSignupMutation } from '@/entities/session/api/sessionApi.ts';
import { handleRequestError } from '@/shared/lib/handleRequestError.ts';
import { AppContext } from '@/shared/ui/AppContext';

type FormValues = Omit<UserSignupRequest, 'lastName'> & {
    lastname: string | undefined;
}

export const SignupForm: React.FC = () => {
    const nav = useNavigate();

    const [signup, { isLoading }] = useSignupMutation();
    const { messageApi } = useContext(AppContext);

    const onFinish = async (values: FormValues) => {
        const body: UserSignupRequest = {
            firstName: values.firstName,
            lastName: values.lastname ?? null,
            password: values.password,
            email: values.email,
        };
        try {
            await signup(body).unwrap();
            nav('/', { replace: true });
        } catch (error) {
            messageApi && await handleRequestError(error, messageApi);
        }
    };

    const onClick = () => {
        nav('/auth', { replace: true });
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
        >
            <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
                name="lastName"
            >
                <Input placeholder="Surname" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter the correct email!' },
                ]}
            >
                <Input placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 8, message: 'Password must be at least 8 characters long!' },
                ]}
            >
                <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button
                    style={{ width: '100%' }}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={isLoading}
                >
                    Sign up
                </Button>
                Or <a onClick={onClick}>login now!</a>
            </Form.Item>
        </Form>
    );
};
