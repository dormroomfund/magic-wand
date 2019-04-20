import client from '../lib/client';
import { ChildContainer } from '../lib/combineContainers';
import { Company, CompanyLink } from '../schemas/company';

interface State {
  companies: Record<number, Company>;
}

export default class CompanyContainer extends ChildContainer<State> {
  state: State = { companies: {} };

  //
  // GETTERS AND SETTERS
  //

  /** Returns a company by id from the store. */
  get(companyId: number): Company {
    return this.state.companies[companyId];
  }

  /**
   * If the company is in the store, return it. Otherwise, retrieve and return.
   * @warning Do not use in a render() method. Infinite loops.
   */
  async getOrRetrieve(companyId: number) {
    return this.get(companyId) || (await this.retrieve(companyId));
  }

  pointPartnerIdsFor(companyId: number) {
    const company = this.get(companyId);
    return company.pointPartners
      ? company.pointPartners.map((co) => co.id)
      : [];
  }

  //
  // RETRIEVERS
  //

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

  //
  // MUTATORS
  //

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

  async assignPartner(companyId: number, userId: number) {
    await client
      .service('api/companies/point-partners')
      .create({ companyId, userId });
    return await this.retrieve(companyId);
  }

  async unassignPartner(companyId: number, userId: number) {
    await client
      .service('api/companies/point-partners')
      .remove(null, { query: { companyId, userId } });
    return await this.retrieve(companyId);
  }

  async addCompanyLink(companyId: number, link: CompanyLink) {
    const links = this.state.companies[companyId].companyLinks;
    const newLinks = {
      companyLinks: [...links, link],
    };
    this.patch(companyId, newLinks);
  }
}
