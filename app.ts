import express from 'express';
import {decode} from 'html-entities';

import {BaseController} from './lib/controllers/base_controller';

export class App{
    public port:string;
    public app: express.Application;

    constructor(port:string, controllers:BaseController[]){
        this.port = port;
        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private async initializeMiddlewares(){
        this.app.use(
            express.json({
              limit: '1MB',
              type: 'application/json',
            }) as express.RequestHandler
          );
          this.app.use((req, res, next) => {
            req.body = JSON.parse(decode(JSON.stringify(req.body)));
            next();
          });


    }

    private async initializeControllers(controllers:BaseController[]){
          controllers.forEach((controller) => {
            this.app.use('/', controller.router);
          });
    }

    public async listen(){
        this.app.listen(this.port,()=>{
          console.log(`Server started at ${this.port}`);
        });
    }
}