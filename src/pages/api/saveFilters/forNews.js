import newsFilters from "@/models/news"
import connectMongoDB from "@/utils/connectMongo"

const handler = (req, res) => {
    connectMongoDB()

    const method = req.method
    if (method === "GET") {
        console.log("save news filters handler", method, req.query)
        return res.status(200).json({ msg: "save news filters handler" })
    } else if (method === "POST") {
        const body = req.body;
        const newNewsFilter = new newsFilters({
            name: "NewsFilters:" + (newsFilters.find({})?.length || 0),
            user_input: body,
            user_id: "NewsFilters:" + (newsFilters.find({})?.length || 0)
        })

        newNewsFilter.save().then(() => {
            console.log("save news filters handler POST method", body, method)
            return res.status(200).json({ msg: "save news filters handler" })
        }).catch(err => {
            console.log("save news filters handler POST method Error Ocuured", body, method, err)
            return res.status(402).json({ msg: "save failed error occured", err: err })
        })
    } else if (method === "DELETE") {
        const body = req.body;
        console.log("save news filters handler DELETE method", body, method)
        return res.status(200).json({ msg: "save news filters handler" })
    }
}

export default handler