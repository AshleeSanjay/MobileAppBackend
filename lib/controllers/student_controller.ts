/* eslint-disable prettier/prettier */
import express, { Request, Response } from "express";

import { BaseController } from "./base_controller";
import { dbSchoolApp } from "../../app";
import { authorizationMiddleware } from "./middlewares/authorizationMiddleware";

export class StudentController implements BaseController {
    public basePath = "/Student";
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
            await dbSchoolApp.collection("student").insertOne({
                name: request.body.name,
                email: request.body.email,
                mobile: request.body.mobile,
                password: request.body.password,
                userType: request.body.userType,
            });
            console.log(
                request.query,
                "Dd collection: ",
                dbSchoolApp.databaseName
            );
            response.send("Enroll Student");
        } catch (error) {
            response.status(500).send({ error: `${error}` });
        }
    }
    private async profile(request: Request, response: Response) {
        try {
            console.log("Student Profile");
            const cursor = await dbSchoolApp.collection("student").findOne({
                email: request.query.email,
            });
            console.log(cursor);
            response.send(cursor);
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
        // console.log(request.query);
        // response.send("Student Profile");
    }
}
