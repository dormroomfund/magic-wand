import App from '../../../client/schemas/app';
import { refsMap, getAnswerValueFromRef } from '../../../client/lib/typeform';
import { Company, Status } from '../../../client/schemas/company';

class CompaniesWebhookService {
  private app!: App;

  setup(app: App) {
    this.app = app;
  }

  getRelevantLinks(payload) {
    const linksToGrab = {
      email: 'Email',
      pitchdeck: 'Pitch Deck',
      website: 'Website',
    };

    const companyLinks = [];
    Object.keys(linksToGrab).forEach((link) => {
      let value = getAnswerValueFromRef(payload, refsMap[link]);
      if (value && link === 'email') value = `mailto:${value}`;

      if (value) {
        companyLinks.push({ name: linksToGrab[link], url: value });
      }
    });

    return companyLinks;
  }

  async create(data) {
    // TODO: Authenticate against Typeform.
    const payload = data.form_response;

    const company: Company = {
      name: getAnswerValueFromRef(payload, refsMap.name),
      description: getAnswerValueFromRef(payload, refsMap.description),
      industries: [getAnswerValueFromRef(payload, refsMap.industries)],
      team: getAnswerValueFromRef(payload, refsMap.team),
      status: Status.Applied,
      contactEmail: getAnswerValueFromRef(payload, refsMap.email),
      typeformData: data,
      companyLinks: this.getRelevantLinks(payload),
    };

    return await this.app.service('api/companies').create(company);
  }
}

export default (app: App) => {
  app.use('/api/companies/webhook', new CompaniesWebhookService());
};
