import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Card from 'react-bootstrap/lib/Card';
import routes from '../../../routes';
import Layout from '../../Layout/Layout';
import Button from 'react-bootstrap/lib/Button';

const { Link } = routes;

const CompanyContainer = styled.div`
  margin: 10px;
`;

interface CompanyCardProps {
  company: any;
  index: any;
  status: any /* The status of the company */;
}

export default class CompanyCard extends React.Component<CompanyCardProps> {
  renderVotingButton() {
    if (this.props.status === 'pitch') {
      return (
        <Link route="vote" params={{ id: this.props.company.id }}>
          <Button>Vote!</Button>
        </Link>
      );
    }

    return null;
  }

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
                    <Card.Text>
                      <Link
                        route="company"
                        params={{ id: this.props.company.id }}
                      >
                        <Card.Link href={`/company/${this.props.company.id}`}>
                          {this.props.company.name}
                        </Card.Link>
                      </Link>
                    </Card.Text>
                    {this.renderVotingButton()}
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
