import { Schema, models, model } from 'mongoose'

const userSchema = new Schema({
    supplierName: String, 
    address: String, 
    phone: Number
})

const Users = models.user || model('user',userSchema)
export default Users;