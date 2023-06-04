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
            `${this.basePath}/viewStudentCourseList`,
            this.viewStudentCourseList
        );
        this.router.get(
            `${this.basePath}/viewSubmittedAssignment`,
            this.viewSubmittedAssignment
        );
        this.router.patch(`${this.basePath}/updateCourse`, this.updateCourse);
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
    private async viewStudentCourseList(request: Request, response: Response) {
        try {
            console.log("View StudentCourse");
            const cursor = await dbSchoolApp
                .collection("course")
                .find()
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
            console.log("View Submitted Assignment");
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
    private async updateCourse(request: Request, response: Response) {
        try {
            const { MongoClient, ObjectId } = require("mongodb");
            console.log(
                "Update Course: cognitoSid - ",
                request.body.cognitoSid + ", courseId - ",
                request.query.courseId
            );
            const cursor = await dbSchoolApp
                .collection("course")
                .updateOne(
                    { _id: new ObjectId(request.query.courseId) },
                    { $set: { cognitoSid: request.body.cognitoSid } }
                );
            response.json({ status: 200 });
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
        // console.log(request.query);
        // response.send("Student Profile");
    }
}
