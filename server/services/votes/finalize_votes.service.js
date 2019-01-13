import errors from '@feathersjs/errors';

/*
 * This service is used to determine for a given voteType and voteType who
 * has submitted votes.
 *
 * For example when considering company_id = 1 and vote_type = 'Final' it will return all
 * the names of the partners who submitted a vote.
 *
 * ex: PATCH /finalize_votes/1
 * DATA:
 * {
 *    "vote_type": "final"
 * }
 */
export default (app) => {
  const FinalizeVotesService = {
    async patch(id, data) {
      /*
       * If the vote type is not specified throw an error.
       */
      if (!('vote_type' in data)) {
        return new errors.BadRequest('Vote Type Not Specified');
      }

      const votes = await app.service('votes').find({
        query: {
          vote_type: data.vote_type,
          company_id: id,
        },
      });

      /*
       * Go through each of the votes and determine the number of yes
       * votes and the number of no votes.
       */
      let numYes = 0;
      let numNo = 0;
      let marketScoreAvg = 0;
      let productScoreAvg = 0;
      let teamScoreAvg = 0;
      let fitScoreAvg = 0;

      votes.data.forEach((vote) => {
        marketScoreAvg += parseFloat(vote.market_score);
        productScoreAvg += parseFloat(vote.product_score);
        teamScoreAvg += parseFloat(vote.team_score);
        fitScoreAvg += parseFloat(vote.fit_score);

        const currAvg =
          (parseFloat(vote.market_score) +
            parseFloat(vote.product_score) +
            parseFloat(vote.team_score) +
            parseFloat(vote.fit_score)) /
          4;

        if (currAvg > 3.0) {
          numYes += 1;
        } else {
          numNo += 1;
        }
      });

      marketScoreAvg /= votes.data.length;
      productScoreAvg /= votes.data.length;
      teamScoreAvg /= votes.data.length;
      fitScoreAvg /= votes.data.length;

      /*
       * If there are enough yes votes mark the company as
       * funded. Otherwise mark the company as rejected.
       * Note that this only for the final vote.
       */
      let status = 'N/A';

      if (data.vote_type === 'final') {
        if (numYes > numNo) {
          status = 'Funded';
          await app.service('companies').patch(id, {
            status: 'Funded',
          });
        } else {
          status = 'Rejected';
          await app.service('companies').patch(id, {
            status: 'Rejected',
          });
        }
      }

      /*
       * Return the average score information.
       */
      return {
        status,
        numYes,
        numNo,
        marketScoreAvg,
        fitScoreAvg,
        productScoreAvg,
        teamScoreAvg,
      };
    },
  };

  app.use('/finalize-votes', FinalizeVotesService);
};
