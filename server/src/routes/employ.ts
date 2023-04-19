import express from 'express';
import { addEmployees, deleteEmployee, getAllEmployees, getSingleEmploy } from '../controllers/employController';
const router = express.Router();
  
router.get('/', getAllEmployees);
router.delete('/employ/:id', deleteEmployee);
router.get('/:id',getSingleEmploy)
router.post('/add',addEmployees);


export default router;
