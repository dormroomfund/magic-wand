import { reverse, sortBy } from 'lodash';
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

  constructor() {
    super();

    client.service('api/comments').on('created', this.handleCreatedComment);
    // TODO: Support realtime reaction to comment edit/removal.
  }

  //
  // EVENT HANDLERS
  //

  handleCreatedComment = async (comment: Comment) => {
    this.retrieve(comment.id);
  };

  //
  // GETTERS AND SETTERS
  //

  forCompany(companyId: number) {
    return this.state.byCompany[companyId] || [];
  }

  //
  // RETRIEVERS
  //

  /** Retrieves and returns all comments for a company. */
  async retrieve(commentId: number) {
    const comment = await client.service('api/comments').get(commentId, {
      query: {
        $eager: 'author',
      },
    });

    this.setState((state) => ({
      byCompany: {
        ...state.byCompany,
        [comment.companyId]: reverse(
          sortBy(
            [comment].concat(state.byCompany[comment.companyId]),
            'createdAt'
          )
        ),
      },
    }));

    return comment;
  }

  /** Retrieves and returns all comments for a company. */
  async retrieveByCompany(companyId: number) {
    const comments = await retrieveAll(client, 'api/comments', {
      companyId,
      $eager: 'author',
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

  //
  // MUTATORS
  //

  async create(companyId: number, content: string) {
    await client.service('api/comments').create({ companyId, content });
  }
}
