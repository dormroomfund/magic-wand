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
       * Error and Type Validation
       */

      /*
       * Perform a find query on the votes link to get the partners ids
       * of all the people who have submitted a vote so far.
       */
      const votes = await app.service('votes').find({
        query: {
          vote_type: params.query.voteType,
          company_id: params.query.company_id,
        },
      });

      const partnerIds = [];

      votes.forEach((vote, index) => {
        console.log(vote);
        console.log(index);
        partnerIds.append(vote);
      });

      /*
       * Now query the users services with the partners id and returns
       * an array of partner names.
       */

      return [];
    },
  };

  app.use('/people-who-voted', PeopleWhoVotedService);
};
