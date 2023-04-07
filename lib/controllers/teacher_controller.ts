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
        this.router.get(`${this.basePath}/enroll`, this.enroll);
        this.router.get(`${this.basePath}/me`, this.me);
    }
    private async enroll(request: Request, response: Response) {
        dbSchoolApp.collection("teacher").insertOne({
            name: request.query.name,
            email: request.query.email,
        });
        console.log(request.query, "Dd collection: ", dbSchoolApp.databaseName);
        response.send("Enroll Teacher");
    }
    private async me(request: Request, response: Response) {
        console.log(request.query);
        response.send("Profile");
    }
}
