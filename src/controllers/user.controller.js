import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"

const registerUser = asyncHandler( async (req, res) => {
   




    const {fullName, email, username, password} = req.body
    console.log("email: ", email)

     
})




export {
    registerUser,

}