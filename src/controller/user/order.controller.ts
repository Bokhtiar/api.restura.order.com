import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { IOrderCreate } from "../../types/user/order.types";
import { cartService } from "../../services/user/cart.services";
import { userOrderService } from "../../services/user/order.services";

/* find all order for specific user */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.user.id;
    const results = await userOrderService.findAll({
      _id: new Types.ObjectId(userID),
    });

    res.status(200).json({
      status: true,
      data: results,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* create new documents */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.user.id;

    /* available cart */
    const availableCart = await cartService.findAll({
      _id: new Types.ObjectId(userID),
    });
    console.log("cc", availableCart);
    if (availableCart.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Add to cart not available",
      });
    }

    const {
      name,
      email,
      phone,
      location,
      note,
      payment_name,
      payment_number,
      payment_txid,
    } = req.body;
    const documents: IOrderCreate = {
      user: new Types.ObjectId(userID),
      name,
      email,
      phone,
      location,
      note,
      payment_name,
      payment_number,
      payment_txid,
    };
    await userOrderService.orderCreate({
      userID: new Types.ObjectId(userID),
      documents: { ...documents },
    });

    res.status(200).json({
      status: true,
      data: "Order created",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* find specific order details */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userID = req.user.id;

    /* order details info */
    const orderDocuments = await userOrderService.findOneById({
      _id: new Types.ObjectId(id),
      user_id: new Types.ObjectId(userID),
    });

    /* order cart items */
    const cartItems = await userOrderService.orderCartItems({
      user_id: new Types.ObjectId(userID),
      order_id: new Types.ObjectId(id),
    });
    res.status(200).json({
      status: true,
      data: { "Order":orderDocuments, "Cart":cartItems },
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
