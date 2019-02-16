import React from 'react';
import Form, { ISubmitEvent } from 'react-jsonschema-form-bs4';
import client from '../../lib/client';

interface VotingProps {
  companyID: number;
  user: any /* The user that is logged in. */;
}

interface VotingState {
  company: any;
  prevoteData: object;
  didPrevote: boolean;
  finalvoteData: object;
  didFinalVote: boolean;
}

const

export default class VotingForms extends React.Component<
  VotingProps,
  VotingState
> {
  state = {
    company: {},
    prevoteData: {
      fit_score: 1,
      market_score: 1,
      product_score: 1,
      team_score: 1,
    },
    didPrevote: false,
    finalvoteData: {},
    didFinalvote: false,
  };

  async componentDidMount() {
    /*
     * Get the current company
     */
    const company = await client
      .service('api/companies')
      .get(this.props.companyID);

    /*
     * Determine whether this user has done a prevote or not on this company
     */
    const prevote = await client.service('api/votes').get({
      company_id: this.props.companyID,
      partner_id: this.props.user.id,
      vote_type: 'prevote',
    });

    const didPrevote = prevote.total > 0; /* Did this user prevote */

    /*
     * Determine whether this user has dones a final or not on this company
     */
    const finalvote = await client.service('api/votes').get({
      company_id: this.props.companyID,
      partner_id: this.props.user.id,
      vote_type: 'final',
    });

    const didFinalvote = finalvote.total > 0;

    this.setState({
      company,
      prevoteData: prevote.data[0],
      didPrevote,
      finalvoteData: finalvote.data[0],
      didFinalvote,
    });
  }

  renderPrevoteForm() {
    const formData = {
      Fit: this.state.didPrevote ? this.state.prevoteData.fit_score : 1,
      Market: this.state.didPrevote ? this.state.prevoteData.market_score : 1,
      Product: this.state.didPrevote ? this.state.prevoteData.product_score : 1,
      Team: this.state.didPrevote ? this.state.prevoteData.team_score : 1,
    };
    return <Form />;
  }

  render() {
    return null;
  }
}
