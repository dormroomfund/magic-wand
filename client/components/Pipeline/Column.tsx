import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Subscribe } from 'unstated';
import CompanyCard from '../Company/CardView/CardView';
import PipelineContainer from '../../containers/PipelineContainer';

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

interface ColumnProps {
  title: any;
  id: any;
  companies: any;
}

interface ColumnState {
  companies: any;
}

export default class Column extends React.Component<ColumnProps, ColumnState> {
  constructor(props) {
    super(props);
    this.state = {
      companies: props.companies,
    };
  }

  renderCard = (company, pipe, index) => {
    const shouldDisplay = company.pointPartnersNames.has(
      pipe.state.currentPartner
    );
    const shouldDisplay2 = shouldDisplay || pipe.state.currentPartner === 'ALL';
    if (shouldDisplay2) {
      return <CompanyCard key={company.id} company={company} index={index} />;
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
                    this.renderCard(company, pipe, index)
                  )}
                  {provided.placeholder}
                </CompanyList>
              )}
            </Droppable>
          </Container>
        )}
      </Subscribe>
    );
  }
}
