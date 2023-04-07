/* eslint-disable prettier/prettier */
import express, { Request, Response } from "express";

import { BaseController } from "./base_controller";

export class HomeController implements BaseController {
    public basePath = "/Home";
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initialzeRoutes();
    }

    private async initialzeRoutes() {
        this.router.get(this.basePath, this.index);
        this.router.get(`${this.basePath}/teacher`, this.teacher);
    }
    private async teacher(request: Request, response: Response) {
        console.log(request.query, "test");
        response.send("Enroll Teacher");
    }
    private async index(request: Request, response: Response) {
        response.send("Hello World");
    }
}
