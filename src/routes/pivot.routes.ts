import express from 'express';

const pivotRouter = express.Router();

pivotRouter.get('/');
pivotRouter.get('/:id');
pivotRouter.post('/');
pivotRouter.put('/:id');
pivotRouter.delete('/:id');

export { pivotRouter };