import Admin from "../models/admin.model"; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const saveAdmin = async function(req,res,next)
{
    var email = (req.body.email).toLowerCase().trim();
    var password = req.body.password;
    var moviesAdded = req.body.movies;
    if(email !== undefined && email!=='' && password !== undefined && password !=='' && moviesAdded !== undefined && moviesAdded !== '')
    {
        let admin;
        let existingAdmin 

        try
        {
            let newPassword = bcrypt.hashSync(password)
            existingAdmin = await Admin.findOne({email})
            if(existingAdmin)
            {
                return res.status(404).json({message:"Email already registered"});
            }
            else
            {
                admin = new Admin({email,password: newPassword,moviesAdded})
                admin = await admin.save({})     
            }
        }
        catch(e)
        {
            throw new Error(e);
        }

        if(!admin)
        {
            return res.status(404).json({message:"Unexpected error occured"});
        }
        return res.status(200).json({message:"Admin saved"});
    }
}

export const getAdmins = async function(req,res,next)
{
    let admins;
    let adminData;
    try
    {
        admins = await Admin.find({});
    }
    catch(e)
    {
        throw new Error(e);
    }
    if(!admins)
    {
        return res.status(400).json({message:"No users"})
    }
    
        return res.status(200).json({ admins })
}

export const updateAdmin = async function(req,res,next)
{
    var id = req.params.id;
    var email = (req.body.email).toLowerCase().trim();
    var password = req.body.password;
    var moviesAdded = req.body.movies;
    let admin;
    let existingAdmin;
    if(email !== undefined && email!=='' && password !== undefined && password !=='' && moviesAdded !== undefined && moviesAdded !== '')
    {
        const hashedPassword = bcrypt.hashSync(password);

        admin = new Admin({email,password: hashedPassword, moviesAdded})
        admin = await admin.save({})     
    
        if(!admin)
        {
            return res.status(404).json({message:"Unable to update"});
        }
        return res.status(200).json({message:"Data saved"});
    }
} 

export const loginAdmin  = async function(req,res,next)
{
    var email = (req.body.email).toLowerCase().trim();
    var password = req.body.password;
    var admin;
    if(email !== undefined && email!=='' && password !== undefined && password !=='')
    {
        try
        {
            if(!email && !password)
            {
                return res.status(404).json({message:"Please Enter Email and password"});
            }
            else
            {
                admin = await Admin.findOne({ email });
                if(!admin)
                {
                    return res.status(404).json({message:"Admin credential incorrect"});
                } 
                else
                {
                    var passwordVerification = bcrypt.compareSync(password,admin.password); 
                }
                if(passwordVerification == false)
                {
                    return res.status(404).json({message:"Admin credential incorrect"});
                }
                var token = jwt.sign({id: admin._id},process.env.SECRET_KEY,{
                    expiresIn: '7d'
                });


                return res.status(200).json({message:"Login succesfull!",token,id:admin._id});
            }
        }
        catch(e)
        {
            throw new Error(e);
        }
        
    }

}
