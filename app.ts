import express from "express";
import { decode } from "html-entities";
import { BaseController } from "./lib/controllers/base_controller";
import { Db, MongoClient } from "mongodb";
import { IS_DEV, MONGO_CONNECTION_URI, NODE_ENV } from "./constants";
import path from "path";

import {
    init,
    create,
    database,
    config,
    up,
    down,
    status,
} from "migrate-mongo";

import cors from "cors";

const filePaths = {
    terms: IS_DEV
        ? "/public/privacy-policy.html"
        : "../public/terms-condition.html",
    privacyPolicy: IS_DEV
        ? "/public/privacy-policy.html"
        : "../public/privacy-policy.html",
} as const;

export let dbSchoolApp: Db;
export class App {
    public port: string;
    public app: express.Application;

    constructor(port: string, controllers: BaseController[]) {
        this.port = port;
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private async initializeMiddlewares() {
        this.app.use(
            express.json({
                limit: "1MB",
                type: "application/json",
            }) as express.RequestHandler
        );
        this.app.use((req, res, next) => {
            req.body = JSON.parse(decode(JSON.stringify(req.body)));
            next();
        });
        this.app.use(cors());
    }

    private async initializeControllers(controllers: BaseController[]) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }

    public async listen() {
        if (IS_DEV) {
            console.log("connection");
            const { db, client } = await database.connect();
            console.log("migration started", MONGO_CONNECTION_URI);

            await up(db, client);
            await client.close();
            console.log("migration successful");
        }

        const connectionString = MONGO_CONNECTION_URI;
        const mongoClient = new MongoClient(connectionString);
        await mongoClient.connect().catch((err) => {
            console.log(err);
            mongoClient.close();
        });

        console.log("SUCCESS! connected to Mongo");
        dbSchoolApp = mongoClient.db("dev-schoolmobapp");

        this.app.get("/privacy-policy", (_, res) => {
            console.log(__dirname);
            return res.sendFile(path.join(__dirname, filePaths.privacyPolicy));
        });
        this.app.get("/terms-conditions", (_, res) => {
            console.log(__dirname);
            return res.sendFile(path.join(__dirname, filePaths.terms));
        });
        this.app.get("/health", (_, res) => {
            return res.json({ status: "OK", uptime: process.uptime() });
        });
        this.app.get("/", (_, res) => {
            return res.json({ foo: "bazz" });
        });

        this.app.listen(this.port, () => {
            console.log(
                `Server started at port ${this.port} in ${NODE_ENV} mode`
            );
        });
    }
}
