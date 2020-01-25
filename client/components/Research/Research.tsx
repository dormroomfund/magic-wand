import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import InfiniteScroll from 'react-infinite-scroller';
import ResearchContainer from '../../containers/ResearchContainer';
import CurrentUserContainer from '../../containers/CurrentUserContainer';
import ResearchList from './ResearchList';
import { UnreachableCaseError } from '../../lib/errors';
import { Status, Company } from '../../schemas/company';

// number of items to mutate state with at once
const PAGE_LENGTH = 2;

enum Filter {
  None,
  MySuccess,
}

interface ResearchState {
  filter: Filter;
  items: Company[];
  hasMoreItems: boolean;
  skip: number;
}

export default class Research extends Component<{}, ResearchState> {
  state = {
    filter: Filter.None,
    items: [],
    hasMoreItems: true,
    skip: 0,
  };

  getFilteredCompanies(cuc: CurrentUserContainer, companies: Company[]) {
    const { filter } = this.state;
    switch (filter) {
      case Filter.None:
        return companies;
      case Filter.MySuccess:
        return companies.filter(
          // BUG: no companies have point partner objects on them
          (co) => {
            console.log(co);
            return (
              co.pointPartners &&
              co.status === Status.Funded &&
              co.pointPartners.find((partner) => partner.id === cuc.user.id)
            );
          }
        );
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

  /* BUG: naive solution for initialization in render(), doesnt work due to async calls
    initialize(rc: ResearchContainer) {
      if (this.state.items.length == 0) {
        this.loadMoreItems(rc)
      }
    }
  */

  render() {
    return (
      <Subscribe to={[ResearchContainer, CurrentUserContainer]}>
        {(rc: ResearchContainer, cuc: CurrentUserContainer) => (
          <>
            <br />
            <Col md={12}>
              <h2>Research</h2>
              {this.renderButtonBar()}
            </Col>

            <ResearchList
              companies={this.getFilteredCompanies(cuc, this.state.items)}
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
