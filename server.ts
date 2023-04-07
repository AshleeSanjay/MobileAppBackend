import { App } from "./app";

import { HomeController } from "./lib/controllers/home_controller";
import { TeacherController } from "./lib/controllers/teacher_controller";
import { USER_SERVICE_PORT } from "./constants";

const app = new App(USER_SERVICE_PORT ?? "", [
    new HomeController(),
    new TeacherController(),
]);

app.listen();
