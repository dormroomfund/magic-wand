import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import { Paginated } from '@feathersjs/feathers';
import ResearchContainer from '../../containers/ResearchContainer';
import ResearchList from './ResearchList';
import client from '../../lib/client';
import { UnreachableCaseError } from '../../lib/errors';
import { Status, Company } from '../../schemas/company';
import { User } from '../../schemas/user';

// number of items to mutate state with at once
const PAGE_LENGTH = 16;

enum Filter {
  None,
  MySuccess,
}

interface ResearchProps {
  user: User;
}

interface ResearchState {
  filter: Filter;
  items: Company[];
  hasMoreItems: boolean;
  skip: number;
  successCompanies: Company[];
}

export default class Research extends Component<ResearchProps, ResearchState> {
  state = {
    filter: Filter.None,
    items: [],
    hasMoreItems: true,
    skip: 0,
    successCompanies: [],
  };

  async componentDidMount() {
    const successCompanies = (await client.service('api/companies').find({
      query: {
        status: Status.Funded,
        userId: this.props.user.id,
        $eager: 'pointPartners',
        $joinRelation: 'pointPartners',
      },
    })) as Paginated<Company>;

    this.setState({ successCompanies: successCompanies.data });
  }

  getFilteredCompanies(companies: Company[]) {
    const { filter } = this.state;
    switch (filter) {
      case Filter.None:
        return companies;
      case Filter.MySuccess:
        return this.state.successCompanies;
      default:
        throw new UnreachableCaseError(filter);
    }
  }

  // helper function which buffers the current state's list
  // state list is displayed in InifiniteScroll component
  loadMoreItems = (rc: ResearchContainer) => {
    rc.retrieveCompanies(PAGE_LENGTH, this.state.skip).then((pagination) => {
      const { total } = pagination;

      this.setState((previous) => {
        const items = previous.items.concat(rc.companies);
        const skip = previous.skip + PAGE_LENGTH;
        const hasMoreItems = items.length < total;

        return { hasMoreItems, skip, items };
      });
    });
  };

  renderButtonBar() {
    const { filter } = this.state;
    return (
      <ButtonGroup className="mb-3">
        <Button
          active={filter === Filter.None}
          onClick={() => this.setState({ filter: Filter.None })}
        >
          All Companies
        </Button>
        <Button
          active={filter === Filter.MySuccess}
          onClick={() => this.setState({ filter: Filter.MySuccess })}
        >
          My Companies
        </Button>
      </ButtonGroup>
    );
  }

  render() {
    return (
      <Subscribe to={[ResearchContainer]}>
        {(rc: ResearchContainer) => (
          <>
            <br />
            <Col md={12}>
              <h2>Research</h2>
              {this.renderButtonBar()}
            </Col>

            <ResearchList
              companies={this.getFilteredCompanies(this.state.items)}
            />
            <br />
            <Col md={12}>
              {this.state.hasMoreItems && (
                <Button
                  onClick={() => this.loadMoreItems(rc)}
                  style={{ marginBottom: '1rem' }}
                >
                  Load More
                </Button>
              )}
            </Col>
          </>
        )}
      </Subscribe>
    );
  }
}
