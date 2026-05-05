import express from 'express';
import {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} from '../handlers/bookHandlers.js';

const router = express.Router();

router.post('/', addBookHandler);
router.get('/', getAllBooksHandler);
router.get('/:bookId', getBookByIdHandler);
router.put('/:bookId', editBookByIdHandler);
router.delete('/:bookId', deleteBookByIdHandler);

export default router;
