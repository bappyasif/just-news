import credUser from "@/models/credUser";
import { dbConnect } from "./connMongoWithMongoose";

export const authorizeUser = async (credentials) => {
    const {username, email, password} = credentials;
    let user = {name: username, email, password}

    dbConnect().then(() => console.log("begin process")).catch(err => console.log("mongo error!!"))

    const checkIfUserEmailExistAlready = await credUser.findOne({email: email})
    const userFound = await credUser.findOne({email, name: username, password})

    if(userFound) {
        console.log("found user")
        user.id = userFound._id
    } else {
        if(!checkIfUserEmailExistAlready) {
            console.log("new user");
            const newUser = new credUser(user);
            const userSaved = await newUser.save()

            if(userSaved) {
                console.log("new user is created");
                user.id = userSaved._id
            }
        } else {
            console.log("password mismatch")
        }
    }

    if(user?.id) {
        return Promise.resolve(user)
    } else {
        return Promise.resolve(null)
    }
}