import fsPromises from 'fs/promises'
import path from "path"


const filePath = path.resolve("data", "zoo.json")

const AnimalsServices = {
    async getAllAnimals() {
        const data = await fsPromises.readFile(filePath, 'utf-8')
        return JSON.parse(data)
    },

    async deleteAnimal(animalId) {
        const animals = await this.getAllAnimals()
        const index = animals.findIndex(p => p.id === animalId)
        if (index === -1){
            throw new Error(`Animal ${animalId} not found`)
        }
        animals.splice(index, 1)
        await fsPromises.writeFile(filePath,
            JSON.stringify(animals, null, 2), "utf-8")

        return {message: `Animal ${animalId} delete`}
    },

    async updateAnimal(id, newAnimalData){
        const {animal, index, animals} = await this.findAnimalById(id)
        animals[index] = {...animal, ...newAnimalData}
        await this.saveAnimals(animals)
        return animals[index]
    }

}

export default AnimalsServices



