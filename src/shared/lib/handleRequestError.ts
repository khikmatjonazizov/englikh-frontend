import {z} from 'zod';
import {MessageInstance} from "antd/es/message/interface";

const FailedToFetchErrorSchema = z.object({
    status: z.enum(['FETCH_ERROR']),
    error: z.string(),
})

const ServerErrorSchema = z.object({
    status: z.number(),
    data: z.object({
        error: z.string(),
        message: z.string(),
        statusCode: z.number()
    })
})


const isOfflineError = (error: unknown): error is z.infer<typeof FailedToFetchErrorSchema> =>
    FailedToFetchErrorSchema.safeParse(error).success

const isServerError = (error: unknown): error is z.infer<typeof ServerErrorSchema> =>
    ServerErrorSchema.safeParse(error).success

export const handleRequestError = async (error: unknown, messageApi: MessageInstance) => {
    if (isOfflineError(error)) {
        messageApi.error('Check your internet connection and try again')
    } else if (isServerError(error)) {
        messageApi.error(error.data.message);
    }
}
