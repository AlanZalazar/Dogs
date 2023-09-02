const { getTemperaments } = require("../controllers/tempsControllers");
const {Temp} = require("../db");

const getTemperamentsHandler = async (req,res) => {
    const temperaments = await getTemperaments()
    try {
        res.status(200).json(temperaments)
        
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
    
};

module.exports = { getTemperamentsHandler }