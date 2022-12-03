import express from 'express';
import { getItems,createItem } from './Controller';
const router = express.Router();
router.get('/',getItems)
router.post('/',createItem);
export default router;