import express from 'express';
import Controller from '../controllers/controller.js';

const router = express.Router();

router.post("/GetUserData", Controller.getUserData);

export default router;