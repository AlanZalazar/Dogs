import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getDogs } from "../../redux/actions";
import { getTemps } from "../../redux/actions";
import styles from "./Form.module.css";


const Form = () => {
  const allDogs = useSelector(state => state.allDogs);
  const allTemps = useSelector(state => state.temps); 
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getDogs()); //cargo los dogs
      dispatch(getTemps()); //cargo los temps
  }, [dispatch]);
  
    const [form,setForm] = useState({
        name:"",
        minWeight:"",
        maxWeight:"",
        weight:"", 
        minHeight:"",
        maxHeight:"",  
        height:"",
        minYears:"",
        maxYears:"",
        image:"",
        years:"",
        Temps:[],
        newTemp:"",
    })

    const [errors,setErrors] = useState({
        name:"",
        weight:"",
        height:"",
        years:"",
        Temps:"",
        image:"",
    })

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
          
      setForm({ ...form, [property]: value });
      validate({ ...form, [property]: value });
    }

    const validateName = (name) => {
      if (!name) {
        return "El campo está vacío";
      } else if (/[^a-zA-Z\s]/.test(name)) {
        return "Hay un error en el nombre";
      } else if (allDogs.some(dog => dog.name === name)) {
        return "Este nombre ya existe";
      } else {
        return "Ok";
      }
    };
    const validateWeight = (minWeight, maxWeight) => {
      if(!minWeight && !maxWeight){
        return "Ambos campos estan vacios."
      } else if (!minWeight){
        return "Peso minimo vacio."
      } else if (minWeight < 1){
        return "El peso minimo no puede ser menor a 1"
      } else if (!maxWeight){
        return "Peso maximo vacio."
      } else if (minWeight > maxWeight){
        return "El peso minimo no puede ser mayor al maximo."
      } else {
        return "Ok";
      }
    };
    const validateHeight = (minHeight, maxHeight) => {
      if (!minHeight && !maxHeight){
        return "Altura max y min vacios."
      } else if (!minHeight){
        return "Altura minima vacía."
      } else if (minHeight < 1){
        return "La altura minima no puede ser menor a 1."
      } else if (!maxHeight){
        return "Altura maxima vacía."
      } else if (minHeight > maxHeight){
        return "La altura minima no puede ser mayor a la maxima."
      } else {
        return "Ok"
      }
    };
    const validateYears = (minYears, maxYears) => {
      if (!minYears && !maxYears){
        return "Esperanza max y min vacios."
      } else if (!minYears){
        return "Esperanza minima vacía."
      } else if (minYears < 1){
        return "La esperanza minima no puede ser menor a 1."
      } else if (!maxYears){
        return "Esperanza maxima vacía."
      } else if (minYears > maxYears){
        return "La esperanza minima no puede ser mayor a la maxima."
      } else {
        return "Ok"
      }
    }
    const validateTemps = (Temps) => {
      if (Temps.length === 0) { // Verificar si el arreglo está vacío
        return "Seleccionar al menos 1 temperamento.";
      } else {
        return "Ok";
      }
    };
    const validateImage = (image) => {
      if (!image){
        return "Ok"
      } else if(!/\.(png|jpg|jpeg|gif)$/i.test(image)) {
        return "Hay un error en el link de image.";
      } else {
        return "Ok";
      }
    }
 
    const validate = (form) => {
      const nameError = validateName(form.name);
      const weightError = validateWeight(form.minWeight, form.maxWeight);
      const heightError = validateHeight(form.minHeight, form.maxHeight);
      const yearsError  = validateYears(form.minYears, form.maxYears);
      const tempsError = validateTemps(form.Temps);
      const imageError = validateImage(form.image);
    
      setErrors({
        ...errors,
        name: nameError,
        weight: weightError,
        height: heightError,
        years: yearsError,
        Temps: tempsError,
        image: imageError,
        
        // ... otros campos de error ...
      });
    };

    const submitHandler = (event) => {
        //event.preventDefault()

        const weightString = `${form.minWeight} - ${form.maxWeight}`;
        const heightString = `${form.minHeight} - ${form.maxHeight}`;
        const yearsString = `${form.minYears} - ${form.maxYears}`
        let updatedForm = {...form, weight: weightString, height: heightString, years: yearsString};

        if (form.image) { // Verificar si hay una imagen seleccionada
          updatedForm = {
            ...updatedForm,
            image: form.image, // Incluir la imagen solo si está presente
          };
        } else {
          delete updatedForm.image; // Eliminar la propiedad image si no hay imagen seleccionada
        }

        axios.post("/dogs", updatedForm)
        .then(alert("The god has been successfully created!"))
        dispatch(getDogs());       
    }

    const addTempHandler = () => {
      if (form.newTemp.trim() !== "") {
        const selectedTemp = allTemps.find(
          (temp) => temp.name === form.newTemp.trim()
        );
        if (selectedTemp) {
          setForm({
            ...form,
            Temps: [...form.Temps, selectedTemp.id], // Guardar solo el id
            newTemp: "",
          });
          validate({ ...form, Temps: [...form.Temps, selectedTemp.id] });
        }
      }
    };

    const removeTempHandler = (index) => {
      const updatedTemps = [...form.Temps];
      updatedTemps.splice(index, 1);
      setForm({
        ...form,
        Temps: updatedTemps,
      });
      validate({ ...form, Temps: updatedTemps });
    };
  
    // Filtrar temperamentos disponibles excluyendo los ya seleccionados
    const availableTemps = allTemps.filter(
      (temp) => !form.Temps.includes(temp.id) // Usar el ID para comparar
    );
    // Ordenar temperamentos disponibles alfabéticamente
    const sortedAvailableTemps = availableTemps.sort((a, b) => a.name.localeCompare(b.name));

    return (
      <form className={`${styles.formContainer} ${styles.backgroundImage}`} onSubmit={submitHandler}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            value={form.name}
            onChange={changeHandler}
            name="name"
            className={styles.formInput}
          />
          <span className={styles.error}>{errors.name}</span>
        </div>
    
        <div className={styles.formGroup}>
          <label>Weight:</label>
          <input
            type="number"
            placeholder="Min"
            value={form.minWeight}
            onChange={changeHandler}
            name="minWeight"
            className={styles.formInput}
          />
          <input
            type="number"
            placeholder="Max"
            value={form.maxWeight}
            onChange={changeHandler}
            name="maxWeight"
            className={styles.formInput}
          />
          <span className={styles.error}>{errors.weight}</span>
        </div>
    
        <div className={styles.formGroup}>
          <label>Height:</label>
          <input
            type="number"
            placeholder="Min"
            value={form.minHeight}
            onChange={changeHandler}
            name="minHeight"
            className={styles.formInput}
          />
          <input
            type="number"
            placeholder="Max"
            value={form.maxHeight}
            onChange={changeHandler}
            name="maxHeight"
            className={styles.formInput}
          />
          <span className={styles.error}>{errors.height}</span>
        </div>
    
        <div className={styles.formGroup}>
          <label>Lifespan:</label>
          <input
            type="number"
            placeholder="Min"
            value={form.minYears}
            onChange={changeHandler}
            name="minYears"
            className={styles.formInput}
          />
          <input
            type="number"
            placeholder="Max"
            value={form.maxYears}
            onChange={changeHandler}
            name="maxYears"
            className={styles.formInput}
          />
          <span className={styles.error}>{errors.years}</span>
        </div>
    
        <div className={styles.formGroup}>
          <label>Temps:</label>
          <select
            value={form.newTemp}
            onChange={changeHandler}
            name="newTemp"
            className={styles.formInput}
          >
            <option value="">Select Temp</option>
            {sortedAvailableTemps.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addTempHandler}
            className={styles.addButton}
          >
            Add Temp
          </button>
          <span className={styles.error}>{errors.Temps}</span>
        </div>
        {/* Mostrar los temperamentos seleccionados */}
        <div className={styles.tempsSelected}>
          {form.Temps.map((tempId, index) => (
            <div key={index} className={styles.tempChip}>
              {allTemps.find((temp) => temp.id === tempId)?.name}
              <button
                type="button"
                onClick={() => removeTempHandler(index)}
                className={styles.removeButton}
              >
                x
              </button>
            </div>
          ))}
        </div>
    
        <div className={styles.formGroup}>
          <label>Image:</label>
          <input
            type="text"
            value={form.image}
            onChange={changeHandler}
            name="image"
            className={styles.formInput}
          />
          <span className={styles.error}>{errors.image}</span>
        </div>
    
        <button
          type="submit"
          disabled={Object.values(errors).some((error) => error !== "Ok")}
          className={styles.submitButton}
        >
          CREATE
        </button>
      </form>
    );
  }
  
  export default Form;

