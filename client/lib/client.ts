import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import { CookieStorage } from 'cookie-storage';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';
import t from 'tcomb';
import App from '../schemas/app';

const { publicRuntimeConfig } = getConfig();

t.String(publicRuntimeConfig.rootUrl);
const restClient = rest(publicRuntimeConfig.rootUrl);
const client = feathers() as App;

// Setup the transport (Rest, Socket, etc.) here
client.configure(restClient.fetch(fetch));

// Available options are listed in the "Options" section
t.Object(publicRuntimeConfig.authentication);
client.configure(
  auth({
    ...publicRuntimeConfig.authentication,
    storage: new CookieStorage(),
  })
);

export default client;
