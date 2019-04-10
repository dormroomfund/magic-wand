import { Paginated } from '@feathersjs/feathers';
import { cloneDeep } from 'lodash';
import { Container } from 'unstated';
import client from '../lib/client';
import { Company, Status } from '../schemas/company';

export interface ArchiveContainerState {
  companies: Company[];
}

export default class ArchiveContainer extends Container<ArchiveContainerState> {
  constructor() {
    super();
    this.state = { companies: [] };
    this.retrieveCompanies();
  }

  get companies() {
    return this.state.companies;
  }

  async retrieveCompanies() {
    const companies = ((await client
      .service('api/companies')
      .find({})) as Paginated<Company>).data;
    this.setState({ companies });
  }

  archiveCompany = async (id: number) => {
    try {
      await client
        .service('api/companies')
        .patch(id, { status: Status.Archived });
      this.setState((state) => {
        const newState = cloneDeep(state);
        newState.companies.find((co) => co.id === id).status = Status.Archived;
        return newState;
      });
    } catch (e) {
      console.error(e);
    }
  };

  restoreCompany = async (id: number) => {
    try {
      await client
        .service('api/companies')
        .patch(id, { status: Status.Pipeline });
      this.setState((state) => {
        const newState = cloneDeep(state);
        newState.companies.find((co) => co.id === id).status = Status.Pipeline;
        return newState;
      });
    } catch (e) {
      console.error(e);
    }
  };
}
