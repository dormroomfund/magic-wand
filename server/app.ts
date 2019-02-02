import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import { nextMiddleware } from './next';
import logger from './logger';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import authentication from './authentication';
import objection from './objection';

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(objection);

// Configure other middleware (see `middleware/index.tsx`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.tsx`)
app.configure(services);
// Set up next.js hooks
app.configure(nextMiddleware);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

export default app;
