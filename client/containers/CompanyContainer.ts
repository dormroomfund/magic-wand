import client from '../lib/client';
import { ChildContainer } from '../lib/combineContainers';
import { Company } from '../schemas/company';

interface State {
  companies: Record<number, Company>;
}

export default class CompanyContainer extends ChildContainer<State> {
  state = { companies: {} };

  /** Returns a company by id from the store. */
  get(companyId: number) {
    return this.state.companies[companyId];
  }

  /** Retrieves and returns a company. */
  async retrieve(companyId: number) {
    const company = await client.service('api/companies').get(companyId, {
      query: {
        $eager: 'pointPartners',
      },
    });

    this.setState((state) => ({
      companies: {
        ...state.companies,
        [company.id]: company,
      },
    }));

    return company;
  }

  /** Patches and updates a company. */
  async patch(companyId: number, patch: Partial<Company>) {
    const company = await client
      .service('api/companies')
      .patch(companyId, patch, {
        query: {
          $eager: 'pointPartners',
        },
      });

    this.setState((state) => ({
      companies: {
        ...state.companies,
        [company.id]: company,
      },
    }));

    return company;
  }
}
