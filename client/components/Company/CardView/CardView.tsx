import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/lib/Button';
import Card from 'react-bootstrap/lib/Card';
import Layout from '../../Layout/Layout';

const CompanyContainer = styled.div`
  margin: 10px;
`;

interface Company {
  company: any;
  index: any;
}

export default class CompanyCard extends React.Component<Company> {
  render() {
    return (
      <Layout>
        <div>
          <Draggable
            draggableId={this.props.company.id}
            index={this.props.index}
          >
            {(provided, snapshot) => (
              <CompanyContainer
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
              >
                <Card style={{ width: '13rem' }}>
                  <Card.Body>
                    <Link href={`/company/${this.props.company.id}`}>
                      <Card.Link href={`/company/${this.props.company.id}`}>
                        {this.props.company.name}
                      </Card.Link>
                    </Link>
                  </Card.Body>
                </Card>
              </CompanyContainer>
            )}
          </Draggable>
        </div>
      </Layout>
    );
  }
}
