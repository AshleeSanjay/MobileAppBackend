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
        this.router.get(`${this.basePath}/`, this.status);
        this.router.post(`${this.basePath}/enroll`, this.enroll);
        this.router.use(`${this.basePath}/profile`, authorizationMiddleware);
        this.router.get(`${this.basePath}/profile`, this.profile);
        this.router.patch(
            `${this.basePath}/updateTeacherDetail`,
            this.updateTeacherDetail
        );
    }
    private async status(request: Request, response: Response) {
        response.send({ message: "Welcome to School MS" });
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
    private async updateTeacherDetail(request: Request, response: Response) {
        try {
            const { MongoClient, ObjectId } = require("mongodb");
            console.log("Update profile: ", request.query.teacherId);
            const cursor = await dbSchoolApp.collection("teacher").updateOne(
                { cognitoId: request.query.teacherId },
                {
                    $set: {
                        name: request.body.name,
                        mobile: request.body.mobile,
                    },
                }
            );
            response.json({ status: 200 });
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
    }
}
