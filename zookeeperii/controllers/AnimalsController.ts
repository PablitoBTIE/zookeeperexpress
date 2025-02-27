import AnimalsServices from "../services/animalsServices.js";

const AnimalsController = {

    async deleteAnimal(req, res) {
        const animalId = parseInt(req.params.id)

        try{
            const result = await AnimalsServices.deleteAnimal(animalId)
            res.status(200).json(result)
        }catch(err){
            console.error(err)
        }
    },

    async getAllAnimals(req, res) {
        try{
            const result = await AnimalsServices.getAllAnimals()
            res.status(200).json(result)
        }catch(err){
            console.error(err)
        }
    },



    async updateAnimal(req, res){
        const animalId = parseInt(req.params.id)
        const newAnimal = req.body

        try {
            const updateAnimal = await AnimalsServices.updateAnimal(animalId, newAnimal)
            res.json({message: "Animal updated", book: updateAnimal})
        } catch (error) {
            if(error.message.includes("not found")){
                res.status(404).json({message: error.message})
            } else {
                res.status(500).json({message: "Failed to update Animal"})
            }
        }
    }

}


export default AnimalsController



