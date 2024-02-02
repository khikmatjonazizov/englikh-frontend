import {PayloadAction} from "@reduxjs/toolkit";
import {z} from 'zod'

// commons
export type IVerbType = {
    v1: string[];
    v2: string[];
    v3: string[];
}

export type DisplayedIVerb = {
    v1?: string[] | null;
    v2?: string[] | null;
    v3?: string[] | null;
}

export type UserAnswer = {
    v1?: string;
    v2?: string;
    v3?: string;
}


// action
export type UpdateSettingsAction = PayloadAction<Partial<IVerbGameStore>>


// store
export interface IVerbGameStore {
    settings: IVerbGameStoreSettings;
    progress: IVerbGameStoreProgress;
    current: IVerbGameStoreCurrent | null;
    history: IVerbGameStoreHistory[];
    unused_i_verbs: IVerbType[];
}

export const IVerbGameStoreSettingsSchema = z.object({
    page: z.union([z.literal('1'), z.literal('2'), z.literal('all')]),
    control: z.union([z.literal('input'), z.literal('button')]),
    missing_forms_count: z.union([z.literal(1), z.literal(2)]),
    isRealTimeSettings: z.boolean(),
})

type IVerbGameStoreSettings = z.infer<typeof IVerbGameStoreSettingsSchema>

type IVerbGameStoreProgress = {
    correct_answers_count: number;
    incorrect_answers_count: number;
    is_game_over: boolean;
}

export type IVerbGameStoreCurrent = {
    i_verb: IVerbType;
    displayed_i_verb: DisplayedIVerb;
}

type IVerbGameStoreHistory = {
    i_verb: IVerbType;
    displayed_i_verb: DisplayedIVerb;
    user_answer: UserAnswer;
    answered_time: Date;
    is_correct: boolean;
}
