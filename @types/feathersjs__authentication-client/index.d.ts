declare module '@feathersjs/authentication-client' {
  import { PassportStatic } from 'passport';

  interface CreateJWTOptions {
    secret: string;
    jwt: {
      algorithm?: string;
      expiresIn?: string | number;
      notBefore?: string | number;
      audience?: string | string[];
      issuer?: string;
      jwtid?: string;
      subject?: string;
      noTimestamp?: string;
      header?: string;

      // native JWT headers
      exp?: number;
      nbf?: number;
      aud?: string;
      sub?: string;
      iss?: string;
    };
  }

  const feathersAuthClient: ((
    config?: FeathersAuthClientConfig
  ) => () => void) &
    typeof self;
  export default feathersAuthClient;

  export interface FeathersAuthClientConfig {
    storage?: Storage;
    header?: string;
    cookie?: string;
    storageKey?: string;
    jwtStrategy?: string;
    path?: string;
    entity?: string;
    service?: string;
  }

  export interface FeathersAuthCredentials {
    strategy: string;

    [index: string]: any;
  }

  export const defaults: {
    header: string;
    cookie: string;
    storageKey: string;
    jwtStrategy: string;
    path: string;
    entity: string;
    service: string;
    timeout: number;
  };

  export interface Passport extends PassportStatic {
    setupSocketListeners(): void;

    connected(): Promise<any>;

    authenticateSocket(
      credentials: FeathersAuthCredentials,
      socket: any,
      emit: any
    ): any;

    logoutSocket(socket: any, emit: any): Promise<any>;

    logout(): Promise<any>;

    createJWT(payload: Object, options: CreateJWTOptions): Promise<string>;

    verifyJWT(token: string, options?: { secret: string }): Promise<Object>;

    setJWT(data: any): Promise<any>;

    getJWT(): Promise<any>;

    payloadIsValid(payload: string): boolean;

    getCookie(name: string): string;

    clearCookie(name: string): null;

    getStorage(storage: any): any;
  }
}

declare module '@feathersjs/feathers' {
  import {
    FeathersAuthCredentials,
    Passport,
  } from '@feathersjs/authentication-client';

  interface AuthenticationResult {
    accessToken: string;
  }

  interface Application<ServiceTypes> {
    authenticate(
      options?: FeathersAuthCredentials
    ): Promise<AuthenticationResult>;

    logout(): Promise<void>;

    passport: Passport;
  }
}
