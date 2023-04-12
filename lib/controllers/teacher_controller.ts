/* eslint-disable prettier/prettier */
import express, { Request, Response } from "express";

import { BaseController } from "./base_controller";
import { dbSchoolApp } from "../../app";

export class TeacherController implements BaseController {
    public basePath = "/Teacher";
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initialzeRoutes();
    }

    private async initialzeRoutes() {
        // this.router.get(`${this.basePath}/enroll`, this.enroll);
        this.router.post(`${this.basePath}/enroll`, this.enroll);
        this.router.get(`${this.basePath}/profile`, this.profile);
    }
    private async enroll(request: Request, response: Response) {
        try {
            await dbSchoolApp.collection("teacher").insertOne({
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
            response.send("Enroll Teacher");
        } catch (error) {
            // console.log(error);
            response.status(500).send({ error: `${error}` });
        }
    }
    private async profile(request: Request, response: Response) {
        try {
            console.log("Profile");
            const cursor = await dbSchoolApp.collection("teacher").findOne({
                name: request.query.name,
            });
            return response.json(cursor);
            console.log(response.json(cursor));
        } catch (error) {
            response.status(500).send({ error: `${error}` });
        }

        console.log(request.query);
        response.send("Teacher Profile");
    }
}
