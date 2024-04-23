import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    email:{
        type: String
    },
    password:{
        type: String
    },
    moviesAdded: [{
        type: mongoose.Types.ObjectId,
        ref:'Movie',
    }],


});
var Admin = mongoose.model('Admin', AdminSchema, 'admins');
export default Admin;