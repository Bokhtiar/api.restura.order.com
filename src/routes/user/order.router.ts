import { Router } from "express";
import * as orderController from "../../controller/user/order.controller";
import { OrderValidators } from "../../validators/order.validators";

export const orderRouter: Router = Router();

orderRouter.get("/", orderController.index);
orderRouter.post("/", OrderValidators, orderController.store);
orderRouter.get("/:id", orderController.show);
  