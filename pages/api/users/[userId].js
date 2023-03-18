import connectMongo from '@/database/conn'
import { getUsers, postUser, putUser, deleteUser } from '@/database/controller'

export default async function handler(req, res) {

    const { method } = req

    switch(method){
        case "GET":
    }
}