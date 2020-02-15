import React, { Component, FormEvent } from 'react';
import {
  withAC,
  ApplicationContainerProps,
} from '../../containers/ApplicationContainer';
import Comment from './Comment';
import CommentForm from './CommentForm';

export interface CompanyCommentsProps {
  companyId: number;
}

class CompanyComments extends Component<
  CompanyCommentsProps & ApplicationContainerProps
> {
  componentDidMount() {
    const { applicationContainer: ac, companyId } = this.props;
    ac.comments.retrieveByCompany(companyId);
  }

  handleSubmit = (comment: string) => {
    const { applicationContainer: ac, companyId } = this.props;

    ac.comments.create(companyId, comment);
  };

  render() {
    const { applicationContainer: ac, companyId } = this.props;
    const comments = ac.comments.forCompany(companyId);

    return (
      <div>
        <h3>Comments</h3>
        <CommentForm onSubmit={this.handleSubmit} />
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

export default withAC(CompanyComments);
