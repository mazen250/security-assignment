import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role:{
        type: String,
        default: 'user'
    }

})

const UserModel = mongoose.model('User', userSchema)
export default UserModel;