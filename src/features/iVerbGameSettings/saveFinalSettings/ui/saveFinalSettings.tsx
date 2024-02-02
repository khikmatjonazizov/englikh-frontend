import React, {useMemo} from "react";
import {Button} from "antd";
import {useSearchParams} from "react-router-dom";

import styles from "./saveFinalSettings.module.css";

import {createSearchParams} from "@/shared/lib/createSearchParams.ts";
import {initialState} from '@/entities/iVerbGame/model/slice.ts'
import {IVerbGameStore} from "@/entities/iVerbGame/model/types.ts";
import {useAppSelector} from "@/shared/model/hooks";

interface SaveFinalSettings {
    temporarySettings: IVerbGameStore['settings'];
    onReset: () => void;
    onClose: () => void;
}

export const SaveFinalSettings: React.FC<SaveFinalSettings> = (props) => {
    const {temporarySettings, onReset, onClose} = props;

    const {settings} = useAppSelector(state => state.i_verb_game)
    const [, setSearchParams] = useSearchParams()
    const disabled = useMemo(() => {
        let disabled = true;
        for (const key in settings) {
            if (!Object.prototype.hasOwnProperty.call(temporarySettings, key)) {
                continue
            }

            if (settings[key as keyof typeof settings] !== temporarySettings[key as keyof typeof temporarySettings]) {
                disabled = false;
                break;
            }
        }
        return disabled;
    }, [temporarySettings, settings])

    const handleSave = () => {
        const page =
            temporarySettings.page !== initialState.settings.page ? temporarySettings.page : null
        const control =
            temporarySettings.control !== initialState.settings.control ? temporarySettings.control : null
        const missing_forms_count =
            temporarySettings.missing_forms_count !== initialState.settings.missing_forms_count ? temporarySettings.missing_forms_count : null
        setSearchParams(createSearchParams({page, control, missing_forms_count}), {
            replace: true,
        })
        onClose()
    }

    const handleReset = () => {
        setSearchParams('', {
            replace: true,
        })
        onReset()
    }

    return (
        <div className={styles.wrapper}>
            <Button onClick={handleReset}>Reset</Button>
            <Button disabled={disabled} onClick={handleSave} type="primary">Save</Button>
        </div>
    )
}
