/* eslint-disable prettier/prettier */
import express, { Request, Response } from "express";

import { BaseController } from "./base_controller";
import { dbSchoolApp } from "../../app";
import { authorizationMiddleware } from "./middlewares/authorizationMiddleware";

export class CourseController implements BaseController {
    public basePath = "/Course";
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initialzeRoutes();
    }

    private async initialzeRoutes() {
        this.router.post(`${this.basePath}/addCourse`, this.addCourse);
        this.router.get(`${this.basePath}/viewCourse`, this.viewCourse);
    }
    private async addCourse(request: Request, response: Response) {
        try {
            await dbSchoolApp.collection("course").insertOne({
                courseId: request.body.courseId,
                cognitoSid: request.body.cognitoSid,
                cognitoId: request.body.cognitoId,
                courseName: request.body.courseName,
                courseContent: request.body.courseContent,
            });
            console.log(
                request.query,
                "Dd collection: ",
                dbSchoolApp.databaseName
            );
            response.send("Add Course");
        } catch (error) {
            response.status(500).send({ error: `${error}` });
        }
    }
    private async viewCourse(request: Request, response: Response) {
        try {
            console.log("View Course");
            const cursor = await dbSchoolApp.collection("course").findOne({
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
