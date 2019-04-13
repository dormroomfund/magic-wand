import _ from 'lodash';
import { Paginated } from '@feathersjs/feathers';
import client from '../lib/client';
import { ChildContainer } from '../lib/combineContainers';
import { User } from '../schemas/user';
import { Team } from '../schemas/common';
import { retrieveAll } from '../lib/retrievePaginated';

interface State {
  users: Record<number, User>;
}

export default class UserContainer extends ChildContainer<State> {
  state: State = { users: {} };

  //
  // GETTERS AND SETTERS
  //

  get(userId: number) {
    return this.state.users[userId];
  }

  getByPartnerTeam(team: Team) {
    return Object.values(this.state.users).filter(
      (user) => user.partnerTeam === team
    );
  }

  //
  // API INTERFACE
  //

  async retrieve(userId: number) {
    const user = await client.service('api/users').get(userId);

    this.setState((state) => ({
      users: {
        ...state.users,
        [user.id]: user,
      },
    }));

    return user;
  }

  /** Retrieves partners by partner team. */
  async retrieveByPartnerTeam(team: Team) {
    const users = await retrieveAll(client, 'api/users', { partnerTeam: team });

    this.setState((state) => ({
      users: {
        ...state.users,
        ..._.keyBy(users),
      },
    }));

    return users;
  }
}
