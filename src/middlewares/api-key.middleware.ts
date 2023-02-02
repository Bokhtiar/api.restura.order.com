import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../helper";
import { IAPIKeys } from "../types/index.types";
import data from "../json-data/api-key.json";

/* API key checker middleware */
export const ValidXAPIKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.headers.api_key;

    /* Header validation */
    if (!key) {
      return res.status(422).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "api_key",
              message: "API key not found.",
            },
          ],
        })
      );
    }

    /* Match key with JSON keys */
    const isMatchedKey = await data.find((item: IAPIKeys) => item.key === key);
    if (!isMatchedKey) {
      return res.status(404).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "api_key",
              message: "API key isn't correct.",
            },
          ],
        })
      );
    }

    next();
  } catch (error: any) {
    if (error) {
      res.status(500).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "server-error",
              message: "Internal server error.",
            },
          ],
        })
      );
    }
  }
};
