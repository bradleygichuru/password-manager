import {
    checkIfUserExists,
    addUser, retrieveUserData, addPassword
} from '../../lib/pipeline'
import { generateToken } from '../../lib/authtools';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        let existence = await checkIfUserExists(req.body.username);

        if (req.body.password && req.body.username) {

            //TODO deal with cookie expiration and link with jwt and check for expiry
            console.log({ existence: existence });//debug log 
            if (existence) {
                //TODD fix invalid password functionality 
                console.log("user exists");//debug log
                let test = generateToken(`${req.body.password + req.body.username}`, req.body.password)
                let data = await retrieveUserData(test);
                console.log({ usertoken: data.token })//debug log
                res
                    //.cookie('authtoken', data.token)//TODO find alternative to set cookies
                    .status(200)
                    .json({ user: data, existence: existence })//return object to finish authentication 

                //console.log({ id: existence._id })//debug log
            } else if (!existence) {
                console.log("user does not exist"); //DEBUG log 


                //TODO find a way to tell the user they are being registered
                let token = generateToken(
                    req.body.password + req.body.username,
                    req.body.password
                )
                //console.log({id:existence._id})//debug log
                addUser({
                    username: req.body.username,
                    password: req.body.password,
                    payload: [],
                    token: token,
                });
                res
                    .status(200)
                    .json({ user: data, existence: existence })
            }
        }
    }
}

