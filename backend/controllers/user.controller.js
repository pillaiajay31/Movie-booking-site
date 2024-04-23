import User from '../models/User' 
import bcrypt from 'bcryptjs'

export const getUsers = async(req,res,next) =>{
    let users;
    try
    {
        users = await User.find()
    }
    catch(e)
    {
        return next(e)
    }
    if(!users)
    {
        return res.status(500).json({message:"No User Found"})
    }
    return res.status(200).json({ users });
}

export const saveUser = async function(req,res,next)
{
    var name = req.body.name; 
    var email = (req.body.email).toLowerCase().trim();
    var password = req.body.password;

    if(name!== undefined && name !=="" && email!== undefined && email !== "" && password !== undefined && password !=="")
    {
        let user;
        const hashedPassword = bcrypt.hashSync(password);
        try
        {
            user = new User({name,email,password:hashedPassword})
            user = await user.save()
        }
        catch(e)
        {
            return next(e)
        }
        if(!user)
        {
            res.status(500).json({message:"Unexpected error"})
        }
        return res.status(201).json({ user })
    }
    else
    {
        return res.status(422).json({message:"Invalid Input"})
    }


} 

export const updateUser = async function(req,res,next) 
{
    let id = req.params.id;
    var name = req.body.name; 
    var email = (req.body.email).toLowerCase().trim();
    var password = req.body.password;
    if(name!== undefined && name !=="" && email!== undefined && email !== "" && password !== undefined && password !=="")
    {
        const hashedPassword = bcrypt.hashSync(password);
        let user;
        try
        {
            user = await User.findByIdAndUpdate(id,{name, email, password : hashedPassword})
            if(!user)
            {
                return res.status(404).json({message:"User not found"})
            }
        }
        catch(e)
        {
            return next(e)
        }
    }
    else
    {
        return res.status(422).json({message:"Invalid Input"})
    }
    res.status(201).json({message:"Updated successfully"})

}

export const removeUser = async function(req,res,next)
{
    const userId = req.params.id;
    try
    {
        const user = await User.findOneAndDelete({_id: userId});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch(e)
    {
        return next(e);
    }
}

export const loginUser = async function(req,res,next)
{
    var email = (req.body.email).toLowerCase().trim();
    var password = req.body.password;

    if(email !== undefined && email!=='' && password !== undefined && password !=='')
    {
        if(!email && !password)
        {
            return res.status(404).json({message:"Please enter email and password"})
        }
        else
        {
            let user = await User.findOne({ email })

            if(!user)
            {
                return res.status(404).json({message:"Email or password incorrect"})
            }
            else
            {
                var passwordVerification = bcrypt.compareSync(password,user.password)
            }
            if(passwordVerification == true)
            {
                return res.status(200).json({message:"Login successfull"})
            }
            else
            {
                return res.status(404).json({message:"Email or password incorrect"})
            }
        }
        return
       
    }

}