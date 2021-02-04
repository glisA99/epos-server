import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import * as cors from "cors";
import {Routes} from "./routes";
import { requestInformations } from '../routes/index'
import {default as index_router} from '../routes/index';
import {default as tasks_router} from '../routes/tasks';


createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: true,
    logging: false
  }).then(async connection => {

    const app = express();
    app.use(cors({
        credentials: true,//protiv xss napada

        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        origin: 'http://localhost:3006'

    }));
    app.use(bodyParser.json());


    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // app.use(requestInformations);
    
    app.use('/', index_router);

    app.use('/tasks',tasks_router);
    
    // start express server
    app.listen(3000);


    console.log("Express server has started on port 3000. Open http://localhost:3000 to see results");

}).catch(error => console.log(error));
