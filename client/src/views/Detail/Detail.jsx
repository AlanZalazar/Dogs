import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDog } from "../../redux/actions";
import { useParams } from "react-router-dom";
import CardDetail from "./DetailComponents/CardDetail";
import TempList from "./DetailComponents/TempList";
import ID from "./DetailComponents/ID";
import styles from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDog(id));
  }, [dispatch, id]);

  const dogDetail = useSelector((state) => state.detail);

  if (!dogDetail) {
    return <p>No dog with that id found... 😢</p>; // Muestra un mensaje si no hay perros para mostrar
  }
  

  return (
    <div className={styles.backgroundImage}>
      <div className={styles.tittle}>

      <h2>{dogDetail.name}</h2>
      </div>
      <div>
        <div className={`${styles["left-column"]} ${styles["left-content"]}`}>
        <CardDetail
          image={dogDetail.image}
          weight={dogDetail.weight}
          height={dogDetail.height}
          years={dogDetail.years}
        />
        {dogDetail.temps && <TempList temperaments={dogDetail.temps} />}
      </div>
      <ID id={dogDetail.id} />
    </div>
    </div>
  );
};

export default Detail;