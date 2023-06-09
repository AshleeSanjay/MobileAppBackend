import awsServerlessExpress from "aws-serverless-express";
import { App } from "./app";
import dns from "node:dns";

import { HomeController } from "./lib/controllers/home_controller";
import { TeacherController } from "./lib/controllers/teacher_controller";
import { USER_SERVICE_PORT } from "./constants";
import { StudentController } from "./lib/controllers/student_controller";
import { CourseController } from "./lib/controllers/course_controller";
import { AssignmentController } from "./lib/controllers/assignment_controller";

dns.setDefaultResultOrder("ipv4first");

const app = new App(USER_SERVICE_PORT ?? "4000", [
    new HomeController(),
    new TeacherController(),
    new StudentController(),
    new CourseController(),
    new AssignmentController(),
]);

if (process.env.NODE_ENV == "development") {
    app.listen();
}

const server = awsServerlessExpress.createServer(app.app);

exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};
