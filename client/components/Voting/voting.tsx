import { Paginated } from '@feathersjs/feathers';
import { JSONSchema6 } from 'json-schema';
import React from 'react';
import Button from 'react-bootstrap/lib/Button'
import Table from 'react-bootstrap/lib/Table';
import Form, { ISubmitEvent } from 'react-jsonschema-form-bs4';
import client from '../../lib/client';
import { archivedStates, Company } from '../../schemas/company';
import { Vote, voteSchema } from '../../schemas/vote';
import { makeRequired, pick } from '../../schemas/_utils';

interface VotingProps {
  companyID: number;
  user: any /* The user that is logged in. */;
}

interface VotingState {
  company?: Company;
  prevoteData: object;
  didPrevote: boolean;
  finalvoteData: object;
  didFinalvote: boolean;
  votingFinalized: boolean;
  prevotedPartners: Array<object>;
  finalvotedPartners: Array<object>;
}

const requiredFields = [
  'fit_score',
  'market_score',
  'product_score',
  'team_score',
];

const voteFormSchema = makeRequired(
  pick(voteSchema as JSONSchema6, requiredFields),
  requiredFields
);

export default class VotingForms extends React.PureComponent<
  VotingProps,
  VotingState
> {
  state = {
    company: null,
    prevoteData: {
      fit_score: 1,
      market_score: 1,
      product_score: 1,
      team_score: 1,
    },
    didPrevote: false,
    finalvoteData: {
      fit_score: 1,
      market_score: 1,
      product_score: 1,
      team_score: 1,
    },
    didFinalvote: false,
    votingFinalized: false,
    prevotedPartners: [],
    finalvotedPartners: [],
  };
  private interval: NodeJS.Timeout;

  async componentDidMount() {
    /*
     * Get the current company
     */
    const company = await client
      .service('api/companies')
      .get(this.props.companyID);

    const votingFinalized = archivedStates.includes(company.status);

    /*
     * Determine whether this user has done a prevote or not on this company
     *
     * TODO: Switch to eager loading
     */
    let prevote;
    try {
      prevote = await client.service('api/votes').find({
        query: {
          company_id: this.props.companyID,
          partner_id: this.props.user.id,
          vote_type: 'final',
        },
      });
    } catch (e) {
      console.log(e);
    }

    const didPrevote = prevote.total > 0; /* Did this user prevote */

    /*
     * Determine whether this user has done a final or not on this company
     */
    const finalvote = (await client.service('api/votes').find({
      query: {
        company_id: this.props.companyID,
        partner_id: this.props.user.id,
        vote_type: 'final',
      },
    })) as Paginated<Vote>;

    const didFinalvote = finalvote.total > 0;

    this.setState({
      company,
      prevoteData: didPrevote ? prevote.data[0] : this.state.prevoteData,
      didPrevote,
      finalvoteData: didFinalvote
        ? finalvote.data[0]
        : this.state.finalvoteData,
      didFinalvote,
      votingFinalized,
      prevotedPartners: company.partnerVotes.prevote,
      finalvotedPartners: company.partnerVotes.final,
    });

    // Setup autorefresh every 3 seconds to pull updated company information
    this.interval = setInterval( async() => {
      const updatedCompany = await client
        .service('api/companies')
        .get(this.props.companyID);

      /*
       * Determine if we need to update our didPrevote or didFinalVoteStew
       */
      let newDidPrevote = this.state.didPrevote;
      let newDidFinalvote = this.state.didFinalvote;
      updatedCompany.partnerVotes.prevote.forEach((partnerObj) => {
        newDidPrevote = newDidPrevote || (partnerObj.partner_id == this.props.user.id);
      });

      updatedCompany.partnerVotes.final.forEach((partnerObj) => {
        newDidFinalvote = newDidFinalvote || (partnerObj.partner_id == this.props.user.id);
      });

      this.setState({prevotedPartners: updatedCompany.partnerVotes.prevote,
        finalvotedPartners: updatedCompany.partnerVotes.final,
        didPrevote: newDidPrevote,
        didFinalvote: newDidFinalvote,
      });
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleVotingSubmitClosure(vote_type: String) {
    /*
     * Update the database with submitting the prevote
     */
    const handleVotingSubmit = async (evt: ISubmitEvent<any>) => {
      try {
        const res = await client.service('api/votes').create({
          company_id: this.props.companyID,
          partner_id: this.props.user.id,
          vote_type: vote_type,
          ...evt.formData,
        });
        this.setState({
          didPrevote: vote_type === 'prevote' ? true : this.state.didPrevote,
          didFinalvote: vote_type === 'final' ? true : this.state.didFinalvote,
          ...evt.formData,
        });
        alert('Submitted ' + vote_type);
      } catch (e) {
        console.log(e);
      }
    };

    return handleVotingSubmit;
  }

  renderPrevoteForm() {
    const formData =  this.state.prevoteData;

    /* Disabling the form when done. */
    const uiSchema = {
      fit_score: {
        'ui:disabled': this.state.didPrevote,
      },
      market_score: {
        'ui:disabled': this.state.didPrevote,
      },
      product_score: {
        'ui:disabled': this.state.didPrevote,
      },
      team_score: {
        'ui:disabled': this.state.didPrevote,
      },
    };

    return (
      <Form
        uiSchema={uiSchema}
        schema={voteFormSchema}
        onChange={ (evt) => this.setState( {prevoteData: evt.formData})}
        formData={formData}
        onSubmit={this.handleVotingSubmitClosure('prevote')}
      >
        <Button disabled={this.state.didPrevote} type="submit">
          {' '}
          Submit
        </Button>
      </Form>
    );
  }

  renderFinalVoteForm() {
    if (!this.state.didPrevote) {
      return null;
    }

    const formData = this.state.finalvoteData;

    /* Disabling the form when done. */
    const uiSchema = {
      fit_score: {
        'ui:disabled': this.state.didFinalvote,
      },
      market_score: {
        'ui:disabled': this.state.didFinalvote,
      },
      product_score: {
        'ui:disabled': this.state.didFinalvote,
      },
      team_score: {
        'ui:disabled': this.state.didFinalvote,
      },
    };

    return (
      <Form
        key="final"
        uiSchema={uiSchema}
        schema={voteFormSchema}
        formData={formData}
        onChange={ (evt) => this.setState( {finalvoteData: evt.formData})}
        onSubmit={this.handleVotingSubmitClosure('final')}
      >
        <Button disabled={this.state.didFinalvote} type="submit">
          Submit
        </Button>
      </Form>
    );
  }

  renderFinalizeVotesButton() {
    if (
      !this.state.didFinalvote ||
      this.props.user.partner_position !== 'Managing Partner'
    ) {
      console.log('here');
      return null;
    }
    return (
      <Button
        onClick={() => this.finalizeVotes()}
        disabled={this.state.votingFinalized}
      >
        Finalize Votes
      </Button>
    );
  }

  /*
   * Deletes a vote and frees up form for editing if the deleted votes was done by this user.
   */
  async deleteVoteAction(voteid, partner_id, vote_type) {
    await client.service('api/votes').remove(voteid);
    if (vote_type === 'final' && partner_id === this.props.user.id) {
      this.setState({didFinalvote: false}); // should also diable your form
    } else if (vote_type === 'prevote' && partner_id === this.props.user.id) {
      this.setState({didPrevote: false}); // should also disable your form
    }

  }

  renderWaitingOnPeopleandFinalize() {

    if (!this.state.company) {
      return null;
    }

    /* Get all the names of the partners who submitted a final vote */
    const finalvotePartners = this.state.finalvotedPartners;
    const prevotePartners = this.state.prevotedPartners;

    /* Get the names of the partners who submitted a pre vote but not
    * a final vote with a set difference operation
    */
    const preVoteButNoFinalVotePartners = [];
    prevotePartners.forEach( (prevotePartner) => {
      let exists = false;
      finalvotePartners.forEach( (finalvotePartner) => {
        if (prevotePartner.partner_id == finalvotePartner.partner_id) {
          exists = true;
        }
      });
      if (!exists) preVoteButNoFinalVotePartners.push(prevotePartner);
    });

    /*
     * Create a table of all the people who submitted a final vote along with the people who
     */
    const finalVotesTables = <Table striped bordered hover>
                              <thead>
                              <tr>
                                <th>Partner</th>
                                <th>Delete?</th>
                              </tr>
                              </thead>
                              <tbody>
                              {
                                finalvotePartners.map( (partner, index) =>
                                  <tr key={index}>
                                      <td> { partner.name } </td>
                                      <td> <Button variant="danger"
                                                   onClick={() => this.deleteVoteAction(partner.vote_id, partner.partner_id, 'final')}
                                                   disabled = { archivedStates.includes(this.state.company.status) }
                                                   >Delete Vote </Button></td>
                                  </tr>
                                )
                              }
                              </tbody>
                          </Table>;

    const prevoteButNoFinalVotesTable = <Table striped bordered hover>
                                          <thead>
                                          <tr>
                                            <th>Partner</th>
                                            <th>Delete?</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          {
                                            [...preVoteButNoFinalVotePartners].map( (partner, index) =>
                                              <tr key={index}>
                                                <td> { partner.name } </td>
                                                <td> <Button variant="danger"
                                                             onClick={() => this.deleteVoteAction(partner.vote_id, partner.partner_id, 'prevote')}> Delete Vote
                                                    </Button></td>
                                              </tr>
                                            )
                                          }
                                          </tbody>
                                        </Table>;

    /*
     * If people have submitted votes and the number of prevotes = number of postVotes list all the all people
     * who voted and give the option of the mp of to finalize the votes.
     */
    if (!this.state.didFinalvote) {
      return null;
     }
    else if (preVoteButNoFinalVotePartners.length === 0 && finalvotePartners.length > 0 && prevotePartners.length > 0) {
      return <div> <p> The following partners have submitted final votes. </p> {finalVotesTables} {this.renderFinalizeVotesButton()} </div>
    } else if (preVoteButNoFinalVotePartners.length > 0 && finalvotePartners.length > 0 && prevotePartners.length > 0) {
      return <div> {finalVotesTables} <p> The following partners have submitted a prevote but not a final vote</p> {prevoteButNoFinalVotesTable} </div>
    } else {
      return null;
    }
  }

  async finalizeVotes() {
    try {
      const res = await client
        .service('api/votes/finalize')
        .patch(this.props.companyID, {
          vote_type: 'final',
        });
      console.log(res);
      const newCompany = { ...this.state.company };
      newCompany.status = res.status;
      this.setState({ votingFinalized: true, company: newCompany });
      alert('This company was ' + res.status);
    } catch (e) {
      alert('Missing votes');
    }
  }

  render() {
    const { company } = this.state;
    return (
      <div>
        <h1> {company && company.name} </h1>
        <h2> Status: {company && company.status} </h2>
          {this.renderPrevoteForm()}
          {this.renderFinalVoteForm()}
          {this.renderWaitingOnPeopleandFinalize()}
      </div>
    );
  }
}
