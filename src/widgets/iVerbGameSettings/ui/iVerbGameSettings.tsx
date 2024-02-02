import React, {useEffect, useState} from "react";
import {Drawer, Space} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";

import styles from "./iVerbGameSettings.module.css";

import {useMobile, useAppDispatch, useAppSelector} from "@/shared/model/hooks";

import {SaveFinalSettings} from "@/features/iVerbGameSettings/saveFinalSettings";
import {UpdatePageSetting} from "@/features/iVerbGameSettings/updatePageSetting";
import {UpdateControlSetting} from "@/features/iVerbGameSettings/updateControlSetting";
import {UpdateMissingFormsCountSetting} from "@/features/iVerbGameSettings/updateMissingFormsCountSetting";

import {UPDATE_I_VERB_GAME, initialState} from "@/entities/iVerbGame/model/slice.ts";
import {IVerbGameStore, IVerbGameStoreSettingsSchema} from "@/entities/iVerbGame/model/types.ts";
import {UPDATE_APP} from "@/entities/app/model/slice.ts";

interface IVerbGameSettingsProps {
    open: boolean;
    onClose: () => void;
}

export const IVerbGameSettings: React.FC<IVerbGameSettingsProps> = (props) => {
    const {open, onClose} = props;
    const [searchParams] = useSearchParams()
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const {settings} =
        useAppSelector(state => state.i_verb_game)

    const {isMobile} = useMobile()

    const [temporarySettings, setTemporarySettings] =
        useState<IVerbGameStore['settings']>(initialState.settings)

    const onChangeTemporaryPage = (page: IVerbGameStore['settings']["page"]) => {
        setTemporarySettings(prevState => ({...prevState, page}))
    }

    const onChangeTemporaryControl = (control: IVerbGameStore['settings']['control']) => {
        setTemporarySettings(prevState => ({...prevState, control}))
    }

    const onChangeTemporaryMissionFormsCount = (missionFormsCount: IVerbGameStore['settings']['missing_forms_count']) => {
        setTemporarySettings(prevState => ({...prevState, missing_forms_count: missionFormsCount}))
    }

    const onReset = () => {
        setTemporarySettings({...initialState.settings, isRealTimeSettings: true})
        onClose()
    }

    const onCancel = () => {
        onClose()
        setTemporarySettings(settings)
    }

    useEffect(() => {
        const pageFromSP = searchParams.get('page')
        const controlFromSP = searchParams.get('control')
        const missingFormsCountFromSP = searchParams.get('missing_forms_count')

        const {page, control, missing_forms_count} = initialState.settings;

        const newSettings = {
            page: pageFromSP ? pageFromSP : page,
            control: controlFromSP ? controlFromSP : control,
            missing_forms_count: missingFormsCountFromSP ? Number(missingFormsCountFromSP) : missing_forms_count,
            isRealTimeSettings: true,
        }

        const res = IVerbGameStoreSettingsSchema.safeParse(newSettings)

        if (res.success) {
            dispatch(UPDATE_I_VERB_GAME({settings: res.data}))
            setTemporarySettings(res.data)
        } else {
            console.log('error')
            dispatch(UPDATE_APP({errorType: 'incorrect_search_query'}))
            nav('/error', {
                replace: true,
            })
        }


    }, [searchParams, dispatch, nav])

    return (
        <Drawer
            open={open}
            placement={isMobile ? 'bottom' : 'right'}
            onClose={onCancel}
            title={<span className={styles.drawer_title}>Settings</span>}
            footer={
                <SaveFinalSettings
                    temporarySettings={temporarySettings}
                    onReset={onReset}
                    onClose={onClose}
                />
            }
        >
            <Space direction="vertical" style={{gap: '30px'}}>
                <UpdatePageSetting
                    temporaryPage={temporarySettings.page}
                    onChange={onChangeTemporaryPage}
                />
                <UpdateControlSetting
                    temporaryControl={temporarySettings.control}
                    onChange={onChangeTemporaryControl}
                />
                <UpdateMissingFormsCountSetting
                    temporaryMissingFormsCount={temporarySettings.missing_forms_count}
                    onChange={onChangeTemporaryMissionFormsCount}
                />
            </Space>
        </Drawer>
    )
}
