import fsPromises from 'fs/promises';
import path from 'path';

interface Animal {
    id: number;
    name: string;
    species: string;
    age: number;
    isEndangered: string;
    habitat: string;
}

const filePath = path.resolve('data', 'zoo.json');

const AnimalsServices = {
    async getAllAnimals(): Promise<Animal[]> {
        const data = await fsPromises.readFile(filePath, 'utf-8');
        return JSON.parse(data) as Animal[];
    },

    async deleteAnimal(animalId: number): Promise<{ message: string }> {
        const animals = await this.getAllAnimals();
        const index = animals.findIndex(p => p.id === animalId);

        if (index === -1) {
            throw new Error(`Animal ${animalId} not found`);
        }

        animals.splice(index, 1);
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf-8');

        return { message: `Animal ${animalId} deleted` };
    },

    async updateAnimal(id: number, newAnimalData: Partial<Animal>): Promise<Animal> {
        const { animal, index, animals } = await this.findAnimalById(id);
        animals[index] = { ...animal, ...newAnimalData };
        await this.saveAnimals(animals);
        return animals[index];
    },

    async findAnimalById(id: number): Promise<{ animal: Animal; index: number; animals: Animal[] }> {
        const animals = await this.getAllAnimals();
        const index = animals.findIndex((a) => a.id === id);

        if (index === -1) {
            throw new Error(`Animal ${id} not found`);
        }

        return { animal: animals[index], index, animals };
    },

    async saveAnimals(animals: Animal[]): Promise<void> {
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf-8');
    }
};

export default AnimalsServices;
