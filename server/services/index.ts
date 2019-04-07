import users from './users/users.service';

import votes from './votes/votes.service';
import finalizeVotes from './votes/finalize_votes.service';
import companies from './companies/companies.service';
import companiesPointPartners from './companies/companies-point-partners.service';
import companiesWebhookService from './companies/companies-webhook.service';

import gdrive from './gdrive/gdrive.service';

export default (app) => {
  app.configure(users);
  app.configure(votes);
  app.configure(finalizeVotes);
  app.configure(companies);
  app.configure(companiesWebhookService);
  app.configure(companiesPointPartners);
  app.configure(gdrive);
};
