import client from '../lib/client';
import { ChildContainer } from '../lib/combineContainers';
import { retrieveAll } from '../lib/retrievePaginated';
import { Comment } from '../schemas/comment.schema';

interface State {
  // companyId -> comments for company, reverse chronological
  byCompany: Record<number, Comment[]>;
}

export default class CommentContainer extends ChildContainer<State> {
  state: State = { byCompany: {} };

  forCompany(companyId: number) {
    return this.state.byCompany[companyId] || [];
  }

  /** Retrieves and returns all comments for a company. */
  async retrieveByCompany(companyId: number) {
    const comments = await retrieveAll(client, 'api/comments', {
      companyId,
      $eager: 'user',
      $sort: {
        createdAt: -1,
      },
    });

    this.setState((state) => ({
      byCompany: {
        ...state.byCompany,
        [companyId]: comments,
      },
    }));

    return comments;
  }
}
