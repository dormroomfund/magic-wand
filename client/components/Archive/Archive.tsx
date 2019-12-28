import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ArchiveContainer from '../../containers/ArchiveContainer';
import CurrentUserContainer from '../../containers/CurrentUserContainer';
import ArchiveList from './ArchiveList';
import { UnreachableCaseError } from '../../lib/errors';
import { Status } from '../../schemas/company';

enum Filter {
  None,
  MySuccess,
}

interface ArchiveState {
  filter: Filter;
}

export default class Archive extends Component<{}, ArchiveState> {
  state = {
    filter: Filter.None,
  };

  getFilteredCompanies(ac: ArchiveContainer, cuc: CurrentUserContainer) {
    const { filter } = this.state;
    console.log(ac.companies);
    switch (filter) {
      case Filter.None:
        return ac.companies;
      case Filter.MySuccess:
        return ac.companies.filter(
          (co) =>
            co.status === Status.Funded &&
            co.pointPartners.find((partner) => partner.id === cuc.user.id)
        );
      default:
        throw new UnreachableCaseError(filter);
    }
  }

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
      <Subscribe to={[ArchiveContainer, CurrentUserContainer]}>
        {(ac: ArchiveContainer, cuc: CurrentUserContainer) => (
          <>
            <br />
            <h2>Research</h2>
            {this.renderButtonBar()}
            <ArchiveList companies={this.getFilteredCompanies(ac, cuc)} />
          </>
        )}
      </Subscribe>
    );
  }
}
