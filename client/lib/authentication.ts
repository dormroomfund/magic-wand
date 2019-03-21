import { IncomingMessage } from 'http';
import client from './client';
import { User } from '../schemas/user';

/**
 * If not yet attempted, authenticates the user. Returns a JWT if
 * authenticated, else undefined.
 *
 * @param req The request object passed into `getInitialProps`.
 */
export async function ensureAuthenticated(
  req?: IncomingMessage
): Promise<string | undefined> {
  // Snag the cookie from the request, if on server.
  // https://github.com/zeit/next.js/issues/2364
  if (req) {
    const jwt = req.cookies['feathers-jwt'];
    client.set('accessToken', jwt);
    if (jwt && client.passport.payloadIsValid(jwt)) {
      return jwt;
    }
  }

  try {
    const res = await client.authenticate();
    return res.accessToken;
  } catch (e) {
    if (e.className !== 'not-authenticated') {
      throw e;
    }
    return undefined;
  }
}

/**
 * Retrieves the current user, authenticating if necessary.
 */
export async function getUser(
  req?: IncomingMessage
): Promise<User | undefined> {
  const token = await ensureAuthenticated(req);
  if (!token) {
    return undefined;
  }

  try {
    const payload = await client.passport.verifyJWT(token);
    const { userId } = payload as { userId: number };
    const user = await client.service('api/users').get(userId);
    return user;
  } catch (e) {
    console.error('error while getting user', e);
    return undefined;
  }
}
