const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function (next){
    const user = this; 

    if(!user.isModified('password')) return next();
    
    try{
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    }catch(err){
        console.log(err);
        throw new Error('No se pudo encripatar la contraseña');
    }
});

UserSchema.methods.comparePasword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);