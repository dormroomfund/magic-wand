import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { STAC } from '../../containers/ApplicationContainer';
import { Status, Company } from '../../schemas/company';
import CompanyCard from '../CompanyCard/CompanyCard';

const Container = styled.div`
  border-radius: 5px;
  width: 24%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e8e8e8;
  background-color: #e6e6e9;
`;

const Title = styled.h3`
  padding: 10px 15px;
  margin-bottom: 0px;
  background-color: #0702d1;
  color: white;
  border-radius: 5px 5px 0% 0%;
`;

interface CompanyListProps {
  isDraggingOver: boolean;
}

const CompanyList = styled.div<CompanyListProps>`
  height: 70vh;
  overflow-y: scroll;
  flex-grow: 1;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? '#DADDE0' : 'inherit'};
`;

interface ColumnProps {
  title: string;
  id: Status;
  companies: Company[];
}

export default class Column extends React.Component<ColumnProps> {
  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
        <Droppable droppableId={this.props.id}>
          {(provided, snapshot) => (
            <CompanyList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.companies.map((company, index) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  index={index}
                  status={this.props.id}
                />
              ))}
              {provided.placeholder}
            </CompanyList>
          )}
        </Droppable>
      </Container>
    );
  }
}
