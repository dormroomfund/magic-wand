import comments from './comments/comments.service';
import companiesPointPartners from './companies/companies-point-partners.service';
import companiesWebhookService from './companies/companies-webhook.service';
import companies from './companies/companies.service';
import gdrive from './gdrive/gdrive.service';
import users from './users/users.service';
import finalizeVotes from './votes/finalize_votes.service';
import votes from './votes/votes.service';

export default (app) => {
  app.configure(users);
  app.configure(votes);
  app.configure(finalizeVotes);
  app.configure(companies);
  app.configure(companiesWebhookService);
  app.configure(companiesPointPartners);
  app.configure(comments);
  app.configure(gdrive);
};
