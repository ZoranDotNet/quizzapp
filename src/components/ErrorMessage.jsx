import React from "react";
import "../style.css";

const ErrorMessage = ({ children }) => {
  return <div className="errorMessage">{children}</div>;
};

export default ErrorMessage;
