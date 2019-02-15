import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Form from 'react-jsonschema-form';
import axios from 'axios';
import CustomDropdown from './Dropdown';
import GroupButton from './GroupButton';
import IndividualButton from './IndividualButton';
import Column from './Column';
import transformData from '../../lib/utils';
import schema, { companySchema } from '../../shared/schema';

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

const axiosConfig = {
  headers: { 'Access-Control-Allow-Origin': '*' },
};

interface KanbanProps {
  user: any; // Defines the User object
}

interface KanbanState {
  isLoading: boolean /* True if we are still grabbing data from api */;
  columns: Object;
  columnOrder: Array<string>;
  partnerNames: Set<string>;
  isVisible: boolean /* True if the "Add" company modal is open */;
}

export default class Kanban extends PureComponent<KanbanProps, KanbanState> {
  state = {
    isLoading: true,
    columns: {},
    columnOrder: [],
    partnerNames: new Set([]),
    isVisible: false,
  };

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/companies?archived=false', axiosConfig)
      .then((response) => {
        const ret = transformData(response.data.data);
        this.setState({
          columnOrder: ret.columnOrder,
          columns: ret.columns,
          partnerNames: ret.partnerNames,
          isLoading: false,
        });
      })
      .catch((error) => {
        // TODO: Add error handling
        console.log(error);
      });
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
     re-oredering within same column
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
    axios
      .patch(`http://localhost:3000/api/companies/${draggableId}`, {
        status: newForeign.id,
      })
      .catch((error) => {
        console.log(error);
      });

    const newState = {
      columns: {
        ...this.state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };

    this.setState(newState);
  };

  showModal = () => {
    this.setState({
      isVisible: true,
    });
  };

  handleClose = () => {
    this.setState({
      isVisible: false,
    });
  };

  submitModal = (data) => {
    const status = data.formData.status;
    axios
      .post('http://localhost:3000/api/companies', data.formData)
      .then((response) => {
        console.log(response);

        const newCompany = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          pointPartnersNames: new Set([]),
        };

        const newColumns = this.state.columns;
        newColumns[status].companies.push(newCompany);

        this.setState({
          isVisible: false,
          columns: newColumns,
        });
      })
      .catch((error) => {
        // TODO: Add error handling
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Row>
          <CustomDropdown partners={this.state.partnerNames} />
          <GroupButton />
          <IndividualButton
            loggedInPartnerName={`${this.props.user.first_name} ${
              this.props.user.last_name
            }`}
          />
        </Row>
        {this.state.isLoading ? (
          <div> Loading </div>
        ) : (
          <div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <AppContainer>
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
              </AppContainer>
            </DragDropContext>
            <div>
              <Button variant="primary" onClick={this.showModal}>
                Add Company
              </Button>
              <Modal show={this.state.isVisible} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add a Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form
                    schema={companyPartialSchema}
                    formData={formData}
                    onSubmit={this.submitModal}
                  />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}
      </div>
    );
  }
}
