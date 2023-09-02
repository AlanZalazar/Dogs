import React from "react";
import { Link, useLocation } from "react-router-dom"; // Importa useLocation desde react-router-dom
import style from "./NavBar.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";

const NavBar = () => {
  const location = useLocation(); // Obtiene la información de la ubicación actual

  return (
    <div className={style.mainContainer}>
      <Link to="/home">DOGS</Link>
      {location.pathname === "/home" && <SearchBar />}
      <Link to="/create">CREATE DOG</Link>
    </div>
  );
};

export default NavBar;