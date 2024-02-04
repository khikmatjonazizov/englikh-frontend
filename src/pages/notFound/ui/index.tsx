import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

import style from './notFound.module.css'

export const NotFound: React.FC = () => {
    return (
        <div className={style.container}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Link to="/">
                        <Button type="primary">Back Home</Button>
                    </Link>
                }
            />
        </div>
    );
};
