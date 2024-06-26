const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'],
        trim: true,
        maxlength:[50, 'name cannot be more than 50 characters'],
    },
    username:{
        type:String,
        required:[true, 'must provide username'],
        trim: true,
        maxlength: [20,'username cannot be more than 20 characters'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'must provide password'],
        trim: true,
        minlength: [6, 'password must be at least 6 characters'],
    },
    phone:{
        type:String,
        required:[true,'must provide phone number'],
        trim: true,
        match:[
            /\d{10,11}/, 'Please provide a valid phone number'
        ],
    },
    address:{
        city:{
            type:String,
            required:true,
        },
        district:{
            type:String,
            required:true,
        },
        ward:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        enum:{
            values:['admin','user'],
            default:'user',
        }
    }
})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id, name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME},)
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)