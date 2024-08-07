const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Minimum password is 6 characters']
    },
})

//fire a function after doc saved to db
userSchema.pre('save', async function (next){
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hashSync( this.password, salt)
   next();
     
})

const User = mongoose.model('user', userSchema);

module.exports = User;