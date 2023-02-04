import { Types } from "mongoose";
import { Cart } from "../../models/cart.models";
import { Order } from "../../models/order.models";
import { ICart } from "../../types/user/cart.types";
import { IOrder, IOrderCreate } from "../../types/user/order.types";

/* specific user find order list */
const findAll = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IOrder[] | []> => {
  return await Order.find({ user: _id });
};

/* find one by specific order */
const findOneById = async ({
  _id,
  user_id,
}: {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
}): Promise<IOrder | null> => {
  return await Order.findOne({ _id: _id, user: user_id });
};

/* create new order */
const orderCreate = async ({
  userID,
  documents,
}: {
  userID: Types.ObjectId;
  documents: IOrderCreate;
}): Promise<IOrder | null> => {
  const results = await Cart.find({ order: null, user: userID });

  /* store documents */
  const newOrder = new Order({
    user: documents.user,
    name: documents.name,
    email: documents.email,
    phone: documents.phone,
    location: documents.location,
    note: documents.note,
    payment_name: documents.payment_name,
    payment_number: documents.payment_number,
    payment_txid: documents.payment_txid,
  });

  /* find by cart item, each cart item push order_id */
  if (newOrder) {
    results.forEach((element) => {
      element.order = newOrder._id;
      element.save();
    });
  }
  return newOrder.save();
};

/* specific order cart items */
const orderCartItems = async ({
  user_id,
  order_id,
}: {
  user_id: Types.ObjectId;
  order_id: Types.ObjectId;
}): Promise<ICart[] | []> => {
  return await Cart.find({ user: user_id, order: order_id })
    .sort({_id: -1});
};

export const userOrderService = {
  findAll,
  orderCreate,
  findOneById,
  orderCartItems,
};
