import axios from "axios";
import { useState, useEffect } from "react";

const useGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener la lista de géneros
    axios.get("http://localhost:3001/genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return genres;
};

export default useGenres;