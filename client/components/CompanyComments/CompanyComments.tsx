import React, { Component } from 'react';
import {
  withAC,
  ApplicationContainerProps,
} from '../../containers/ApplicationContainer';
import Comment from './Comment';

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

  render() {
    const { applicationContainer: ac, companyId } = this.props;
    const comments = ac.comments.forCompany(companyId);

    return (
      <div>
        <h2>Comments</h2>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

export default withAC(CompanyComments);
