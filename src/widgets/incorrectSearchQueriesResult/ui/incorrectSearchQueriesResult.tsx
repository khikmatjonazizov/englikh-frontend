import React from "react";
import {Button, Result} from "antd";
import {Link} from "react-router-dom";
import {useAppDispatch} from "@/shared/model/hooks";
import {UPDATE_APP} from "@/entities/app/model/slice.ts";

export const IncorrectSearchQueriesResult: React.FC = () => {
    const dispatch = useAppDispatch()

    return (
        <Result
            status="error"
            title="Incorrect search query"
            subTitle="Please do not change search parameters like '?page=1'"
            extra={
            <Link to="/" onClick={() => dispatch(UPDATE_APP({errorType: null}))}>
                <Button type="primary">
                    Go to home page
                </Button>
            </Link>
            }
        />
    )
}
