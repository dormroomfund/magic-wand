import React from 'react';
import Form, { ISubmitEvent } from 'react-jsonschema-form-bs4';
import client from '../../lib/client';
import { voteSchema } from '../../shared/schema';
import { makeRequired, pick } from '../../shared/schemaUtils';
import vote from '../../pages/vote';
import {JSONSchema6} from "json-schema";
import Button from "react-bootstrap/lib/Button";

interface VotingProps {
  companyID: number;
  user: any /* The user that is logged in. */;
}

interface VotingState {
  company: any;
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

const voteFormSchema = makeRequired( pick(voteSchema as JSONSchema6, requiredFields), requiredFields);

export default class VotingForms extends React.Component<
  VotingProps,
  VotingState
> {
  state = {
    company: {name: '', status: ''},
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

    const votingFinalized = company.status === 'Rejected' ||  company.status === 'Funded';

    /*
     * Determine whether this user has done a prevote or not on this company
     */
    let prevote;
    try {
       prevote = await client.service('api/votes').find( {
         query: {
             company_id: this.props.companyID,
             partner_id: this.props.user.id,
             vote_type: 'final',
           }
         }
       );
       console.log(prevote);
    } catch (e) {
      console.log(e)
    }

    const didPrevote = prevote.total > 0; /* Did this user prevote */

    /*
     * Determine whether this user has dones a final or not on this company
     */
    const finalvote = await client.service('api/votes').find(
      {
        query: {
          company_id: this.props.companyID,
          partner_id: this.props.user.id,
          vote_type: 'final',
        }
      }
    );

    const didFinalvote = finalvote.total > 0;

    this.setState({
      company,
      prevoteData: didPrevote ? prevote.data[0] : this.state.prevoteData,
      didPrevote,
      finalvoteData: didFinalvote ? finalvote.data[0] : this.state.finalvoteData,
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
        const res = await client.service('api/votes').create(
          {
            company_id: this.props.companyID,
            partner_id: this.props.user.id,
            vote_type: vote_type,
            ...evt.formData,
          }
        );
        this.setState({
          didPrevote: vote_type === 'prevote' ? true : this.state.didPrevote,
          didFinalvote: vote_type === 'final' ? true : this.state.didFinalvote,
          ...evt.formData,
        });
        alert('Submitted ' + vote_type);
      } catch (e) {
        console.log(e)
      }
    };

    return handleVotingSubmit;
  }

  renderPrevoteForm() {
    const formData = {
      fit_score: this.state.didPrevote ? this.state.prevoteData.fit_score : 1,
      market_score: this.state.didPrevote ? this.state.prevoteData.market_score : 1,
      product_score: this.state.didPrevote ? this.state.prevoteData.product_score : 1,
      team_score: this.state.didPrevote ? this.state.prevoteData.team_score : 1,
    };

    console.log(this.state.didPrevote);

    /* Disabling the form when done. */
    const uiSchema = {
      fit_score:  {
        'ui:disabled': this.state.didPrevote
      },
      market_score:  {
        'ui:disabled': this.state.didPrevote
      },
      product_score:  {
        'ui:disabled': this.state.didPrevote
      },
      team_score:  {
        'ui:disabled': this.state.didPrevote
      }
    };

    return (
      <Form uiSchema={uiSchema} schema={voteFormSchema} formData={formData} onSubmit={this.handleVotingSubmitClosure('prevote')}>
        <Button disabled={this.state.didPrevote} type="submit"> Submit</Button>
      </Form>
    );
  }

  renderFinalVoteForm() {
    if (!this.state.didPrevote) {
      return null;
    }

    const formData = {
      fit_score: this.state.didFinalvote ? this.state.finalvoteData.fit_score : 1,
      market_score: this.state.didFinalvote ? this.state.finalvoteData.market_score : 1,
      product_score: this.state.didFinalvote ? this.state.finalvoteData.product_score : 1,
      team_score: this.state.didFinalvote ? this.state.finalvoteData.team_score : 1,
    };

    /* Disabling the form when done. */
    const uiSchema = {
      fit_score:  {
        'ui:disabled': this.state.didFinalvote
      },
      market_score:  {
        'ui:disabled': this.state.didFinalvote
      },
      product_score:  {
        'ui:disabled': this.state.didFinalvote
      },
      team_score:  {
        'ui:disabled': this.state.didFinalvote
      }
    };

    return (
      <Form key="final" uiSchema={uiSchema} schema={voteFormSchema} formData={formData} onSubmit={this.handleVotingSubmitClosure('final')}>
        <Button disabled={this.state.didFinalvote} type="submit">Submit</Button>
      </Form>
    );
  }

  async finalizeVotes() {
    try {
      const res = await client.service('api/votes/finalize').patch(this.props.companyID,
        {
          vote_type: 'final'
        }
      );
      console.log(res);
      const newCompany = {...this.state.company};
      newCompany.status = res.status;
      this.setState({votingFinalized: true, company: newCompany});
      alert("This company was " + res.status);

    } catch (e) {
      alert('Missing votes');
    }
  }

  renderFinalizeVotesButton() {
    if (!this.state.didFinalvote || this.props.user.partner_position !== 'Managing Partner') {
      return null;
    }
    return <Button onClick={() => this.finalizeVotes()} disabled={this.state.votingFinalized}> Finalize Votes </Button>
  };

  render() {
    return (
      <div>
        <h1> {this.state.company.name} </h1>
        <h2> Status: { this.state.company.status } </h2>
        {this.renderPrevoteForm()}
        {this.renderFinalVoteForm()}
        {this.renderFinalizeVotesButton()}
      </div>
    );
  }
}
