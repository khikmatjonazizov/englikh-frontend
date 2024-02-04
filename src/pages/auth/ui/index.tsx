import React from 'react';
import { useSearchParams } from 'react-router-dom';

import style from './auth.module.css';
import { SignupForm } from '@/features/auth/signup/ui/signupForm.tsx';
import { LoginForm } from '@/features/auth/login/ui/loginForm.tsx';

export const AuthPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const isSignup = searchParams.get('signup') === 'true';

    return (
        <div className={style.container}>
            <h1 className={style.title}>{isSignup ? 'Sign up' : 'Log in'}</h1>
            {
                isSignup ?
                    <SignupForm /> :
                    <LoginForm />
            }
        </div>
    );
};
