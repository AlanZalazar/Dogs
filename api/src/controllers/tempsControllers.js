const axios = require("axios");
const {Temp} = require("../db");
require('dotenv').config();
const {API_LINK} = process.env;

const cleanTemps = async (arr) => {
  const uniqueTemperaments = [];

  for (const e of arr) {
    if (e.temperament) {
      const arrStr = e.temperament.split(", ");
      for (const element of arrStr) {
        const foundIndex = uniqueTemperaments.findIndex((obj) => obj === element);
        if (foundIndex === -1) {
          uniqueTemperaments.push(element);

          // Verificar si el temperamento ya existe en la base de datos
          const existingTemp = await Temp.findOne({ where: { name: element } });
          if (!existingTemp) {
            // Si no existe, guardarlo en la base de datos
            await Temp.create({ name: element });
          }
        }
      }
    }
  }

  return uniqueTemperaments;
};

const getTemperaments = async () => {
  const apiTempsRaw = (await axios.get(`${API_LINK}`)).data;
  const apiTemps = await cleanTemps(apiTempsRaw);
  const dbTemps = await Temp.findAll();
const id = 1;
  if (dbTemps.length === 0) {
    for (const temp of apiTemps) {
      await Temp.create({ name: temp });
    }
  }

  //console.log(apiTemps);

  return dbTemps;
};



module.exports = { getTemperaments }

