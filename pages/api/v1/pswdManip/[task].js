import { addPassword, editPassword, removePassword } from "../../../../lib/pipeline";
import { parseCookies } from "../../../../lib/cookiehelper";
import { retrieveUserData } from "../../../../lib/pipeline";
export default async function handler(req, res) {
    const token = parseCookies(req).token
    
    if (req.method === 'POST') {
       

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
        if (req.query.task == 'edit') {
            //logic to edit password entry
            editPassword(token, req.body.update)
            res
                .status(200)
                .json({ status: 'success' });
        }
        if (req.query.task == 'delete') {
            //logic to remove password entry
            let result = removePassword(token, req.body.candidate);
            if (result) {
                let data = await retrieveUserData(token)

                res
                    .status(200)
                    .json(data);
            }

        }
    }

}