import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemps, getDogByTemp } from '../../redux/actions';
import style from './TempButton.module.css';

const TempButton = () => {
  const [selectedTemp, setSelectedTemp] = useState('');
  const temps = useSelector((state) => state.temps);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemps()); // Obtenemos los géneros al cargar el componente
  }, [dispatch]);

  const handleTempChange = (e) => {
    setSelectedTemp(e.target.value);
    dispatch(getDogByTemp(e.target.value)); // Filtramos los juegos por género al cambiar la selección
  };

  const sortedTemps = [...temps].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={style.genreButton}>
      <span className={style.genreLabel}>TEMPS: </span>
      <select
        value={selectedTemp}
        onChange={handleTempChange}
        className={style.genreInput}
      >
        <option value="">Select Temp</option> {/* Cambiamos el valor "Select Genre" a "input" */}
        {sortedTemps.map((temp) => (
          <option key={temp.id} value={temp.name}>
            {temp.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TempButton;