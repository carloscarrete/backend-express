const User = require("../models/User");
const { generateToken } = require("../utils/manageToken");

const login = ('/login', async (req, res) => {

    const { email, password } = req.body;
    try{
        let user = await User.findOne({ email });
        if(!user) return res.status(403).json({ message: 'Las credenciales no coiciden' });
        const confirmPassword = await user.comparePasword(password);
        if(!confirmPassword) return res.status(403).json({ message: 'Las credenciales no coiciden' });

        const {token, expiresIn} = generateToken(user.id);
        console.log(token, expiresIn);

    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            message: error.message
        })
    }

    res.status(200).json({
        ok: true,
        message: 'Login Successful',
        name: req.body.name,
    })
});

const register = ('/register', async (req, res) =>{
    const { email, password } = req.body;
     try{
        let user = await User.findOne({email});
        if(user) throw new Error('El usuario ya existe');
        user = new User({email, password});
        await user.save();
        return res.status(201).json({ok: true});
    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            message: error.message
        })
    } 

})

const infoUser=async(req,res)=>{
    res.json({user:"correo@correo.com"});
};


module.exports = {login, register, infoUser};


