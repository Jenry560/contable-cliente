import React from "react";
import "../stilos/Loader.css";

const Loader = () => {
  return (
    <div className="lds-ringx">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
