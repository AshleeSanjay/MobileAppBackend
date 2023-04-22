/* eslint-disable prettier/prettier */
import express, { Request, Response } from "express";

import { BaseController } from "./base_controller";
import { dbSchoolApp } from "../../app";
import { authorizationMiddleware } from "./middlewares/authorizationMiddleware";

export class TeacherController implements BaseController {
    public basePath = "/Teacher";
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initialzeRoutes();
    }

    private async initialzeRoutes() {
        this.router.post(`${this.basePath}/enroll`, this.enroll);
        this.router.use(`${this.basePath}/profile`, authorizationMiddleware);
        this.router.get(`${this.basePath}/profile`, this.profile);
    }
    private async enroll(request: Request, response: Response) {
        try {
            console.log("DB connected");
            await dbSchoolApp.collection("teacher").insertOne({
                name: request.body.name,
                cognitoId: request.body.cognitoId,
                email: request.body.email,
                mobile: request.body.mobile,
                userType: request.body.userType,
            });
            console.log(
                request.query,
                "Dd collection: ",
                dbSchoolApp.databaseName
            );
            response.send("Enroll Teacher");
        } catch (error) {
            console.log(error);
            response.status(500).send({ error: `${error}` });
        }
    }
    private async profile(request: Request, response: Response) {
        try {
            console.log("Profile");
            const cursor = await dbSchoolApp.collection("teacher").findOne({
                email: request.query.email,
            });
            console.log(cursor);
            response.send(cursor);
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
    }
}
