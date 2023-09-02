const axios = require("axios");


const formatTemperaments = (dog) => {
  return dog.temps.map(temp => temp.name);
};

const formatDogData = (dog) => {
  return {
    id: dog.id,
    name: dog.name,
    image: dog.image,
    height: dog.height + " Cm",
    weight: dog.weight + " Kg",
    years: dog.years + " years",
    created: true,
    temps: formatTemperaments(dog)
  };
};

const cleanArray= (arr) => 
arr.map((e) => {
  return {
    id: e.id,
    name: e.name, 
    image: "https://cdn2.thedogapi.com/images/" + e.reference_image_id + ".jpg", 
    height: e.height.metric + " Cm", 
    weight: e.weight.metric + " Kg", 
    years: e.life_span, 
    created: false,
    temps: e.temperament ? e.temperament.split(", ") : []
  };
});





const cleanObj= async (obj) => {

  const transformObj = {
    id: obj.id,
    name: obj.name,
    image: "https://cdn2.thedogapi.com/images/" + obj.reference_image_id + ".jpg", 
    height: obj.height.metric + " Cm", 
    weight: obj.weight.metric + " Kg", 
    years: obj.life_span, 
    created: false,
    temps: obj.temperament ? obj.temperament.split(", ") : []
  };
  return transformObj;
};


module.exports = { formatDogData, cleanArray, cleanObj }