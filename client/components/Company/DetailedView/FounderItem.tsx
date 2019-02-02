import React from "react";
import Emoji from "../../Emoji.js";
import { Icon } from "antd";

const FounderItem = ({ name, linkedIn, school }) => {
  return (
    <div>
      <span>
        <Icon type="linkedin" theme="filled" style={{ color: "#0702d1" }} />
        <a href={linkedIn}> {name} </a>
      </span>
      <span style={{ marginLeft: "10px" }}>
        <Emoji symbol="🏫  " />
        {school}
      </span>
    </div>
  );
};

export default FounderItem;
