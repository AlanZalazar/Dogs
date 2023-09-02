import React from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = ({ page }) => {

  

  const filteredDogs = useSelector((state) => state.filteredDogs);
  const allDogs = useSelector((state) => state.allDogs);

  const dogsPerPage = 8;
  const startIndex = (page - 1) * dogsPerPage;
  const endIndex = startIndex + dogsPerPage;
  const dogsToShow = filteredDogs.length > 0 ? filteredDogs : allDogs;
  const dogsToRender = dogsToShow.slice(startIndex, endIndex);

  // Verifica si dogsToRender es un array antes de mapearlo
  if (!Array.isArray(dogsToRender)) {
    return <p className={style.noDogsMessage}>No dog with that name found... 😢</p>; // Muestra un mensaje si no hay perros para mostrar
  }

  return (
    <div className={style.container}>
      {dogsToRender.map((dog) => {
        return (
          <Card
            key={dog.id}
            id={dog.id}
            image={dog.image}
            name={dog.name}
            temps={dog.temps}
            weight={dog.weight}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;

