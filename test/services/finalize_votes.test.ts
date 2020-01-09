/*
 * Tests the finalize_votes service
 */
import assert from 'assert';
import errors from '@feathersjs/errors';
import app from '../../server/app';
import { VoteType, OverallVote } from '../../client/schemas/vote';
import { Status } from '../../client/schemas/company';

let company;
let user1Prevote;
let user2Prevote;
let user3Prevote;
let user1FinalVote;
let user2FinalVote;
let user3FinalVote;

// Applies to all tests in this file
beforeAll(async () => {
  /*
   * Create 3 dummy users in the database
   */
  const user1Info = {
    auth0: {
      profile: {
        emails: ['test@test.com'],
        name: {
          givenName: 'Test',
          familyName: 'User1',
        },
        picture: '',
      },
    },
  };
  const user2Info = {
    auth0: {
      profile: {
        emails: ['test2@test.com'],
        name: {
          givenName: 'Test',
          familyName: 'User2',
        },
        picture: '',
      },
    },
  };
  const user3Info = {
    auth0: {
      profile: {
        emails: ['test3@test.com'],
        name: {
          givenName: 'Test',
          familyName: 'User3',
        },
        picture: '',
      },
    },
  };

  const user1 = await app.service('/api/users').create(user1Info);
  const user2 = await app.service('/api/users').create(user2Info);
  const user3 = await app.service('/api/users').create(user3Info);

  company = await app.service('/api/companies').find({
    query: {
      name: 'Dummy Voting Company',
    },
  });

  [company] = company.data;

  /*
   * Submit prevote for each user for company
   */
  user1Prevote = {
    voteType: VoteType.Prevote,
    partnerId: user1.id,
    companyId: company.id,
    marketScore: 4,
    productScore: 3,
    teamScore: 4,
    fitScore: 2,
  };
  user2Prevote = {
    voteType: VoteType.Prevote,
    partnerId: user2.id,
    companyId: company.id,
    marketScore: 5,
    productScore: 5,
    teamScore: 5,
    fitScore: 5,
  };
  user3Prevote = {
    voteType: VoteType.Prevote,
    partnerId: user3.id,
    companyId: company.id,
    marketScore: 1,
    productScore: 3,
    teamScore: 3,
    fitScore: 2,
  };

  user1FinalVote = {
    ...user1Prevote,
    voteType: VoteType.Final,
    overallVote: OverallVote.DontFund,
  };
  user2FinalVote = {
    ...user2Prevote,
    voteType: VoteType.Final,
    overallVote: OverallVote.Fund,
  };
  user3FinalVote = {
    ...user3Prevote,
    voteType: VoteType.Final,
    overallVote: OverallVote.DontFund,
  };

  await app.service('api/votes').create(user1Prevote);
  await app.service('api/votes').create(user2Prevote);
  await app.service('api/votes').create(user3Prevote);
});

describe("' api/votes/finalize ' service", () => {
  it('registered the final_votes service', () => {
    const service = app.service('/api/votes/finalize');

    assert.ok(service, 'Registered the service');
  });

  it('computes correctly the prevote statistics', async () => {
    const service = app.service('/api/votes/finalize');

    const res = await service.patch(company.id, {
      voteType: VoteType.Prevote,
    });

    const correctMarketScore = (4 + 5 + 1) / 3.0;
    const correctProductScore = (3 + 5 + 3) / 3.0;
    const correctTeamScore = (4 + 5 + 3) / 3.0;
    const correctFitScore = (2 + 5 + 2) / 3.0;

    assert.equal(res.marketScoreAvg, correctMarketScore);
    assert.equal(res.productScoreAvg, correctProductScore);
    assert.equal(res.teamScoreAvg, correctTeamScore);
    assert.equal(res.fitScoreAvg, correctFitScore);
  });

  it('determines that there are missing final votes', async () => {
    const service = app.service('/api/votes/finalize');

    // Create the first two votes
    await app.service('api/votes').create(user1FinalVote);
    await app.service('api/votes').create(user2FinalVote);

    // Expect that the appropriate error is thrown.
    await expect(
      service.patch(company.id, {
        voteType: VoteType.Final,
      })
    ).rejects.toThrow(errors.BadRequest('Missing final votes'));
  });

  it("computes the final vote statistics and changes the company's status", async () => {
    const service = app.service('/api/votes/finalize');

    // Create the final votet
    await app.service('api/votes').create(user3FinalVote);

    const res = await service.patch(company.id, {
      voteType: VoteType.Final,
    });

    const correctMarketScore = (4 + 5 + 1) / 3.0;
    const correctProductScore = (3 + 5 + 3) / 3.0;
    const correctTeamScore = (4 + 5 + 3) / 3.0;
    const correctFitScore = (2 + 5 + 2) / 3.0;

    assert.equal(res.marketScoreAvg, correctMarketScore);
    assert.equal(res.productScoreAvg, correctProductScore);
    assert.equal(res.teamScoreAvg, correctTeamScore);
    assert.equal(res.fitScoreAvg, correctFitScore);
    assert.equal(res.numNo, 2);
    assert.equal(res.numYes, 1);
    assert.equal(res.status, Status.RejectedWithPitch);

    // Update the company variable as its status should have changed
    company = await app.service('/api/companies').find({
      query: {
        name: 'Dummy Voting Company',
      },
    });

    [company] = company.data;

    assert.equal(company.status, Status.RejectedWithPitch);
  });
});
