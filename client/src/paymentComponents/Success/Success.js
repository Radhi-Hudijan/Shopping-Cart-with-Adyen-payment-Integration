import React from "react";
import Styles from "./Success.module.css";
import { Link } from "react-router-dom";
import "../../App.css";

const Success = ({ message }) => {
  return (
    <div className={Styles.container}>
      <div className={`${Styles.success} ${Styles.alert}`}>
        <div className={Styles.alertBody}>{message}</div>
      </div>
      <Link to="/" className="button-68" role="button">
        Return Home
      </Link>
    </div>
  );
};

export default Success;
