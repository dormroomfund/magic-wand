import Ajv from 'ajv';
import getConfig from 'next/config';
import { Container } from 'unstated';
import { getUser } from '../lib/authentication';
import client from '../lib/client';
import { User, userSchema } from '../schemas/user';

const { publicRuntimeConfig } = getConfig();
const auth0domain = publicRuntimeConfig.authentication.auth0.domain;
const logoutRedirect = publicRuntimeConfig.authentication.auth0.logoutRedirect;

export enum AuthState {
  LoggedOut = 'logged-out',
  LoggingIn = 'logging-in',
  LoggedIn = 'logged-in',
}

export interface UserContainerState {
  authState: AuthState;
  user?: User;
}

export default class UserContainer extends Container<UserContainerState> {
  constructor(user?: User) {
    super();

    if (user) {
      this.state = {
        authState: AuthState.LoggedIn,
        user: user,
      };
    } else {
      this.state = {
        authState: AuthState.LoggingIn,
      };

      this.retrieveUser();
    }

    if (process.browser) {
      client.on('authenticated', this.setLoggedIn);
      client.on('logout', this.setLoggedOut);
      client.on('reauthentication-error', this.setLoggedOut);
    }
  }

  // SETTERS AND GETTERS
  //////////////////////////////////////////////////

  get user() {
    return this.state.user;
  }

  get authState() {
    return this.state.authState;
  }

  get isInitialized() {
    if (!this.user) return false;

    const ajv = new Ajv({ coerceTypes: true });
    const valid = ajv.validate(userSchema, this.user);

    return valid;
  }

  // ACTIONS
  //////////////////////////////////////////////////

  logOut = async () => {
    await client.logout();
    this.setLoggedOut();

    const returnTo = encodeURIComponent(logoutRedirect);
    window.location.href = `https://${auth0domain}/v2/logout?returnTo=${returnTo}`;
  };

  retrieveUser = async () => {
    const user = await getUser();
    if (user) {
      this.setLoggedIn(user);
    } else {
      this.setLoggedOut();
    }

    return user;
  };

  updateUser = async (patch) => {
    try {
      const res = await client.service('api/users').patch(this.user.id, patch);
      this.setState({ user: res });
    } catch (e) {
      console.error(e);
    }
  };

  // PRIVATE
  //////////////////////////////////////////////////

  private setLoggedIn = async (user: User) => {
    this.setState({ authState: AuthState.LoggedIn, user });
  };

  private setLoggedOut = async () => {
    this.setState({ authState: AuthState.LoggedOut, user: undefined });
  };
}
