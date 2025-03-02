import { Router } from 'express';
import { getAnimals, updateAnimal, deleteAnimal } from '../controllers/animalController';

const router = Router();

router.get('/animals', getAnimals);
router.put('/animals/:id', updateAnimal);
router.delete('/animals/:id', deleteAnimal);

export default router;