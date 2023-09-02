const { Router } = require("express");

const {
    getDogsHandler,
    getDogHandler,
    createDogHandler
} = require("../handlers/dogsHandlers");

const dogsRouter = Router();



dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/:idRaza", getDogHandler);

dogsRouter.post("/", createDogHandler);



module.exports = dogsRouter;