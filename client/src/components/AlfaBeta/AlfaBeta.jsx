import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortDogs } from '../../redux/actions';
import style from './AlfaBeta.module.css';

const AlfaBeta = () => {
  const [selectedOption, setSelectedOption] = useState('Default');
  const dispatch = useDispatch();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    dispatch(sortDogs(e.target.value));
  };

  return (
    <div className={style.container}>
      <span className={style.orderLabel}>ORDER: </span>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className={style.orderSelect}
      >
        <option value="Default">Default</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
    </div>
  );
};

export default AlfaBeta;