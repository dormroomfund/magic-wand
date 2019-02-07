import React from "react";
import { Tag } from "antd";
import styled from "styled-components";

import TextItem from "./TextItem";
import FounderItem from "./FounderItem";

const StyledDiv = styled.div`
  margin-right: 30px;

  & > div {
    margin-top: 15px;
  }
`;
const LeftSection = ({ props }) => {
  return (
    <StyledDiv>
      {/* Title Section */}
      <div>
        <h1> {props.name} </h1>
      </div>

      {/* Tags Section  */}
      <div>
        <span>
          <Tag className="tag" color="geekblue">
            Enterprise
          </Tag>
          <Tag className="tag" color="geekblue">
            Data
          </Tag>
          <Tag className="tag" color="geekblue">
            Media
          </Tag>
        </span>
      </div>

      {/* Description Section  */}
      <TextItem title={"Description"} value={props.description} />

      {/* Founder Section  */}
      <div>
        <h2> Founders </h2>
        {[1, 2, 3].map(i => (
          <FounderItem
            key={i}
            name={"Mac Miller"}
            linkedIn={"https://drf.vc/"}
            school={"University of Pennsylvania"}
          />
        ))}
      </div>

      {/* WIP: Typeform Responses
            Need to get Typeform data to DB and API
        */}

      {[1, 2, 3, 4, 5].map(i => (
        <TextItem
          key={i}
          title={"Placeholder"}
          value={`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.`}
        />
      ))}
    </StyledDiv>
  );
};

export default LeftSection;
