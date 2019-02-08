import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-jsonschema-form';
import axios from 'axios';
import CompanyCard from './Company/CardView/CardView';
import schema from '../shared/schema';

const cschema = schema.companies;

const Container = styled.div`
  margin: 8px;
  npmborder-radius: 2px;
  width: 20vw;
  display: flex;
  flex-direction: column;
  border: 1px solid #e8e8e8;
  background-color: #e6e6e9;
`;

const Title = styled.h3`
  padding: 15px;
  margin-bottom: 0px;
  background-color: #0702d1;
  color: white;
`;
const CompanyList = styled.div`
  height: 70vh;
  overflow-y: scroll;
  flex-grow: 1;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? 'lightgrey' : 'inherit'};
`;

const companyPartialSchema = {
  type: cschema.type,
  required: cschema.required,
  properties: {},
};

companyPartialSchema.required.forEach((property) => {
  companyPartialSchema.properties[property] = cschema.properties[property];
});

const formData = {
  status: 'applied',
};

interface ColumnProps {
  column: any;
  companies: any;
}

interface ColumnState {
  visible: boolean /* Define the visibility of the add modal */;
  companies: any;
}

export default class Column extends React.Component<ColumnProps, ColumnState> {
  constructor(props) {
    super(props);
    this.state = { visible: false, companies: props.companies };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleClose = () => {
    this.setState({
      visible: false,
    });
  };

  submitModal = (data) => {
    axios
      .post('http://localhost:3000/api/companies', data.formData)
      .then((response) => {
        console.log(response);

        const newCompany = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
        };

        const newCompanies = this.state.companies.slice();
        newCompanies.push(newCompany);

        this.setState({
          visible: false,
          companies: newCompanies,
        });
      })
      .catch((error) => {
        // TODO: Add error handling
        console.log(error);
      });
  };

  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <CompanyList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.state.companies.map((company, index) => (
                <CompanyCard key={company.id} company={company} index={index} />
              ))}
              {provided.placeholder}
            </CompanyList>
          )}
        </Droppable>

        {/* Create an add button if this is the applies column */}
        {this.props.column.id === 'applied' ? (
          <div>
            <Button variant="primary" onClick={this.showModal}>
              Add Company
            </Button>
            <Modal show={this.state.visible} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add a Company</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form
                  schema={companyPartialSchema}
                  formData={formData}
                  onSubmit={this.submitModal}
                  onError={console.log('Error')}
                />
              </Modal.Body>
            </Modal>
          </div>
        ) : null}
      </Container>
    );
  }
}
