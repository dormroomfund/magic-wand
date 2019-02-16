import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import ArchiveContainer from '../../containers/ArchiveContainer';
import UserContainer from '../../containers/UserContainer';
import ArchiveList from './ArchiveList';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import { UnreachableCaseError } from '../../lib/errors';

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

  getFilteredCompanies(ac: ArchiveContainer, uc: UserContainer) {
    const { filter } = this.state;
    switch (filter) {
      case Filter.None:
        return ac.companies;
      case Filter.MySuccess:
        return ac.companies.filter(
          (co) =>
            co.status === 'funded' && co.point_partners.includes(uc.user.id)
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
          My Portfolio
        </Button>
      </ButtonGroup>
    );
  }

  render() {
    return (
      <Subscribe to={[ArchiveContainer, UserContainer]}>
        {(ac: ArchiveContainer, uc: UserContainer) => (
          <>
            {this.renderButtonBar()}
            <ArchiveList
              companies={this.getFilteredCompanies(ac, uc)}
              onArchiveCompany={ac.archiveCompany}
              onRestoreCompany={ac.restoreCompany}
            />
          </>
        )}
      </Subscribe>
    );
  }
}
