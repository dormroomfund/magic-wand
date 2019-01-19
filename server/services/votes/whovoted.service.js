/*
 * This service is used to determine for a given companyId and voteType who
 * has submitted votes.
 *
 * For example when considering company_id = 1 and vote_type = 'Final' it will return all
 * the names of the partners who submitted a vote.
 */
export default (app) => {
  const PeopleWhoVotedService = {
    async find(params) {
      /*
       * Perform a find query on the votes link to get the names of the partners who
       * have submitted a vote on the company.
       */
      const votes = await app.service('votes').find({
        query: {
          vote_type: params.query.vote_type,
          company_id: params.query.company_id,
          $eager: 'voted_user',
        },
      });

      const partnerNames = [];

      votes.data.forEach((vote) => {
        partnerNames.push(
          `${vote.voted_user.first_name} ${vote.voted_user.last_name}`
        );
      });

      return partnerNames;
    },
  };

  app.use('/people-who-voted', PeopleWhoVotedService);
};
