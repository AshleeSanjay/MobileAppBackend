/* eslint-disable prettier/prettier */
import express, { Request, Response } from "express";

import { BaseController } from "./base_controller";

export class HomeController implements BaseController {
    public basePath = "/";
    
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initialzeRoutes();
    }

    private async initialzeRoutes() {
         this.router.get(this.basePath, this.index);
    }

     private async index(request: Request, response: Response) {
         response.send("Hello World");
     }
}
