import React from "react";
import Emoji from "../../Emoji.js";
import { Button } from "antd";
import styled from "styled-components";

import PartnerTags from "./PartnerTags";

const StyledDiv = styled.div`
  margin-top: 5%;
  align-self: start;

  &&& .partners h2 {
    margin-bottom: 0px;
  }

  & > div {
    margin: 5% 0% 5% 0%;
  }

  & :not(:first-child) {
    margin-top: 2%;
  }
`;

const Text = styled.span`
  font-size: 16px;
`;

/****************************************
 * you can access the current stage with props.attributes.stage
 * then you can conditionally render any button you want
 * *****************************************/

const RightSection = ({ props }) => {
  return (
    <StyledDiv>
      <div>
        <Button
          href={"https://drf.vc/"}
          style={{ marginRight: "15px" }}
          type="primary"
        >
          <Text>
            <span> Pitch Deck </span>
          </Text>
        </Button>
        <Button type="primary" href={"https://drf.vc/"}>
          <Text>
            <span> Snapshot </span>
          </Text>
        </Button>
      </div>

      <div>
        <div>
          <Text>
            <Emoji symbol="🔗 " />
            Website:
            <a href={"https://drf.vc/"}> https://drf.vc/ </a>
          </Text>
        </div>

        <div>
          <Text>
            <Emoji symbol="✉️ " />
            Point Contact:
            <a href={"https://drf.vc/"}> ydejene@dormroomfund.com </a>
          </Text>
        </div>
      </div>

      <div className="partners" style={{ height: "150px" }}>
        <h2> Partners </h2>
        <PartnerTags />
      </div>

      {/* Add Vote, Pre-vote or any stage related buttons here  */}
      <div>
        <Button
          href={"https://drf.vc/"}
          style={{
            marginRight: "15px",
            backgroundColor: "#52c41a",
            borderColor: "#52c41a"
          }}
          type="primary"
        >
          <Text>
            <span> Vote </span>
          </Text>
        </Button>

        <Button
          style={{
            backgroundColor: "#f5222d",
            borderColor: "#f5222d"
          }}
          type="primary"
        >
          <Text>
            <span> Pass </span>
          </Text>
        </Button>
      </div>
    </StyledDiv>
  );
};

export default RightSection;
