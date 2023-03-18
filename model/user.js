import { Schema, models, model } from 'mongoose'

const userSchema = new Schema({
    name: String,
    supplierName: String, 
    address: String, 
    phone: Number
})

const User = models.user || model('user',userSchema)
export default Users;