const { getServerSession } = require("next-auth")
const { authOptions } = require("../auth/[...nextauth]")
const { default: liveSearch } = require("@/models/liveSearch")

const handler = async (req, res) => {
    const body = req.body
    const query = req.query
    const method = req.method

    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        // console.log("SESSION!!")
        return res.status(402).json({ msg: "access un-authorized" })
    }

    if (method === "GET") {
        const firstTwenty = await liveSearch.find({ type: query.type }).sort([['_id', 1]]).limit(20)
        // console.log("firstTwenty", firstTwenty?.length, query)
        return res.status(200).json({ msg: "a successfull get request", data: firstTwenty })
    } else if (method === "POST") {
        // console.log(body, "POST")
        const newEntry = new liveSearch(body);
        newEntry.save().then(() => {
            return res.status(200).json({ msg: "a successfull post request" })
        }).catch(err => {
            return res.status(200).json({ msg: "error occure while saving", err: err })
        })
    } else if (method === "DELETE") {
        return res.status(200).json({ msg: "a successfull delete request" })
    }
}

export default handler