import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/lib/Button';
import Card from 'react-bootstrap/lib/Card';
import styled from 'styled-components';
import routes from '../../../routes';
import { Company, Status } from '../../../schemas/company';
import Layout from '../../Layout/Layout';
import PartnerAssigner from '../../Pipeline/PartnerAssigner/PartnerAssigner';

const { Link } = routes;

const CompanyContainer = styled.div`
  margin: 10px;
`;

interface CompanyCardProps {
  company: Company;
  index: number;
  status: Status;
}

export default class CompanyCard extends React.Component<CompanyCardProps> {
  renderPartnerAssignmentButton() {
    if (this.props.status !== Status.Applied) return null;

    return <PartnerAssigner company={this.props.company} />;
  }

  renderVotingButton() {
    if (this.props.status !== Status.Pitching) return null;

    return (
      <Link route="vote" params={{ id: this.props.company.id }}>
        <Button>Vote!</Button>
      </Link>
    );
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
                    {this.renderPartnerAssignmentButton()}
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
