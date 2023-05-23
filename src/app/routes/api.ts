import { Router } from 'express';
import welcomeController from '../controllers/welcomeController';
import drugController from '../controllers/drugController';

const router = Router();

router.get('/', (req, res) => welcomeController(req, res));
router.get('/drugs', (req, res) => drugController.drugs(req, res));
router.get('/drugs/:id', (req, res) => drugController.drug(req, res));

export default router;
