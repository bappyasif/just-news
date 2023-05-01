import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LiveSearch = new Schema({
    type: Schema.Types.String,
    text: Schema.Types.String,
    // timestamp: Schema.Types.Date  // _id first four byte consists timestamp
})

const liveSearch = mongoose.models.liveSearch || mongoose.model("liveSearch", LiveSearch)

export default liveSearch;