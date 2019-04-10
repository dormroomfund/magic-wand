import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/lib/Button';
import Card from 'react-bootstrap/lib/Card';
import styled from 'styled-components';
import routes from '../../routes';
import { Company, Status } from '../../schemas/company';
import Layout from '../Layout/Layout';
import PartnerAssigner from '../Pipeline/PartnerAssigner/PartnerAssigner';

const { Link } = routes;

const CompanyContainer = styled.div`
  margin: 0px 10px;
`;

const StyledCard = styled(Card)`
  padding: 0;
  width: 17rem;
  box-shadow: 1px 1px 1px #a5acb1;
  margin: 0;
`;

interface CompanyCardProps {
  company: Company;
  index: number;
  status: Status;
}

export default class CompanyCard extends React.Component<CompanyCardProps> {
  renderPartnerAssignmentButton() {
    if (this.props.status === Status.Pitching) return null;

    return <PartnerAssigner companyId={this.props.company.id} />;
  }

  renderVotingButton() {
    if (this.props.status !== Status.Pitching) return null;

    return (
      <Link route="vote" params={{ id: this.props.company.id }}>
        <Button>Vote</Button>
      </Link>
    );
  }

  render() {
    return (
      <div className="cards">
        <Draggable draggableId={this.props.company.id} index={this.props.index}>
          {(provided, snapshot) => (
            <CompanyContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <StyledCard>
                <StyledCard.Body>
                  <StyledCard.Text>
                    <Link
                      route="company"
                      params={{ id: this.props.company.id }}
                    >
                      <Card.Link href={`/company/${this.props.company.id}`}>
                        {this.props.company.name}
                      </Card.Link>
                    </Link>
                  </StyledCard.Text>
                  {this.renderPartnerAssignmentButton()}
                  {this.renderVotingButton()}
                </StyledCard.Body>
              </StyledCard>
            </CompanyContainer>
          )}
        </Draggable>
      </div>
    );
  }
}
