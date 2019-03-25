import App from '../../../client/schemas/app';
import { Company, Status } from '../../../client/schemas/company';

class CompaniesWebhookService {
  private app!: App;

  setup(app: App) {
    this.app = app;
  }

  async create(data) {
    // TODO: Authenticate against Typeform.

    const answers = data.form_response.answers;
    const company: Company = {
      name: answers[1].text,
      description: answers[6].text,
      industries: [answers[7].choice.label],
      team: answers[12].choice.label,
      status: Status.Applied,
      contact_email: answers[13].email,
      typeform_data: data,
    };

    return await this.app.service('api/companies').create(company);
  }
}

export default (app: App) => {
  app.use('/api/companies/webhook', new CompaniesWebhookService());
};
