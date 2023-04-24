import express from 'express';
import { addEmploy, deleteEmploy, getAllEmploys, getSingleEmploy, updateSingleEmploy ,uploadImage,uploadDocument,getFilesInDirectory} from '../controllers/employController';
const router = express.Router();
  
router.get('/', getAllEmploys);
router.delete('/employ/:id', deleteEmploy);
router.get('/:id',getSingleEmploy)
router.post('/add',addEmploy);
router.put('/update/:id',updateSingleEmploy)
router.put('/image/:id',uploadImage)
router.put('/document/:id',uploadDocument)
router.get('/files/:id',getFilesInDirectory)
export default router;
