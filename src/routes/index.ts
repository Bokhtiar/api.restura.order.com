import { Router } from "express";
import { userPermission } from "../middlewares/user.permission.middleware";
import { cartRouter } from "./user/cart.router";
import { orderRouter } from "./user/order.router";

  
export const router: Router = Router();

router.use("/cart", userPermission, cartRouter)
router.use("/order", userPermission, orderRouter)


   