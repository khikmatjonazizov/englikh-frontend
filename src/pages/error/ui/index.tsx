import React from "react";
import {useAppSelector} from "@/shared/model/hooks";
import {IncorrectSearchQueriesResult} from "@/widgets/incorrectSearchQueriesResult";
import {UnknownResult} from "@/widgets/unknownResult";
import {InternalApplicationErrorResult} from "@/widgets/internalApplicationErrorResult";

export const Error: React.FC = () => {
    const { errorType } = useAppSelector(state => state.app)

    switch (errorType) {
        case 'incorrect_search_query': return <IncorrectSearchQueriesResult />
        case 'internal_application_error': return <InternalApplicationErrorResult />
    }


    return (
        <UnknownResult />
    )
}
