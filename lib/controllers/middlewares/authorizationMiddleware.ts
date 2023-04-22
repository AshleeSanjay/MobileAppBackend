import { Request, Response, NextFunction } from "express";
import { CognitoJwtVerifier } from "aws-jwt-verify";

export const authorizationMiddleware = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("Login Middleware");
    let token: any;
    {
        try {
            // console.log("Header: ", req.headers);
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")
            ) {
                token = req.headers.authorization.split("Bearer ")[1];
                // Verifier that expects valid access tokens:
                const verifier = CognitoJwtVerifier.create({
                    userPoolId: "ca-central-1_TcO2k8LH0",
                    tokenUse: "id",
                    clientId: "5800bec2c5f46bevgl3rau4ijt",
                });
                const payload = await verifier
                    .verify(
                        token // the JWT as string
                    )
                    .catch((err) => {
                        throw err;
                    });
                // console.log("Token: ", JSON.stringify(token));
            }
            next();
        } catch (err) {
            res.status(401);
            console.log("Error: ", err);
            res.send("Not Authorized");
            //throw new Error("Not Authorized, token failed");
        }
    }
};
