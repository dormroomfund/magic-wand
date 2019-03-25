import App from '../../../client/schemas/app';
import { refsMap, getAnswerValueFromRef } from '../../../client/lib/typeform';
import { Company, Status } from '../../../client/schemas/company';

class CompaniesWebhookService {
  private app!: App;

  setup(app: App) {
    this.app = app;
  }

  async create(data) {
    // TODO: Authenticate against Typeform.
    const payload = data.form_response;

    const company: Company = {
      name: getAnswerValueFromRef(payload, refsMap.name),
      description:getAnswerValueFromRef(payload, refsMap.description),
      industries: [getAnswerValueFromRef(payload, refsMap.industries)],
      team: getAnswerValueFromRef(payload, refsMap.team),
      status: Status.Applied,
      contact_email: getAnswerValueFromRef(payload, refsMap.email),
      typeform_data: data,
    };

    return await this.app.service('api/companies').create(company);
  }
}

export default (app: App) => {
  app.use('/api/companies/webhook', new CompaniesWebhookService());
};
