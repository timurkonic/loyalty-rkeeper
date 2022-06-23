import express from 'express';
import Controller from '../controllers/controller.js';

const router = express.Router();

router.post("/GetUserData", Controller.getUserData);
router.post("/PostTransaction", Controller.postTransaction);

export default router;