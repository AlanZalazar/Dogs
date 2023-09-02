import React from "react";
import styles from "./TempList.module.css";

const TempList = ({ temperaments }) => {
  return (
    <div className={styles["card"]}> {/* Utiliza la misma clase de card para dar estilo similar */}
      <h3 className={styles["centered-title"]}>Temperaments</h3> {/* Clase para centrar el título */}
      <ul className={styles["temperament-list"]}> {/* Utiliza la clase de estilo de la lista */}
        {temperaments.map((temp, index) => (
          <li key={index}>{temp}</li>
        ))}
      </ul>
    </div>
  );
};

export default TempList;