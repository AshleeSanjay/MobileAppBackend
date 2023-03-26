import {App} from './app';

import {HomeController} from './lib/controllers/home_controller';

const app = new App(process.env.USER_SERVICE_PORT ?? '',[new HomeController]);

app.listen();