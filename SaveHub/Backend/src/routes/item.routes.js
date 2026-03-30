import {Router} from 'express';
import {saveItem} from '../controllers/item.controller.js';
import authUser from '../middlewares/auth.middleware.js';
const itemRouter = Router();

itemRouter.post('/save', authUser, saveItem);


export default itemRouter;