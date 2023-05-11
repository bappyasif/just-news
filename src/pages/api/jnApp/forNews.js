import newsFilters from "@/models/news"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { dbConnect } from "@/utils/connMongoWithMongoose"

const handler = async (req, res) => {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(402).json({ msg: "access un-authorized" })
    }

    const method = req.method;
    const query = req.query;
    const body = req.body;

    dbConnect().then(async () => {
        const userSavedFilters = await newsFilters.find({ user_id: query.user_id })

        if (method === "GET") {
            return res.status(200).json({ msg: "save news filters handler", savedFilters: userSavedFilters })
        } else if (method === "POST") {
            const newNewsFilter = new newsFilters({
                name: `${query?.type === "Headlines" ? "Headlines" : query?.type === "News" ? "News" : "Sources"}Filters - ` + (userSavedFilters?.length || 0),
                user_input: body,
                user_id: query.user_id,
                type: query.type
            })

            newNewsFilter.save().then(() => {
                return res.status(200).json({ msg: "save news filters handler" })
            }).catch(err => {
                return res.status(402).json({ msg: "save failed error occured", err: err })
            })

        } else if (method === "DELETE") {
            newsFilters.findByIdAndDelete({ _id: query.filter_id })
                .then(() => {
                    return res.status(200).json({ msg: "save news filters handler" })
                }).catch(err => console.log("error occured while deleting", err))
        }

    }).catch(err => {
        return res.status(501).json({ msg: "mongodb connection error occured", err })
    })
}

export default handler