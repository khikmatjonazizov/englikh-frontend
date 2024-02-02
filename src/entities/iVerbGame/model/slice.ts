import {createSlice,} from "@reduxjs/toolkit";

import {IVerbGameStore, UpdateSettingsAction} from './types.ts'
import {getIVerbsByPage} from "../lib/getIVerbsByPage.ts";

export const initialState: IVerbGameStore = {
    settings: {
        page: '1',
        control: 'input',
        missing_forms_count: 1,
        isRealTimeSettings: false,
    },
    progress: {
        correct_answers_count: 0,
        incorrect_answers_count: 0,
        is_game_over: false,
    },
    current: null,
    history: [],
    unused_i_verbs: getIVerbsByPage('1'),
}

export const IVerbGameSlice = createSlice({
    name: 'i_verb_game',
    initialState,
    reducers: {
        UPDATE_I_VERB_GAME: (state, {payload}: UpdateSettingsAction) => {
            let unused_i_verbs = payload.unused_i_verbs ?? state.unused_i_verbs

            if(payload.settings?.page && payload.settings.page !== state.settings.page) {
                unused_i_verbs = getIVerbsByPage(payload.settings.page)
            }

            return {...state, ...payload, unused_i_verbs}
        },
        RESET_I_VERB_GAME: (state) => {
            const unused_i_verbs = getIVerbsByPage(state.settings.page)

            state.current = null;
            state.unused_i_verbs = unused_i_verbs;
            state.history = [];
            state.progress = {
                is_game_over: false,
                incorrect_answers_count: 0,
                correct_answers_count: 0,
            }
        }
    }
})

export const {
    UPDATE_I_VERB_GAME,
    RESET_I_VERB_GAME,
} = IVerbGameSlice.actions
