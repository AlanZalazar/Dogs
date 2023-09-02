import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './SwitchDbApi.module.css'; // Asegúrate de que el archivo CSS esté importado correctamente con la ubicación correcta
import { getDogsByDbApi } from '../../redux/actions';

const SwitchDbApi = () => {
  const [selectedOption, setSelectedOption] = useState('All games');
  const dispatch = useDispatch();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    dispatch(getDogsByDbApi(e.target.value));
  };

  return (
    <div className={style.container}>
      <span className={style.label}>Origin: </span>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className={style.select}
      >
        <option value="All dogs">All dogs</option>
        <option value="DB dogs">DB dogs</option>
        <option value="API dogs">API dogs</option>
      </select>
    </div>
  );
};

export default SwitchDbApi;