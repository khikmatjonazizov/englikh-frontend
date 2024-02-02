import {PayloadAction} from "@reduxjs/toolkit";

type ErrorTypes = 'incorrect_search_query' | 'internal_application_error';

export type AppSliceStore = {
    errorType: ErrorTypes | null;
}

export type UpdateAppAction = PayloadAction<Partial<AppSliceStore>>
