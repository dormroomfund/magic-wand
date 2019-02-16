import { Application } from '@feathersjs/feathers';
import { Company } from './company';
import { User } from './user';
import { Vote } from './vote';

export interface ServiceTypes {
  'api/companies': Company;
  'api/users': User;
  'api/votes': Vote;
}

export default interface App extends Application<ServiceTypes> {}
