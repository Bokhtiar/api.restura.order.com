import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { IOrderCreate } from "../../types/user/order.types";
import { cartService } from "../../services/user/cart.services";
import { userOrderService } from "../../services/user/order.services";
import { getHeaderWithoutToken, getHeader } from "../../helper";
import { axiosProductRequest, axiosAuthRequest } from "../../config/axios.config";

/* find all order for specific user */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = req.user.id;
    const api_key :any = req.headers.api_key
    const token: any = await req.headers.authorization;
    const items = [];
    const generatedHeader = await getHeader(api_key, token);
    
    const results = await userOrderService.findAll({
      _id: new Types.ObjectId(userID),
    });

    const getUser = async() => {
      const data = await axiosAuthRequest.get(`/api/v1/user/me`, generatedHeader)
      return data.data.data
    }
 
    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      items.push({
        _id : element._id,
        user : await getUser(),
        name: element.name,
        email: element.email,
        phone: element.phone,
        note: element.note,
        payment_name: element.payment_name,
        payment_number: element.payment_number,
        payment_txid: element.payment_txid
      })
    }

    res.status(200).json({
      status: true,
      data: items,
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
    const api_key: any = req.headers.api_key;
    const generatedHeader = await getHeaderWithoutToken(api_key);

    const items = [];
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

    const getProduct = async (id: any) => {
      let product = await axiosProductRequest.get(
        `/api/v1/product/${id}`,
        generatedHeader
      )
      return product.data.data;
    }

    for (let i = 0; i < cartItems.length; i++) {
      const element = cartItems[i];
      items.push({
        _id: element._id,
        product: await getProduct(element.product),
        quantity: element.quantity
      });
    }

    res.status(200).json({
      status: true,
      data: { "Order": orderDocuments, "Cart": items },
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
