import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortDogsByWeight } from '../../redux/actions';
import style from './Weight.module.css'; // Asegúrate de que el archivo CSS esté importado correctamente con la ubicación correcta

const Weight = () => {
  const [selectedOption, setSelectedOption] = useState('Default');
  const dispatch = useDispatch();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    dispatch(sortDogsByWeight(e.target.value));
  };

  return (
    <div className={style.container}>
      <span className={style.label}>Weight: </span>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className={style.select}
      >
        <option value="Default">Default</option>
        <option value="+ Weight">Max-Min</option>
        <option value="- Weight">Min-Max</option>
      </select>
    </div>
  );
};

export default Weight;