import React from "react";
import styles from "./CardDetail.module.css";

const CardDetail = ({ image, weight, height, years }) => {
  return (
    <div className={styles["card-detail"]}>
      <div className={styles["image-container"]}>
        <img src={image} alt="" className={styles["card-image"]} />
      </div>
      <p>Weight: {weight}</p>
      <p>Height: {height}</p>
      <p>Lifespan: {years}</p>
    </div>
  );
};

export default CardDetail;