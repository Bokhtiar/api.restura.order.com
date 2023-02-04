import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { getHeader, getHeaderWithoutToken } from "../../helper";
import { axiosRequest } from "../../config/axios.config";
import { cartService } from "../../services/user/cart.services";
import { IHeader } from "../../types/index.types";

/* specidic user find all cart */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const api_key: any = req.headers.api_key;
    const token: any = await req.headers.authorization;

    /* generate http request header */
    // const generatedHeader = await getHeader(api_key, token);
    const generatedHeader = await getHeaderWithoutToken(api_key);

    const items = [];

    const results = await cartService.findAll({ _id: new Types.ObjectId(id) });
    const countCart = await cartService.CountDocument({
      _id: new Types.ObjectId(id),
    });

    const getProduct = async (id: any) => {
      let product = await axiosRequest.get(
        `/api/v1/product/${id}`,
        generatedHeader
      )
      return product.data.data;
    }


    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      items.push({
        _id: element._id,
        product: await getProduct(element.product),
        quantity: element.quantity
      });
    }

    res.status(200).json({
      status: true,
      data: items,
      countCart: countCart,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* store documents */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; //product id
    const userID = req.user.id;
    console.log("user", userID);

    const result = await cartService.addToCart({
      user_id: new Types.ObjectId(userID),
      product_id: new Types.ObjectId(id),
    });

    res.status(201).json({
      status: true,
      data: result,
      message: "Cart added",
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const increment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await cartService.CartIncrement({ _id: new Types.ObjectId(id) });
    res.status(201).json({
      status: true,
      message: "Cart quantity increment",
    });
  } catch (error: any) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

export const decrement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await cartService.CartDecrement({ _id: new Types.ObjectId(id) });
    res.status(201).json({
      status: true,
      message: "Cart quantity decrement",
    });
  } catch (error: any) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

/* destory */
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await cartService.CartDestroy({ _id: new Types.ObjectId(id) });
    res.status(200).json({
      status: true,
      message: "Cart deleted",
    });
  } catch (error: any) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};
