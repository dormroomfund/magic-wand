import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CompanyCard from "./Company/CardView/CardView";

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
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
  background-color: ${props =>
    props.isDraggingOver ? "lightgrey" : "inherit"};
`;

interface ColumnProps {
  column: any,
  companies: any
}

export default class Column extends React.Component<ColumnProps> {
  render() {
    return (
      <Container>
        <Title> {this.props.column.title} </Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <CompanyList
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {/*{this.props.companies.map((company, index) => (*/}
                {/*<CompanyCard key={company.id} company={company} index={index} />*/}
              {/*))}*/}
              {provided.placeholder}
            </CompanyList>
          )}
        </Droppable>
      </Container>
    );
  }
}
