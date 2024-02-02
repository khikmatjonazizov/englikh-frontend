import React, {useState} from "react";
import {SettingOutlined} from "@ant-design/icons";

import styles from './iVerb.module.css'
import {IVerbGameSettings} from "@/widgets/iVerbGameSettings";
import {IVerbGame} from "@/widgets/iVerbGame";

export const IVerb: React.FC = () => {
    const [open, setOpen] = useState(false)
    const handleDrawer = (mode: 'open' | 'close') => {
        setOpen(mode === 'open')
    }

    return (
        <>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className={styles.header_prefix}></div>
                    <h1 className={styles.header_title}>Irregular verbs</h1>
                    <div className={styles.header_postfix} onClick={() => handleDrawer('open')}>
                        <SettingOutlined style={{fontSize: '20px'}}/>
                    </div>
                </header>
                <main className={styles.main}>
                    <IVerbGame />
                </main>
                <IVerbGameSettings open={open} onClose={() => handleDrawer('close')}/>
            </div>
        </>
    )
}
