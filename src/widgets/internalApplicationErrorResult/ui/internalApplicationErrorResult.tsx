import React from "react";
import {Button, Result} from "antd";
import {Link} from "react-router-dom";
import {UPDATE_APP} from "@/entities/app/model/slice.ts";
import {useAppDispatch} from "@/shared/model/hooks";

export const InternalApplicationErrorResult: React.FC = () => {
    const dispatch = useAppDispatch();

    return (
        <Result
            status="error"
            title="Internal application error"
            subTitle="Please restart the application using the button below, if it does not help, try again after"
            extra={
                <Link to="/" onClick={() => dispatch(UPDATE_APP({errorType: null}))}>
                    <Button type="primary">
                        Restart
                    </Button>
                </Link>
            }
        />
    )
}
