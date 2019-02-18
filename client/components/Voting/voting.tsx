import { Paginated } from '@feathersjs/feathers';
import { JSONSchema6 } from 'json-schema';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
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

export default class VotingForms extends React.Component<
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
  };

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
     * Determine whether this user has dones a final or not on this company
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
    });
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
    const formData = {
      fit_score: this.state.didPrevote ? this.state.prevoteData.fit_score : 1,
      market_score: this.state.didPrevote
        ? this.state.prevoteData.market_score
        : 1,
      product_score: this.state.didPrevote
        ? this.state.prevoteData.product_score
        : 1,
      team_score: this.state.didPrevote ? this.state.prevoteData.team_score : 1,
    };

    console.log(this.state.didPrevote);

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

    const formData = {
      fit_score: this.state.didFinalvote
        ? this.state.finalvoteData.fit_score
        : 1,
      market_score: this.state.didFinalvote
        ? this.state.finalvoteData.market_score
        : 1,
      product_score: this.state.didFinalvote
        ? this.state.finalvoteData.product_score
        : 1,
      team_score: this.state.didFinalvote
        ? this.state.finalvoteData.team_score
        : 1,
    };

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
        onSubmit={this.handleVotingSubmitClosure('final')}
      >
        <Button disabled={this.state.didFinalvote} type="submit">
          Submit
        </Button>
      </Form>
    );
  }

  async renderWaitingOnPeopleandFinalize() {

    /* Get all the names of the partners who submitted a final vote */
    const finalvotePartners = this.state.company.partnerVotes.final;
    const prevoteParners = this.state.company.partnerVotes.prevote;

    /* Get the names of the partners who submitted a pre vote but not
     * a final vote.
     */


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

  renderFinalizeVotesButton() {
    if (
      !this.state.didFinalvote ||
      this.props.user.partner_position !== 'Managing Partner'
    ) {
      return null;
    }
    return (
      <Button
        onClick={() => this.finalizeVotes()}
        disabled={this.state.votingFinalized}
      >
        {' '}
        Finalize Votes{' '}
      </Button>
    );
  }

  render() {
    const { company } = this.state;
    return (
      <div>
        <h1> {company && company.name} </h1>
        <h2> Status: {company && company.status} </h2>
        {this.renderPrevoteForm()}
        {this.renderFinalVoteForm()}
        {this.renderFinalizeVotesButton()}
      </div>
    );
  }
}
