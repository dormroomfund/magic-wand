import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Subscribe } from 'unstated';
import CompanyCard from '../Company/CardView/CardView';
import PipelineContainer from '../../containers/PipelineContainer';
import { Company } from '../../schemas/company';

const Container = styled.div`
  margin-right: 1.5%;
  border-radius: 2%;
  width: 20vw;
  display: flex;
  flex-direction: column;
  border: 1px solid #e8e8e8;
  background-color: #e6e6e9;
`;

const Title = styled.h3`
  padding: 10px 15px;
  margin-bottom: 0px;
  background-color: #0702D1;
  color: white;
  border-radius: 5% 5% 0% 0%;
`;

const CompanyList = styled.div`
  height: 70vh;
  overflow-y: scroll;
  flex-grow: 1;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? '#DADDE0' : 'inherit'};
`;

interface ColumnProps {
  title: string;
  id: string;
  companies: Company[];
}

interface ColumnState {
  companies: Company[];
}

export default class Column extends React.Component<ColumnProps, ColumnState> {
  constructor(props) {
    super(props);
    this.state = {
      companies: props.companies,
    };
  }

  renderCard = (company, pipe, index, status) => {
    console.log(status);
    const shouldDisplay = company.pointPartnersNames.has(
      pipe.state.currentPartner
    );
    const shouldDisplay2 = shouldDisplay || pipe.state.currentPartner === 'ALL';
    if (shouldDisplay2) {
      return (
        <CompanyCard
          key={company.id}
          company={company}
          index={index}
          status={status}
        />
      );
    }

    return null;
  };

  render() {
    return (
      <Subscribe to={[PipelineContainer]}>
        {(pipe: PipelineContainer) => (
          <Container>
            <Title>{this.props.title}</Title>
            <Droppable droppableId={this.props.id}>
              {(provided, snapshot) => (
                <CompanyList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.state.companies.map((company, index) =>
                    this.renderCard(company, pipe, index, this.props.id)
                  )}
                  {provided.placeholderf}
                </CompanyList>
              )}
            </Droppable>
          </Container>
        )}
      </Subscribe>
    );
  }
}
