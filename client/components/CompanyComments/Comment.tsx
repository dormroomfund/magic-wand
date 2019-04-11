import React from 'react';
import Image from 'react-bootstrap/lib/Image';
import { Comment } from '../../schemas/comment.schema';
import { User } from '../../schemas/user';

export interface CommentProps {
  comment: Comment;
}

const fullName = (user: User) => `${user.firstName} ${user.lastName}`;

export default ({ comment }: CommentProps) => (
  <div data-cy={`Comment-${comment.id}`}>
    <Image
      src={comment.author && comment.author.photo}
      className="float-left mr-2"
      height={32}
      roundedCircle
    />
    <div>
      <strong className="text-muted">
        {comment.author ? fullName(comment.author) : ' '}
      </strong>
      <div>{comment.content}</div>
    </div>
  </div>
);
