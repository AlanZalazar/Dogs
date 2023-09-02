import React from "react";
import styles from "./ID.module.css";

const ID = ({ id }) => {
  return <div className={styles["id"]}>ID:  {id}</div>;
};

export default ID;