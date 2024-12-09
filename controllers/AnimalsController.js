import AnimalsService from "../services/AnimalsService.js";

const AnimalsController = {

    async deleteAnimal(req, res) {
        const animalId = parseInt(req.params.id)

        try{
            const result = await AnimalsService.deleteAnimal(animalId)
            res.status(200).json(result)
        }catch(err){
            console.error(err)
        }
    },

    async getAllAnimals(req, res) {
        try{
            const result = await AnimalsService.getAllAnimals()
            res.status(200).json(result)
        }catch(err){
            console.error(err)
        }
    }
}

export default AnimalsController



