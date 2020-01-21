import App from '../../../client/schemas/app';
import { refsMap, getAnswerValueFromRef } from '../../../client/lib/typeform';
import { Company, Status } from '../../../client/schemas/company';
import { Team } from '../../../client/schemas/common';

class CompaniesWebhookService {
  private app!: App;

  setup(app: App) {
    this.app = app;
  }

  async create(data) {
    // TODO: Authenticate against Typeform.
    const payload = data.form_response;

    // Override team selection if company selects random
    const videoConferenceAnswer = getAnswerValueFromRef(
      payload,
      refsMap.video_conference
    );
    const isRemoteApplication =
      videoConferenceAnswer === 'Via video conference';

    let team;
    if (isRemoteApplication) {
      const choices = [
        Team.Boston,
        Team.Philadelphia,
        Team.NewYork,
        Team.SanFrancisco,
      ];
      const choice = Math.floor(Math.random() * 3); // returns a random integer from 0 to 3
      team = choices[choice];
    } else {
      team = getAnswerValueFromRef(payload, refsMap.team);
    }

    const company: Company = {
      name: getAnswerValueFromRef(payload, refsMap.name),
      description: getAnswerValueFromRef(payload, refsMap.description),
      industries: [getAnswerValueFromRef(payload, refsMap.industries)],
      team,
      status: Status.Applied,
      contactEmail: getAnswerValueFromRef(payload, refsMap.email),
      typeformData: data,
    };

    return await this.app.service('api/companies').create(company);
  }
}

export default (app: App) => {
  app.use('/api/companies/webhook', new CompaniesWebhookService());
};
