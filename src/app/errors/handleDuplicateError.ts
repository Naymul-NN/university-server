// import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err:any): TGenericErrorResponse => {
const match = err.message.match(/"([^"]*)"/);
const extracted_msg = match && match[1];
    const errorSourse: TErrorSource = [
        {
            path: '',
            message: `${extracted_msg} is already exists`,
        }
    ]

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid id',
        errorSourse

    }
}
export default handleDuplicateError;