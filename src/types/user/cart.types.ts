import { Types } from 'mongoose'

export interface ICart {
    _id: Types.ObjectId,
    user: Types.ObjectId,
    product: Types.ObjectId,
    order?: Types.ObjectId,
    quantity?: number,
}

export interface ICartCreate {
    user: Types.ObjectId,
    product: Types.ObjectId,
    quantity?: number,
}