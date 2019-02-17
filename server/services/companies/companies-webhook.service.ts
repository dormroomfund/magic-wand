import App from '../../../client/schemas/app';
import { Company, Status } from '../../../client/schemas/company';

class CompaniesWebhookService {
  private app!: App;

  setup(app: App) {
    this.app = app;
  }

  async create(data) {
    const answers = data.form_response.answers;
    const company: Company = {
      name: answers[1].text,
      description: answers[6].text,
      industries: answers[7].choice.label,
      team: answers[12].choice.label,
      status: Status.Applied,
      contact_email: answers[8].email,
    };

    console.dir(company);

    return company;
  }
}

export default (app: App) => {
  app.use('/api/companies/webhook', new CompaniesWebhookService());
};
