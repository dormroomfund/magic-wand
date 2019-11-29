import React, { PureComponent } from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import styled from 'styled-components';
import { STAC } from '../../containers/ApplicationContainer';
import { User } from '../../schemas/user';

const StyledDropdown = styled(Dropdown)`
  border: none;
  margin: 0.5% 1%;
`;

interface DropdownProps {
  partners: Set<User>;
}

// biggest thing - where does the kanban view default get sorted by team (on a user, `partnerTeam`)??
// I'm not seeing it ... so we want to add a filter that does that? smh

// add another interface and rename the above?
// question is if can use this same CustomDropdown component and pass in a diff param
// here add a
// rename this to diff Partner dropdown
// could also add a third string parameter, like type -> set to
// export class TeamViewDropdown extends PureComponent<DropdownProps> {
//   renderItems = (teamView, pipeline) => (
//     <Dropdown.Item
//       key={teamView}
//       onSelect={() => pipeline.setCurrentTeamView(teamView)}
//     >
//       {teamView}
//     </Dropdown.Item>
//   );
//
//   render() {
//     return (
//       <STAC>
//         {(ac) => (
//           <StyledDropdown>
//             <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
//               Team Viewing
//             </Dropdown.Toggle>
//
//             <Dropdown.Menu>
//               // this.props.teamviews
//               {[...this.props.teamViews].map((teamView) =>
//                 this.renderItems(teamView, ac.pipeline)
//               )}
//             </Dropdown.Menu>
//           </StyledDropdown>
//         )}
//       </STAC>
//     );
//   }
// }

export default class CustomDropdown extends PureComponent<DropdownProps> {
  renderItems = (partner, pipeline) => (
    <Dropdown.Item
      key={partner}
      onSelect={() => pipeline.setCurrentPartner(partner)}
    >
      {partner}
    </Dropdown.Item>
  );

  render() {
    return (
      <STAC>
        {(ac) => (
          <StyledDropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
              Partner
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {[...this.props.partners].map((partner) =>
                this.renderItems(partner, ac.pipeline)
              )}
            </Dropdown.Menu>
          </StyledDropdown>
        )}
      </STAC>
    );
  }
}
