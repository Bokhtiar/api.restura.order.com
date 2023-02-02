import { Router } from "express";
import * as cartController from "../../controller/user/cart.controller";
export const cartRouter: Router = Router();
 
cartRouter.get("/", cartController.index);
cartRouter.post("/:id", cartController.store);
cartRouter.put("/increment/:id", cartController.increment);
cartRouter.put("/decrement/:id", cartController.decrement);
cartRouter.delete("/destroy/:id", cartController.destroy);