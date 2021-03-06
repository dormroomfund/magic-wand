import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import appHooks from './app.hooks';
import channels from './channels';
import logger from './logger';
import middleware from './middleware';
import { nextMiddleware } from './next';
import objection from './objection';
import services from './services';
import authentication from './services/authentication/authentication.service';

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(objection);

// Configure other middleware (see `middleware/CompanyCard.tsx`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/CompanyCard.tsx`)
app.configure(services);
// Set up event channels (see channels.ts)
app.configure(channels);
// Set up next.js hooks
app.configure(nextMiddleware);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

export default app;
