import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogByName } from '../../redux/actions';
import style from './SearchBar.module.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const noDogsFound = useSelector((state) => state.noDogsFound);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getDogByName(searchTerm));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="Search for name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {noDogsFound && <p>No dogs found with that name.</p>} {/* Muestra el mensaje si noDogsFound es true */}
    </div>
  );
};

export default SearchBar;