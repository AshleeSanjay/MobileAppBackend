import express, { Request, Response } from "express";

export interface BaseController {
    router: express.Router;
    basePath: string;
}
