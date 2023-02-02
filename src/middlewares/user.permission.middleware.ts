import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse, getHeader } from "../helper";
import { adminPermissionService } from "../services/admin/permission.service";


const adminPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const api_key: any = req.headers.api_key;
    const token: any = await req.headers.authorization;
    if (!token) {
      return res.status(404).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "access-token",
              message: "Authorization token not found.",
            },
          ],
        })
      );
    }

    const generatedHeader = await getHeader(api_key, token);
 
    /* verify token */
    const verifiedResponse = await adminPermissionService.verifyAdminToken(
      generatedHeader
    );

    if (verifiedResponse && verifiedResponse.status === 200) {
      req.user = {
        id: verifiedResponse.data.data.id,
        name: verifiedResponse.data.data.name,
        role: verifiedResponse.data.data.role,
      };
      next();
      return;
    }
  } catch (error: any) {
    if (error) {
      return res.status(error.response.status).json(
        await HttpErrorResponse({
          status: error.response.data.status,
          errors: [...error.response.data.errors],
        })
      );
    }
  }
};



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