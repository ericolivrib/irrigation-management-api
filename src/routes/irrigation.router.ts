import express from 'express';

const irrigationRouter = express.Router();

irrigationRouter.get('/');
irrigationRouter.get('/:id');
irrigationRouter.post('/');
irrigationRouter.delete('/:id');

export { irrigationRouter };