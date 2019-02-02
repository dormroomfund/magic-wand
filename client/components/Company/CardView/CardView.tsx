import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";

const CompanyContainer = styled.div`
  margin: 10px;
`;

interface Company {
  company: any,
  index: any
}

export default class CompanyCard extends React.Component<Company> {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
        <Draggable draggableId={this.props.company.id} index={this.props.index}>
          {(provided, snapshot) => (
            <CompanyContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <Card>
                <h3>{this.props.company.name} </h3>
                <p>{this.props.company.description} </p>
                {/*<Link to={`/company/${this.props.company.id}`}>*/}
                  {/*<Button style={{ float: "right" }} type="primary">*/}
                    {/*View*/}
                  {/*</Button>*/}
                {/*</Link>*/}
              </Card>
            </CompanyContainer>
          )}
        </Draggable>
      </div>
    );
  }
}
