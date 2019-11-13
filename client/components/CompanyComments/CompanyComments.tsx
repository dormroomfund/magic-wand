import React, { Component, FormEvent } from 'react';
import styled from 'styled-components';
import {
  withAC,
  ApplicationContainerProps,
} from '../../containers/ApplicationContainer';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentSectionWrapper = styled.div`
  margin-top: 10vh;
`;

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
      <CommentSectionWrapper>
        <h2>Comments</h2>
        <CommentForm onSubmit={this.handleSubmit} />
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </CommentSectionWrapper>
    );
  }
}

export default withAC(CompanyComments);
