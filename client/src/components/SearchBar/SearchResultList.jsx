import React from 'react';
import { useSelector } from 'react-redux';
import DogCard from './DogCard'; // Importa el componente que muestra la tarjeta de un perro

const SearchResultList = () => {
  const filteredDogs = useSelector((state) => state.filteredDogs);
  const noDogsFound = useSelector((state) => state.noDogsFound);

  if (noDogsFound) {
    return <p>No dogs found with that name.</p>;
  }

  if (filteredDogs.length === 0) {
    return <p>No dogs found.</p>; // Mostrar un mensaje cuando no se encuentren resultados
  }

  return (
    <div>
      {filteredDogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
};

export default SearchResultList;