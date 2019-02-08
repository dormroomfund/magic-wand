import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import { CookieStorage } from 'cookie-storage';
import fetch from 'isomorphic-unfetch';
import t from 'tcomb';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

t.String(publicRuntimeConfig.rootUrl);
const restClient = rest(publicRuntimeConfig.rootUrl);
const client = feathers();

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
