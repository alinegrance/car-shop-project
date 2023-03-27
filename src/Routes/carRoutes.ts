import { Router } from 'express';
import CarController from '../Controllers/CarController';

const router = Router();

router.post('/', (req, res, next) => new CarController(req, res, next).create());

router.get('/', (req, res, next) => new CarController(req, res, next).getAll());

router.get('/:id', (req, res, next) => new CarController(req, res, next).getById());

export default router;