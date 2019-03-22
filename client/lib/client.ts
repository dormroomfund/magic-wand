import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import { CookieStorage } from 'cookie-storage';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';
import t from 'tcomb';
import io from 'socket.io-client';
import socketio from '@feathersjs/socketio-client';
import App from '../schemas/app';

const { publicRuntimeConfig } = getConfig();

const client = feathers() as App;

// Setup the transport (Rest, Socket, etc.) here
t.String(publicRuntimeConfig.rootUrl);
if (typeof window !== 'undefined') {
  const socket = io(publicRuntimeConfig.rootUrl, {
    transports: ['websocket'],
  });
  console.log('connected using socket.io');
  client.configure(socketio(socket));
} else {
  const restClient = rest(publicRuntimeConfig.rootUrl);
  client.configure(restClient.fetch(fetch));
}

client.configure(
  auth({
    cookie: 'feathers-jwt',
    storage: new CookieStorage(),
  })
);

export default client;
