import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import mongoose = require("mongoose"); //import mongoose

//interfaces
import { IUser } from "./interfaces/user"; //import IUser

//models
import { IModel } from "./model/model"; //import IModel
import { IUserModel } from "./model/user"; //import IUserModel

//schemas
import { userSchema } from "./schemas/user"; //import userSchema

// import AuthRouter from './routes/AuthRouter';
// import UserRouter from './routes/UserRouter';
// import ProtectedRouter from './routes/ProtectedRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  private model: IModel; //an instance of IModel

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    
    this.express.use('/', router);
    // this.express.use('/api/auth', AuthRouter);
    // this.express.use('/api/user', UserRouter);
    // this.express.use('/api/protected', ProtectedRouter);
  }

  private config(): void {
    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/boards";
    mongoose.Promise = global.Promise;

    //connect to mongoose
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

    //create models
    this.model.user = connection.model<IUserModel>("User", userSchema);
  }

}

export default new App().express;
