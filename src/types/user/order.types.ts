import { Types } from "mongoose";

export interface IOrder {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  phone: number;
  email: string;
  location: string;
  note?: string;
  payment_name: string;
  payment_number: number;
  payment_txid: string;
}

export interface IOrderCreate {
  user: Types.ObjectId;
  name: string;
  phone: number;
  email: string;
  location: string;
  note?: string;
  payment_name: string;
  payment_number: number;
  payment_txid: string;
}
