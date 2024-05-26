import express, { Router } from 'express';
import {getUsers, removeUser, saveUser, updateUser, loginUser, getBookingOfUser} from '../controllers/user.controller' 

const userRouter = express.Router();

userRouter.post('/table', getUsers);
userRouter.post('/', saveUser);
userRouter.post('/:id',updateUser)
userRouter.delete('/:id',removeUser)
// userRouter.post('/login',loginUser)
userRouter.patch('/login',loginUser)
userRouter.post('/bookings',getBookingOfUser)

export default userRouter;