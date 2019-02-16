import { Hook } from '@feathersjs/feathers';

declare module 'feathers-hooks-common' {
  function iff(predicate: PredicateFn, ...hooks: Hook[]): IffHook;
}
