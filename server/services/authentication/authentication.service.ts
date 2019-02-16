import authentication from '@feathersjs/authentication';
import jwt from '@feathersjs/authentication-jwt';
import oauth2 from '@feathersjs/authentication-oauth2';
import Auth0Strategy from 'passport-auth0';
import App from '../../../client/schemas/app';
import authenticationHooks from './authentication.hooks';

export default function(app: App) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());

  app.configure(
    oauth2({
      name: 'auth0',
      Strategy: Auth0Strategy,
      ...config.auth0,
      state: true,
    })
  );

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('api/authentication').hooks(authenticationHooks);
}
