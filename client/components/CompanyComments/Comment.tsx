import React from 'react';
import Image from 'react-bootstrap/lib/Image';
import { Comment } from '../../schemas/comment.schema';

export interface CommentProps {
  comment: Comment;
}

export default ({ comment }: CommentProps) => (
  <div data-cy={`Comment-${comment.id}`}>
    <Image
      src={comment.author.photo}
      className="float-left mr-2"
      height={32}
      roundedCircle
    />
    <div>
      <strong className="text-muted">
        {`${comment.author.firstName} ${comment.author.lastName}`}
      </strong>
      <div>{comment.content}</div>
    </div>
  </div>
);
