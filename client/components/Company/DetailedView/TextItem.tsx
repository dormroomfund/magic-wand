import React from "react";

const TextItem = ({ title, value }) => {
  return (
    <div>
      <h2> {title} </h2>
      <p> {value} </p>
    </div>
  );
};

export default TextItem;
