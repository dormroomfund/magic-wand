import dayjs from 'dayjs';
import React from 'react';
import Image from 'react-bootstrap/lib/Image';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Comment } from '../../schemas/comment.schema';
import { User } from '../../schemas/user';
import Timestamp from './Timestamp';

dayjs.extend(relativeTime);

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export interface CommentProps {
  comment: Comment;
}

const fullName = (user: User) => `${user.firstName} ${user.lastName}`;

export default ({ comment }: CommentProps) => (
  <CommentWrapper data-cy={`Comment-${comment.id}`}>
    <Image
      src={comment.author && comment.author.photo}
      className="mr-2"
      height={32}
      width={32}
      roundedCircle
    />
    <div>
      <strong className="text-muted" data-cy="CommentAuthor">
        {comment.author ? fullName(comment.author) : ' '}
      </strong>
      &nbsp;
      <small>
        <Timestamp timestamp={comment.createdAt} />
      </small>
      <div>
        <ReactMarkdown source={comment.content} />
      </div>
    </div>
  </CommentWrapper>
);
