import { Request, Response } from "express";
import AnimalsServices from "../services/animalsServices";

const AnimalsController = {
    getAnimalById: undefined,

    async deleteAnimal(req: Request, res: Response): Promise<void> {
        const animalId: number = parseInt(req.params.id);

        try {
            const result = await AnimalsServices.deleteAnimal(animalId);
            res.status(200).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to delete animal" });
        }
    },

    async getAllAnimals(req: Request, res: Response): Promise<void> {
        try {
            const result = await AnimalsServices.getAllAnimals();
            res.status(200).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch animals" });
        }
    },

    async addAnimal(req: Request, res: Response): Promise<void> {
        const newAnimal = req.body;

        try {
            const addedAnimal = await AnimalsServices.addAnimal(newAnimal);
            res.status(200).json(addedAnimal);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to add animal" });
        }
    },


    async updateAnimal(req: Request, res: Response): Promise<void> {
        const animalId: number = parseInt(req.params.id);
        const newAnimal: any = req.body;

        try {
            const updatedAnimal = await AnimalsServices.updateAnimal(animalId, newAnimal);
            res.json({ message: "Animal updated", animal: updatedAnimal });
        } catch (error: any) {
            if (error.message.includes("not found")) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Failed to update animal" });
            }
        }
    }
};

export default AnimalsController;
