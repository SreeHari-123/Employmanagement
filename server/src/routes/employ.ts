import express from 'express';
import { addEmploy, deleteEmploy, getAllEmploys, getSingleEmploy, updateSingleEmploy } from '../controllers/employController';
const router = express.Router();
  
router.get('/', getAllEmploys);
router.delete('/employ/:id', deleteEmploy);
router.get('/:id',getSingleEmploy)
router.post('/add',addEmploy);
router.put('/update/:id',updateSingleEmploy)

export default router;
