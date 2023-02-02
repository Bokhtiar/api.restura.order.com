import Mongoose from "mongoose";
import { IHttpErrorResponse, IHttpSuccessResponse, IHeader } from "../types/index.types";

/* Valid mongoose ID */
export const validMongooseId = (id: Mongoose.Types.ObjectId | string) => {
  return Mongoose.Types.ObjectId.isValid(id);
};  

/* Http error response */
export const HttpErrorResponse = async (
  payload: IHttpErrorResponse
): Promise<IHttpErrorResponse> => {
  return {
    status: payload.status,
    errors: [...payload.errors],
  };
};

/* Http success response */
export const HttpSuccessResponse = async (
  payload: IHttpSuccessResponse
): Promise<IHttpSuccessResponse> => {
  return {
    status: payload.status,
    message: payload.message,
    token: payload.token,
    data: payload.data,
    paginate: payload.paginate,
  };
};

/* Generate API headers */
export const getHeader = async (
  api_key: string,
  token: string
): Promise<IHeader> => {
  const header = {
    headers: {
      Authorization: token,
      api_key: api_key,
    },
  };

  return header;
};
