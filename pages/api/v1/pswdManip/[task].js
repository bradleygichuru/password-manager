import { addPassword, removePasswords } from "../../../../lib/pipeline";
import { parseCookies } from "../../../../lib/cookiehelper";
import { retrieveUserData } from "../../../../lib/pipeline";
export default async function handler(req, res) {

    if (req.method === 'POST') {
        console.log(req.query)
        const token = parseCookies(req).token
        console.log(token)
        if (req.query.task == 'add') {
           
            console.log({ site: req.body.siteurl, username: req.body.username, password: req.body.password })//DEBUG log 
            let result = await addPassword({ site: req.body.siteurl, username: req.body.username, password: req.body.password }, token)
            if (result) {
                let data = await retrieveUserData(token)

                res
                    .status(200)
                    .json(data);
            }

        }
        if (req.query.task == 'delete') {
            //TODO add logic
            removePasswords(req.body.token, req.body.candidate)
            res
                .status(200)
                .json({ status: 'success' });
        }
    }

}