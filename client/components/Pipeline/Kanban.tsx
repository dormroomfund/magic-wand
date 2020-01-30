import React, { PureComponent } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Paginated } from '@feathersjs/feathers';
import client from '../../lib/client';
import transformData from '../../lib/pipelineUtils';
import {
  Status,
  archivedStates,
  companySchema,
  Company,
} from '../../schemas/company';
import Column from './Column';
import PartnerDropdown from './PartnerDropdown';
import PartnerTeamDropdown from './PartnerTeamDropdown';
import GroupButton from './GroupButton';
import IndividualButton from './IndividualButton';
import { DocumentTypes } from '../../schemas/gdrive';
import { User } from '../../schemas/user';
import { Team } from '../../schemas/common';
import { STAC } from '../../containers/ApplicationContainer';

const companyPartialSchema = {
  type: companySchema.type,
  required: companySchema.required,
  properties: {},
};

/*
 * Create a partial schema that is used for the react-json form. It grabs all the required properties
 * from the actual schema.
 */
companyPartialSchema.required.forEach((property) => {
  companyPartialSchema.properties[property] =
    companySchema.properties[property];
});

const formData = {
  status: 'applied',
};

const AppContainer = styled.div`
  display: flex;
`;

interface KanbanProps {
  user: User;
}

interface KanbanState {
  isLoading: boolean /* True if we are still grabbing data from api */;
  columns: Record<string, any>;
  columnOrder: string[];
  partners: Set<User>;
}

export default class Kanban extends PureComponent<KanbanProps, KanbanState> {
  constructor(props) {
    super(props);
    this.loadCompanies = this.loadCompanies.bind(this);
  }

  state = {
    isLoading: true,
    columns: {},
    columnOrder: [],
    partners: new Set([]),
  };

  async componentDidMount() {
    // should add 'default' as enum value to Team instead of giving as key directly?
    this.loadCompanies('default', 'ALL');
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const home = this.state.columns[source.droppableId];
    const foreign = this.state.columns[destination.droppableId];

    /** **************************************
     re-ordering within same column
     **************************************** */
    if (home === foreign) {
      const obj = home.companies[source.index];
      home.companies.splice(source.index, 1);
      home.companies.splice(destination.index, 0, obj);

      const newHome = {
        ...home,
      };

      const newColumns = this.state.columns;
      newColumns[source.droppableId] = newHome;

      const newState = {
        columns: newColumns,
      };

      this.setState(newState);
      return;
    }

    /** **************************************
     moving from one list to another
     ************************************ */

    /*
     * Find the column the company with this id and remove it.
     */
    let draggedObj;
    home.companies.forEach((companyObj, index) => {
      if (companyObj.id === draggableId) {
        draggedObj = companyObj;
        home.companies.splice(index, 1);
      }
    });

    const newHome = {
      ...home,
    };

    /*
     * Add the companyObj to the Destinations.
     */
    foreign.companies.splice(destination.index, 0, draggedObj);

    const newForeign = {
      ...foreign,
    };

    /*
     * Update the database with the new status of the company.
     * Note that draggableId is equivalent to the companyID.
     */
    try {
      client.service('api/companies').patch(draggableId, {
        status: newForeign.id,
      });
    } catch (e) {
      console.error(e);
    }

    const newState = {
      columns: {
        ...this.state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };

    this.setState(newState);
  };

  async loadCompanies(currentTeam, currentPartnerId) {
    console.log(currentTeam);
    console.log(currentPartnerId);
    try {
      const query = {
        status: {
          $nin: archivedStates,
        },
        $eager: 'pointPartners',
      };

      if (currentPartnerId !== 'ALL') {
        query.userId = currentPartnerId;
        query.$joinRelation = 'pointPartners';
      }
      if (currentTeam !== 'default') {
        query.team = currentTeam;
      }

      console.log(query);
      /* Get all companies that are not in archived state */
      const res = (await client.service('api/companies').find({
        query,
      })) as Paginated<Company>;
      const ret = transformData(res.data);
      this.setState({
        columnOrder: ret.columnOrder,
        columns: ret.columns,
        partners: ret.partners,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <STAC>
        {(ac) => (
          <div>
            <h2>
              {`${this.props.user.firstName} ${this.props.user.lastName}`}
            </h2>
            <div className="pipelineButtons">
              <PartnerDropdown
                partners={this.state.partners}
                reloadKanbanCompanies={this.loadCompanies}
              />
              <IndividualButton
                loggedInPartnerName={`${this.props.user.firstName} ${
                  this.props.user.lastName
                }`}
              />
              <GroupButton />
              <PartnerTeamDropdown reloadKanbanCompanies={this.loadCompanies} />
            </div>
            {this.state.isLoading ? (
              <div> Loading </div>
            ) : (
              <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <AppContainer className="pipelineColumns">
                    {this.state.columnOrder.map((columnId) => {
                      const column = this.state.columns[columnId];
                      return (
                        <Column
                          key={column.id}
                          id={column.id}
                          title={column.title}
                          companies={column.companies}
                        />
                      );
                    })}
                    <div className="addCompanyDiv">
                      <a
                        href="https://dormroomfund.typeform.com/to/H90ZNU"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <img src="/static/Add_Company_Button.png" />
                      </a>
                    </div>
                  </AppContainer>
                </DragDropContext>
              </div>
            )}
          </div>
        )}
      </STAC>
    );
  }
}
