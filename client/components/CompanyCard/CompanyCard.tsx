import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Card from 'react-bootstrap/lib/Card';
import styled, { StyledComponent } from 'styled-components';
import routes from '../../routes';
import { Company, Status } from '../../schemas/company';
import PartnerAssigner from '../Pipeline/PartnerAssigner/PartnerAssigner';
import PitchDateSelector from '../PitchDateSelector/PitchDateSelector';

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

  renderPitchDateButton() {
    if (this.props.status !== Status.Pitching) return null;

    return (
      <PitchDateSelector
        companyId={this.props.company.id}
        hideText={(props) => (
          <Button variant="secondary" {...props}>
            <span
              role="img"
              title="Set Pitch Date"
              aria-label="set pitch date button"
            >
              🗓️
            </span>
          </Button>
        )}
        showText={(props) => (
          <Button variant="secondary" {...props}>
            <span
              role="img"
              title="Cancel Setting Pitch Date"
              aria-label="cancel set pitch date button"
            >
              ❌
            </span>
          </Button>
        )}
        selectedText={(props) => (
          <Button variant="success" {...props}>
            <span
              role="img"
              title="Pitch Date Set"
              aria-label="set pitch date button"
            >
              ️ 🗓️
            </span>
          </Button>
        )}
      />
    );
  }

  renderVotingButton() {
    if (this.props.status !== Status.Pitching) return null;

    return (
      <Link route="vote" params={{ id: this.props.company.id }}>
        <Button>Vote</Button>
      </Link>
    );
  }

  renderOverdueWarning() {
    const daysSinceApplied =
      (+new Date() - +this.props.company.createdAt) / (1000 * 60 * 60 * 24);

    if (this.props.company.status !== Status.Applied || daysSinceApplied < 6)
      return null;

    return <p> Applied {daysSinceApplied} days ago </p>;
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
                  {this.renderOverdueWarning()}
                  <ButtonGroup aria-label="company card actions">
                    {this.renderPartnerAssignmentButton()}
                    {this.renderVotingButton()}
                    {this.renderPitchDateButton()}
                  </ButtonGroup>
                </Card.Body>
              </StyledCard>
            </CompanyContainer>
          )}
        </Draggable>
      </div>
    );
  }
}
