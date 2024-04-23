import express from "express";
import {saveAdmin, getAdmins, updateAdmin, loginAdmin} from '../controllers/admin.controller'
const adminRouter = express.Router()

adminRouter.post('/', saveAdmin);
adminRouter.post('/table', getAdmins);
adminRouter.post('/:id', updateAdmin);
adminRouter.patch('/login', loginAdmin);




export default adminRouter