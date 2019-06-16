import * as consign from 'consign';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as mongoose from 'mongoose';
import Config from './config';

const config = Config.default;
const app = express();

mongoose.connect(config.mongodb.uri);

app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json());
app.use(compression());

consign(config.consign)
  .include('models')
  .then('routes')
  .into(app);

app.listen(config.server.port, () => {
  if (!config.isTest) {
    console.log('MindLab Job Application API');
    console.log(`Address: ${config.server.host}:${config.server.port}`);
  }
});
console.log(app);

export default app;
