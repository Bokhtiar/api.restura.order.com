import Schema from "async-validator";
import { NextFunction, Request, Response } from "express";

/* Resource create & update validaor */
export const OrderValidators = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const descriptor = <any>{
    name: {
      type: "string",
      required: true,
      message: "Name is required.",
    },
    email: {
      type: "string",
      required: true,
      message: "Email is required.",
    },
    phone: {
      type: "string",
      required: true,
      message: "Phone number is required.",
    },
    location: {
      type: "string",
      required: true,
      message: "Location is required.",
    },
    payment_name: {
      type: "string",
      required: true,
      message: "Payment getway name is required.",
    },
    payment_number: {
      type: "string",
      required: true,
      message: "Payment account number is required.",
    },
    payment_txid: {
      type: "string",
      required: true,
      message: "Paymeent TransectionID is required.",
    },
  };

  /* Execute the validator */
  const validator = new Schema(descriptor);

  validator.validate({ ...req.body }, (errors: any) => {
    if (errors) {
      return res.status(422).json({
        status: false,
        errors,
      });
    }
    next();
  });
};
