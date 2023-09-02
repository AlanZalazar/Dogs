const { createDog, getDogById, searchDogByName, getAllDogs } = require("../controllers/dogsControllers")


const getDogsHandler = async (req,res) => {
    const { name } = req.query;

    const results = name ? await searchDogByName(name) : await getAllDogs();

    res.status(200).json(results);
};


const getDogHandler = async (req,res) => {
    const {idRaza} = req.params;

    const source = isNaN(idRaza) ? "bdd" : "api";

    try {
        const dog = await getDogById(idRaza, source);
        res.status(200).json(dog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const createDogHandler = async (req,res) => {
    const { name, image, height, weight, years, Temps } = req.body;
    try {
        const newDog = await createDog(name, image, height, weight, years, Temps)
        res.status(201).json(newDog)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
};

module.exports = {
    getDogsHandler,
    getDogHandler,
    createDogHandler
};