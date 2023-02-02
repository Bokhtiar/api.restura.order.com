import { Router } from "express";
import { userPermission } from "../middlewares/user.permission.middleware";
import { cartRouter } from "./user/cart.router";

  
export const router: Router = Router();

router.use("/cart", userPermission, cartRouter)


  