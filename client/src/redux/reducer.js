import { 
  GET_DOG, GET_DOGS, 
  GET_TEMPS, 
  GET_DOG_NAME, 
  SORT_DOGS, 
  GET_DOGS_BY_TEMP, 
  SORT_DOGS_BY_WEIGHT, 
  GET_DOGS_BY_DB_API,
 
} from "./actions";

// Estado inicial
const initialState = {
    allDogs: [],
    allDogsBackup: [],
    detail: [],
    filteredDogs: [],
    temps: [],
    sortOrder: 'Default',
    selectedTemp: '',
  };
  
  // Reducer
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          allDogs: action.payload,
          allDogsBackup: action.payload,
        };
        case GET_DOG:
          return {
            ...state,
            detail: action.payload,
          };
          case GET_DOG_NAME:
            return {
              ...state,
              filteredDogs: action.payload, // Actualizamos filteredDogs con los perros filtrados
              
            };
            
            case GET_TEMPS:
              return {
                ...state,
                temps: action.payload,
              };
              case SORT_DOGS: 
              return {
                ...state,
                filteredDogs: action.payload,
              };
              case GET_DOGS_BY_TEMP: // Agrega el nuevo caso para GET_DOGS_BY_TEMP
      return {
        ...state,
        filteredDogs: action.payload,
       }
       case SORT_DOGS_BY_WEIGHT: // Agrega el nuevo caso para SORT_GAMES_BY_RATING
  return {
    ...state,
    filteredDogs: action.payload,
  };
  case GET_DOGS_BY_DB_API: // Agrega el nuevo caso para GET_GAMES_BY_DB_API
      return {
        ...state,
        filteredDogs: action.payload,
      };
              
      default:
        return state;
    }
  };
  
  export default rootReducer;