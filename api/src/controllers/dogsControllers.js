const { Dog } = require("../db")
const { Temp } = require("../db")
const axios = require("axios");
const { Sequelize } = require("sequelize")
require('dotenv').config();
const {
  API_LINK
} = process.env;


const { formatDogData, cleanArray, cleanObj } = require("./utils");


const createDog = async (name, image, height, weight, years, temps) => {
  const newDog = await Dog.create({name, image, height, weight, years, temps});

  await newDog.addTemp(temps); // Agrego temperamentos al perro creado

  const aux = await Dog.findByPk(newDog.id, { include: Temp });

  return formatDogData(aux);
};


const getDogById = async (idRaza, source) => {
    let dog;

    if (source === "api") {
        const response = await axios.get(`${API_LINK}/${idRaza}`);
        dog = response.data;
    } else {
        dog = await Dog.findByPk(idRaza, { include: Temp });
    }

    if (source === "api") {
        return cleanObj(dog, idRaza);
    }

    return formatDogData(dog);
};


const getAllDogs = async () => {
    const dbDogs = await Dog.findAll({ include: Temp });

    const apiDogsRaw = (await axios.get(`${API_LINK}`)).data;
    const apiDogs = cleanArray(apiDogsRaw);

    const formattedDbDogs = dbDogs.map(formatDogData); // Formatear perros de la base de datos

    return [...formattedDbDogs, ...apiDogs];
};


const searchDogByName = async (name) => {
    const lowerCaseName = name.toLowerCase();
  
    // Buscar en la base de datos
    const dbDogsName = await Dog.findAll({
      where: {
        [Sequelize.Op.and]: [
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('dog.name')), 'LIKE', '%' + lowerCaseName + '%')
        ]
      },
      include: [{
        model: Temp,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      }],
    });
  
    // Buscar en la API
    const apiDogsRaw = (await axios.get(`${API_LINK}/search?q=${name}`)).data;
    const apiDogs = [];
  
    for (const apiDogRaw of apiDogsRaw) {
      const apiDog = await cleanObj(apiDogRaw);
      apiDogs.push(apiDog);
    }
  
    if (dbDogsName.length === 0 && apiDogs.length === 0) {
      return "No se encontraron razas de perros con ese nombre";
    }

    const formattedDbDogs = dbDogsName.map(formatDogData);
  
    const result = [...formattedDbDogs, ...apiDogs];
  
    return result;
};


module.exports = { createDog, getDogById, searchDogByName, getAllDogs };