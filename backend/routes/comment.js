import {Router} from 'express';
const router = new Router();
import {checkAuth} from '../utils/checkAuth.js';
import { createComment } from '../controllers/comments.js';

//create comment
// http:// localhost:3002/api/comments/:id
router.post('/:id', checkAuth, createComment);

export default router;