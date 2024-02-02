import React from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";

import style from './home.module.css';

export const Home: React.FC = () => {
    return (
        <main className={style.main}>
            <Link to="irregular-verb" className={style.link}>
                <Button type="primary" size="large">
                    Irregular verbs
                </Button>
            </Link>
            {/*<Link to="vocabulary" className={style.link}>*/}
            {/*    <Button type="primary" size="large">*/}
            {/*        Vocabulary*/}
            {/*    </Button>*/}
            {/*</Link>*/}
        </main>
    )
}
