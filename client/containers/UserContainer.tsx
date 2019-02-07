import getConfig from 'next/config';
import { Container } from 'unstated';
import { getUser } from '../lib/authentication';
import client from '../lib/client';

const { publicRuntimeConfig } = getConfig();
const auth0domain = publicRuntimeConfig.authentication.auth0.domain;
const logoutRedirect = publicRuntimeConfig.authentication.auth0.logoutRedirect;
const host = publicRuntimeConfig.host;

export enum AuthState {
  LoggedOut = 'logged-out',
  LoggingIn = 'logging-in',
  LoggedIn = 'logged-in',
}

// TODO: Generate more granular types.
export type User = any;

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

  // ACTIONS
  //////////////////////////////////////////////////

  async logOut() {
    client.logout();
    this.setLoggedOut();

    const returnTo = encodeURIComponent(logoutRedirect);
    window.location.href = `https://${auth0domain}/v2/logout?returnTo=${returnTo}`;
  }

  // PRIVATE
  //////////////////////////////////////////////////

  retrieveUser = async () => {
    const user = await getUser();
    if (user) {
      this.setLoggedIn(user);
    } else {
      this.setLoggedOut();
    }

    return user;
  };

  private setLoggedIn = async (user: User) => {
    this.setState({ authState: AuthState.LoggedIn, user });
  };

  private setLoggedOut = async () => {
    this.setState({ authState: AuthState.LoggedOut, user: undefined });
  };
}
