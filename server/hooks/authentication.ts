import { hooks } from '@feathersjs/authentication';
import { Hook } from '@feathersjs/feathers';

/** Authenticate the user. */
export const { authenticate } = hooks;
