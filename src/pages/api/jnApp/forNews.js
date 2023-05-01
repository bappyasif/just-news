import newsFilters from "@/models/news"
import connectMongoDB from "@/utils/connectMongo"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

const handler = async (req, res) => {
    const session = await getServerSession(req, res, authOptions)

    console.log(session, "SESSION!!")

    if(!session) {
        return res.status(402).json({msg: "access un-authorized"})
    }

    connectMongoDB()

    const method = req.method;
    const query = req.query;
    const body = req.body;

    const userSavedFilters = await newsFilters.find({user_id: query.user_id})

    if (method === "GET") {
        console.log("save news filters handler", method, req.query)
        return res.status(200).json({ msg: "save news filters handler", savedFilters: userSavedFilters })
    } else if (method === "POST") {
        // const body = req.body;
        // const query = req.query
        
        // console.log(body, query)
        
        const newNewsFilter = new newsFilters({
            // name: body?.filter_name || "NewsFilters - " + (newsFilters.find({})?.length || 0),
            name: body?.filter_name || "NewsFilters - " + (userSavedFilters?.length || 0),
            user_input: body,
            user_id: query.user_id,
            type: query.type
        })

        newNewsFilter.save().then(() => {
            console.log("save news filters handler POST method", body, method)
            return res.status(200).json({ msg: "save news filters handler" })
        }).catch(err => {
            console.log("save news filters handler POST method Error Ocuured", body, method, err)
            return res.status(402).json({ msg: "save failed error occured", err: err })
        })

    } else if (method === "DELETE") {
        console.log("save news filters handler DELETE method", query, method)
        newsFilters.findByIdAndDelete({_id: query.filter_id})
        .then(() => {
            return res.status(200).json({ msg: "save news filters handler" })
        }).catch(err => console.log("error occured while deleting", err))
    }
}

export default handler