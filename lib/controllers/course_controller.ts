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
        this.router.get(
            `${this.basePath}/viewTeacherCourseList`,
            this.viewTeacherCourseList
        );
        this.router.get(
            `${this.basePath}/viewStudentCourseList`,
            this.viewStudentCourseList
        );
        this.router.get(
            `${this.basePath}/viewEnrolledCourseList`,
            this.viewEnrolledCourseList
        );
        this.router.patch(`${this.basePath}/updateCourse`, this.updateCourse);
    }
    private async addCourse(request: Request, response: Response) {
        console.log("body!!!!", request.body);
        try {
            const createdCourse = await dbSchoolApp
                .collection("course")
                .insertOne({
                    cognitoSid: request.body.cognitoSid,
                    cognitoId: request.body.cognitoId,
                    courseName: request.body.courseName,
                    courseContent: request.body.courseContent,
                    userType: request.body.userType,
                    flag: request.body.flag,
                });
            response.json({ id: createdCourse.insertedId });
        } catch (error) {
            response.status(500).send({ error: `${error}` });
        }
    }

    private async viewCourse(request: Request, response: Response) {
        try {
            const { MongoClient, ObjectId } = require("mongodb");
            console.log("View Course", request.body.courseId);
            const cursor = await dbSchoolApp.collection("course").findOne({
                _id: new ObjectId(request.query.courseId),
            });
            console.log(cursor);
            response.send(cursor);
        } catch (error) {
            response.status(500).json({ error: `${error}` });
        }
    }
    private async viewTeacherCourseList(request: Request, response: Response) {
        try {
            console.log("View Teacher Course");
            const cursor = await dbSchoolApp
                .collection("course")
                .find({
                    cognitoId: request.query.cognitoId,
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
    private async viewEnrolledCourseList(request: Request, response: Response) {
        try {
            console.log("View Enrolled Courses");
            const cursor = await dbSchoolApp
                .collection("course")
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
