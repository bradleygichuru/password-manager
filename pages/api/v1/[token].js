import { retrieveUserData } from "../../../lib/pipeline"

export default async function handler(req, res) {
    console.log(req.query)
    let data = await retrieveUserData(req.query.token)
   
    res
        .status(200)
        .json(data);
}

