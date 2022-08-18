import React from "react";
import Styles from "./Failed.module.css";
import { Link } from "react-router-dom";
import "../../App.css";

const Failed = ({ message }) => {
  return (
    <div className={Styles.container}>
      <div className={`${Styles.error} ${Styles.alert}`}>
        <div className={Styles.alertBody}>{message}</div>
      </div>
      <Link to="/" className="button-68" role="button">
        Return Home
      </Link>
    </div>
  );
};

export default Failed;
