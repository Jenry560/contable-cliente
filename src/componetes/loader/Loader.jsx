import React from "react";
import "../loader/loader.css";

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
