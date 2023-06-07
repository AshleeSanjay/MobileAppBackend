/* eslint-disable prettier/prettier */
import express, { Request, Response } from "express";

import { BaseController } from "./base_controller";
import { dbSchoolApp } from "../../app";
import { authorizationMiddleware } from "./middlewares/authorizationMiddleware";

export class AssignmentController implements BaseController {
    public basePath = "/Assignment";
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initialzeRoutes();
    }

    private async initialzeRoutes() {
        this.router.post(`${this.basePath}/addAssignment`, this.addAssignment);
        this.router.get(
            `${this.basePath}/viewTeacherAssignment`,
            this.viewTeacherAssignment
        );
        this.router.get(
            `${this.basePath}/submittedAssignmentList`,
            this.submittedAssignmentList
        );

        this.router.get(
            `${this.basePath}/viewSubmittedAssignment`,
            this.viewSubmittedAssignment
        );
        this.router.get(
            `${this.basePath}/viewAssignmentList`,
            this.viewAssignmentList
        );
        this.router.get(`${this.basePath}/viewAssignment`, this.viewAssignment);
        this.router.get(
            `${this.basePath}/viewStudentAssignment`,
            this.viewStudentAssignment
        );
        this.router.patch(
            `${this.basePath}/updateAssignment`,
            this.updateAssignment
        );
    }
    private async addAssignment(request: Request, response: Response) {
        console.log("body!!!!", request.body);
        try {
            const createdCourse = await dbSchoolApp
                .collection("assignment")
                .insertOne({
                    courseId: request.body.courseId,
                    cognitoSid: request.body.cognitoSid,
                    cognitoId: request.body.cognitoId,
                    assignmentTitle: request.body.assignmentTitle,
                    questionOne: request.body.questionOne,
                    questionTwo: request.body.questionTwo,
                    answerOne: request.body.answerOne,
                    answerTwo: request.body.answerTwo,
                });
            response.json({ id: createdCourse.insertedId });
        } catch (error) {
            response.status(500).send({ error: `${error}` });
        }
    }

    private async viewTeacherAssignment(request: Request, response: Response) {
        try {
            const { MongoClient, ObjectId } = require("mongodb");
            console.log("View Assignment", request.query.assignmentId);
            const cursor = await dbSchoolApp
                .collection("assignment")
                .find()
                .toArray();
            console.log(cursor);
            response.send(cursor);
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
    }
    private async submittedAssignmentList(
        request: Request,
        response: Response
    ) {
        try {
            console.log("Submitted Assignment List");
            const cursor = await dbSchoolApp
                .collection("assignment")
                .find({
                    cognitoSid: { $ne: "" },
                })
                .toArray();
            console.log(cursor);
            response.send(cursor);
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
    }

    private async viewSubmittedAssignment(
        request: Request,
        response: Response
    ) {
        const { MongoClient, ObjectId } = require("mongodb");
        try {
            console.log(
                "View Submitted Assignment - assignment id: ",
                request.query.assignmentId + "student Id: ",
                request.query.cognitoSid
            );
            const cursor = await dbSchoolApp.collection("assignment").findOne({
                _id: new ObjectId(request.query.assignmentId),
                cognitoSid: request.query.cognitoSid,
            });
            console.log(cursor);
            response.send(cursor);
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
    }
    private async viewAssignmentList(request: Request, response: Response) {
        const { MongoClient, ObjectId } = require("mongodb");
        try {
            console.log("View Assignment List");
            const cursor = await dbSchoolApp
                .collection("assignment")
                .find({
                    cognitoSid: request.query.cognitoSid,
                })
                .toArray();

            console.log(cursor);
            response.send(cursor);
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
    }
    private async viewAssignment(request: Request, response: Response) {
        const { MongoClient, ObjectId } = require("mongodb");
        try {
            console.log(
                "View  Assignment - assignment id: ",
                request.query.assignmentId
            );
            const cursor = await dbSchoolApp
                .collection("assignment")
                .find({
                    courseId: request.query.courseId,
                })
                .toArray();
            console.log(cursor);
            response.send(cursor);
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
    }
    private async viewStudentAssignment(request: Request, response: Response) {
        const { MongoClient, ObjectId } = require("mongodb");
        try {
            console.log(
                "View Student Assignment - assignment id: ",
                request.query.assignmentId
            );
            const cursor = await dbSchoolApp.collection("assignment").findOne({
                _id: new ObjectId(request.query.assignmentId),
            });
            console.log(cursor);
            response.send(cursor);
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
    }
    private async updateAssignment(request: Request, response: Response) {
        try {
            const { MongoClient, ObjectId } = require("mongodb");
            console.log(
                "Update assignment: ",
                request.query.assignmentId + ", SID: ",
                request.body.cognitoSid + ", Ans 1: ",
                request.body.answerOne + ", Ans 2: ",
                request.body.answerTwo
            );
            const cursor = await dbSchoolApp.collection("assignment").updateOne(
                { _id: new ObjectId(request.query.assignmentId) },
                {
                    $set: {
                        cognitoSid: request.body.cognitoSid,
                        answerOne: request.body.answerOne,
                        answerTwo: request.body.answerTwo,
                    },
                }
            );
            response.json({ status: 200 });
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
        // console.log(request.query);
        // response.send("Student Profile");
    }
}
