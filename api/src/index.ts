import * as http from 'http';
import * as mongoose from 'mongoose';
import app from './app';
import { normalizePort, onError, onListening } from './utils/utils';
import configDevelopment from './config/config.development';

const server = http.createServer(app);
const port = normalizePort(configDevelopment.server.port || 3002);

mongoose
  .connect(configDevelopment.mongodb.uri, {
    useMongoClient: true
  })
  .on('connected', () => {
    console.log('mongoose connected');
    server.listen(port);
    server.on('error', onError(server));
    server.on('listening', onListening(server));
  });
