import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'
import { cartService } from '../../services/user/cart.services'
 

/* specidic user find all cart */
export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user
        const results = await cartService.findAll({ _id: new Types.ObjectId(id) })
        const countCart = await cartService.CountDocument({ _id: new Types.ObjectId(id) })
        res.status(200).json({
            status: true, 
            data: results,
            countCart: countCart
        })
    } catch (error: any) {
        console.log(error);
        next(error)
    }
}
 
/* store documents */
export const store = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params //product id
        const userID = req.user.id
        console.log("user", userID);

        const result = await cartService.addToCart({ user_id: new Types.ObjectId(userID), product_id: new Types.ObjectId(id) })

        res.status(201).json({
            status: true,
            data: result,
            message: "Cart added"
        })
    } catch (error: any) {
        console.log(error);
        next(error)
    }
}

export const increment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await cartService.CartIncrement({ _id: new Types.ObjectId(id) })
        res.status(201).json({
            status: true,
            message: "Cart quantity increment"
        })

    } catch (error: any) {
        if (error) {
            console.log(error);
            next(error)

        }
    }
}

export const decrement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await cartService.CartDecrement({ _id: new Types.ObjectId(id) })
        res.status(201).json({
            status: true,
            message: "Cart quantity decrement"
        })
    } catch (error: any) {
        if (error) {
            console.log(error);
            next(error)
        }
    }
}

/* destory */
export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await cartService.CartDestroy({ _id: new Types.ObjectId(id) })
        res.status(200).json({
            status: true,
            message: "Cart deleted"
        })
    } catch (error: any) {
        if (error) {
            console.log(error);
            next(error)
        }
    }
}