const handler = (req, res) => {
    const method = req.method
    if (method === "GET") {
        console.log("save news filters handler", method, req.query)
        return res.status(200).json({ msg: "save news filters handler" })
    } else if(method === "POST") {
        const body = req.body;
        console.log("save news filters handler POST method", body, method)
        return res.status(200).json({ msg: "save news filters handler" })
    } else if(method === "DELETE") {
        const body = req.body;
        console.log("save news filters handler DELETE method", body, method)
        return res.status(200).json({ msg: "save news filters handler" })
    }
}

export default handler