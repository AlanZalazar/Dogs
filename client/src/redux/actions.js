import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DOG = "GET_DOG";
export const GET_DOG_NAME = "GET_DOG_NAME";
export const GET_TEMPS = "GET_TEMPS";
export const SORT_DOGS = "SORT_DOGS";
export const GET_DOGS_BY_TEMP = "GET_DOGS_BY_TEMP";
export const SORT_DOGS_BY_WEIGHT = "SORT_DOGS_BY_WEIGHT";
export const GET_DOGS_BY_DB_API = "GET_DOGS_BY_DB_API";





// Acción para obtener todos los juegos
export const getDogs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/dogs");
      const dogsData = response.data;
      dispatch({
        type: GET_DOGS,
        payload: dogsData
      });
    } catch (error) {
      // Manejar cualquier error aquí si es necesario
      console.error("Error fetching dogs:", error);
    }
  };
};




export const getDog = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/dogs/${id}`);
      const dogData = response.data;
      
      dispatch({
        type: GET_DOG,
        payload: dogData
      });
    } catch (error) {
      // Manejar cualquier error aquí si es necesario
      alert("Error fetching game:", error);
    }
  };
};

export const getDogByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/dogs?name=${name}`);
      const dogData = response.data;
      
      // Aquí, utilizamos la propiedad `filteredGames` en lugar de `game`, para distinguir
      // entre los juegos filtrados y los juegos almacenados en el estado
      if (dogData.length > 0) {
        dispatch({
          type: GET_DOG_NAME,
          payload: dogData
        });
      } else {
        // Si no se encuentra ningún juego, puedes manejarlo o simplemente no dispatch nada
        // Por ejemplo, mostrar un mensaje de "No se encontraron juegos"
      }
    } catch (error) {
      // Manejar cualquier error aquí si es necesario
      console.error("Error fetching dogs by name:", error);
    }
  };
};



export const getTemps = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/temperaments`);
      const tempData = response.data;
      dispatch({
        type: GET_TEMPS,
        payload: tempData
      });
    } catch (error) {
      // Manejar cualquier error aquí si es necesario
      console.error("Error fetching temps:", error);
    }
  };
};

     export const getDogByTemp = (temp) => {
       return (dispatch, getState) => {
         const allDogs = getState().allDogs; // Obtener todos los perros desde el estado
         const filteredDogs = allDogs.filter((dog) =>
           dog.temps?.includes(temp)
         );
     
         dispatch({ type: GET_DOGS_BY_TEMP, payload: filteredDogs });
       };
     };  
     
     export const getDogsByDbApi = (option) => {
       return (dispatch, getState) => {
         const allDogs = getState().allDogs; // Obtener todos los juegos desde el estado
         let filteredDogs = [];
     
         if (option === 'All dogs') {
           // Mostrar todos los juegos
           filteredDogs = allDogs;
         } else if (option === 'DB dogs') {
           // Mostrar solo los juegos con "created: true"
           filteredDogs = allDogs.filter((dog) => dog.created === true);
         } else if (option === 'API dogs') {
           // Mostrar solo los juegos con "created: false"
           filteredDogs = allDogs.filter((dog) => dog.created === false);
         }
     
         dispatch({ type: GET_DOGS_BY_DB_API, payload: filteredDogs });
       };
     };
     
     export const sortDogs = (option) => {
  return (dispatch, getState) => {
    const filteredDogs = getState().filteredDogs;
    const allDogs = getState().allDogs;
    const defaultSortOption = 'Default'; // Definir el valor para el estado "default"
    
    let sortedDogs;

    if (option === defaultSortOption) {
      sortedDogs = [...allDogs]; // Ordenar todos los perros por ID ascendente
    } else if (filteredDogs.length > 0) {
      sortedDogs = [...filteredDogs]; // Ordenar perros filtrados
    } else {
      sortedDogs = [...allDogs]; // Ordenar todos los perros
    }

    if (option === "A-Z") {
      sortedDogs.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "Z-A") {
      sortedDogs.sort((a, b) => b.name.localeCompare(a.name));
    }

    dispatch({ type: SORT_DOGS, payload: sortedDogs });
  };
};
//     
//     
export const sortDogsByWeight = (option) => {
  return (dispatch, getState) => {
    const allDogs = getState().allDogs; // Obtener todos los perros desde el estado

    const sortedDogs = allDogs.filter((dog) => {
      const weightParts = dog.weight.split(" - ");
      
      if (weightParts.length !== 2) {
        return false; // Omitir si el formato no es correcto (no hay guión)
      }
      
      const [minWeight, maxWeight] = weightParts.map(part => parseFloat(part));
      
      if (isNaN(minWeight) || isNaN(maxWeight)) {
        return false; // Omitir si no se pueden convertir a números
      }
      
      return true;
    });

    if (option === "- Weight") {
      sortedDogs.sort((dogA, dogB) => {
        // eslint-disable-next-line no-unused-vars
        const [minA, maxA] = dogA.weight.split(" - ").map(part => parseFloat(part));
        // eslint-disable-next-line no-unused-vars
        const [minB, maxB] = dogB.weight.split(" - ").map(part => parseFloat(part));
        return minA - minB;
      });
    } else if (option === "+ Weight") {
      sortedDogs.sort((dogA, dogB) => {
        // eslint-disable-next-line no-unused-vars
        const [minA, maxA] = dogA.weight.split(" - ").map(part => parseFloat(part));
        // eslint-disable-next-line no-unused-vars
        const [minB, maxB] = dogB.weight.split(" - ").map(part => parseFloat(part));
        return maxB - maxA;
      });
    } else if (option === "Default") {
      sortedDogs.sort((dogA, dogB) => dogA.id - dogB.id); // Ordenar por ID ascendente
    }

    dispatch({ type: SORT_DOGS_BY_WEIGHT, payload: sortedDogs });
  };
};

