"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helper");
const permission_service_1 = require("../services/admin/permission.service");
const adminPermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const api_key = req.headers.api_key;
        const token = yield req.headers.authorization;
        if (!token) {
            return res.status(404).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "access-token",
                        message: "Authorization token not found.",
                    },
                ],
            }));
        }
        const generatedHeader = yield (0, helper_1.getHeader)(api_key, token);
        /* verify token */
        const verifiedResponse = yield permission_service_1.adminPermissionService.verifyAdminToken(generatedHeader);
        if (verifiedResponse && verifiedResponse.status === 200) {
            req.user = {
                id: verifiedResponse.data.data.id,
                name: verifiedResponse.data.data.name,
                role: verifiedResponse.data.data.role,
            };
            next();
            return;
        }
    }
    catch (error) {
        if (error) {
            return res.status(error.response.status).json(yield (0, helper_1.HttpErrorResponse)({
                status: error.response.data.status,
                errors: [...error.response.data.errors],
            }));
        }
    }
});
// import { NextFunction, Request, Response } from "express";
// const jwt = require("jsonwebtoken");
// /* user permission handle */
// export const userPermission = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token: any = await req.headers.authorization;
//     if (!token) {
//       return res.status(404).json({
//         status: false,
//         message: "Authorization token not found.",
//       });
//     }
//     // decode token
//     const splitToken = await token.split(" ")[1];
//     const decode = await jwt.verify(splitToken, process.env.JWT_SECRET);
//     if (decode.role !== "user") {
//       return res.status(410).json({
//         status: false,
//         errors: { message: "You have no permission to access." },
//       });
//     }
//     const user = {
//       id: decode.id,
//       name: decode.name,
//       role: decode.role,
//     };
//     req.user = user;
//     next();
//     return;
//   } catch (error: any) {
//     if (error) {
//       res.status(404).json({
//         status:true,
//         message: "Token expaired."
//       })
//       // return res.status(error.response.status).json({
//       //   status: error.response.data.status,
//       //   errors: [...error.response.data.errors],
//       // });
//     }
//   }
// };
