import { Types } from 'mongoose'
import { Cart } from '../../models/cart.models'
import { ICart } from '../../types/user/cart.types'


/* sepecific user count cart list */
const CountDocument = async ({ _id }: { _id: Types.ObjectId }): Promise<number> => {
    return Cart.countDocuments({ user: _id, order: null })
}

/* specific user find cart */
const findAll = async ({ _id }: { _id: Types.ObjectId }): Promise<ICart[] | []> => {
    return await Cart.find({ user: _id, order: null })
}

/* cart store documents */
const addToCart = async ({ product_id, user_id }: { product_id: Types.ObjectId, user_id: Types.ObjectId }): Promise<ICart | null> => {
    /* find one cart already exist */
    const existCart = await Cart.findOne({ user: user_id, product: product_id, order: null })
    if (existCart) {
        let existQty: any;
        existQty = existCart.quantity
        return await Cart.findByIdAndUpdate(existCart._id, { $set: { quantity: existQty + 1 } })
    } else {
        const newCart = new Cart({
            user: user_id,
            product: product_id
        })
        return await newCart.save()
    }
}


/* cart increment */
const CartIncrement = async ({ _id }: { _id: Types.ObjectId }): Promise<ICart | null> => {
    const existCart: any = await Cart.findOne({ _id: _id })
    console.log("exist cart", existCart.quantity);

    let existQty: number
    existQty = existCart.quantity
    return await Cart.findByIdAndUpdate(_id, { $set: { quantity: existQty + 1 } })
}

const CartDecrement = async ({ _id }: { _id: Types.ObjectId }): Promise<ICart | null> => {
    const existCart: any = await Cart.findOne({ _id: _id })
    let existQty: number
    existQty = existCart.quantity
    return await Cart.findByIdAndUpdate(_id, { $set: { quantity: existQty - 1 } })
}

const CartDestroy = async ({ _id }: { _id: Types.ObjectId }): Promise<ICart | null> => {
    return await Cart.findByIdAndDelete({ _id })
}

export const cartService = {
    CountDocument,
    findAll,
    addToCart,
    CartIncrement,
    CartDecrement,
    CartDestroy
}