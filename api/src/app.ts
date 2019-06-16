import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import { default as UserRoute } from './routes/UserRoute';
// import { default as TokenRoute } from './routes/TokenRoute';
import { default as StatusRoute } from './routes/StatusRoute';
import { default as config } from './config';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.express.use(UserRoute);
    // this.express.use(TokenRoute);
    this.express.use(StatusRoute);
  }

  middlewares() {
    if (config.NODE_ENV === 'development') {
      this.express.use(morgan('dev'));
    } else {
      this.express.use(morgan('production'));
      this.express.use(compression());
    }
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(methodOverride());
  }
}

export default new App().express;
