import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import Button from 'react-bootstrap/lib/Button';
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
          (co) =>
            co.status === Status.Funded &&
            co.pointPartners.find((partner) => partner.id === cuc.user.id)
        );
      default:
        throw new UnreachableCaseError(filter);
    }
  }

  // helper function which buffers the current state's list
  // state list is displayed in InifiniteScroll component
  loadMoreItems = (rc: ResearchContainer, cuc: CurrentUserContainer) => {
    rc.retrieveCompanies(PAGE_LENGTH, this.state.skip).then((pagination) => {
      const { total } = pagination;

      if (this.state.items.length === total) {
        this.setState({ hasMoreItems: false });
      } else {
        this.setState((previous) => {
          const items = this.getFilteredCompanies(
            cuc,
            previous.items.concat(rc.companies)
          );
          const skip = previous.skip + PAGE_LENGTH;
          return { items, skip };
        });
      }
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
      <Subscribe to={[ResearchContainer, CurrentUserContainer]}>
        {(rc: ResearchContainer, cuc: CurrentUserContainer) => (
          <>
            <br />
            <h2>Research</h2>
            {this.renderButtonBar()}
            <InfiniteScroll
              pageStart={0}
              loadMore={() => this.loadMoreItems(rc, cuc)}
              hasMore={this.state.hasMoreItems}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              <ResearchList companies={this.state.items} />
            </InfiniteScroll>
          </>
        )}
      </Subscribe>
    );
  }
}
