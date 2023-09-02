import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import style from "./Home.module.css";
import TempButton from "../../components/TempButton/TempButton"; 
import SwitchDbApi from "../../components/SwitchDbApi/SwitchDbApi";
import Weight from "../../components/Weight/Weight"; 
import AlfaBeta from "../../components/AlfaBeta/AlfaBeta";
import Paginated from "../../components/Paginated/Paginated";
import { getDogs } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;

  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const filteredDogs = useSelector((state) => state.filteredDogs);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  // Calcular la cantidad total de páginas
  const totalDogs = filteredDogs.length > 0 ? filteredDogs.length : allDogs.length;
  const totalPages = Math.ceil(totalDogs / 8);

  const history = useHistory();
  // eslint-disable-next-line
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    history.push(`?page=1`);
    setCurrentPage(1);
  }, [history, totalPages]);




  return (
    <div className={style.container}>
      <div className={style.filtersContainer}>
        <TempButton />
        <AlfaBeta />
        <Weight />
        <SwitchDbApi />
      </div>
      <Paginated currentPage={page} totalPages={totalPages} />
      <CardsContainer page={page} />
      <Paginated currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default Home;


