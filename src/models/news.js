import mongoose from "mongoose"
const Schema = mongoose.Schema;

const NewsFilters = new Schema({
    name: Schema.Types.String,
    user_input: Schema.Types.Array,  // same result as bottom definition produced on mongodb
    // user_input: {
    //     lang: Schema.Types.String,
    //     topic: Schema.Types.String,
    //     not_lang: Schema.Types.String,
    //     // countries: Schema.Types.Array,
    //     // sources: Schema.Types.Array,
    //     countries: Schema.Types.String,
    //     sources: Schema.Types.String,
    //     when: Schema.Types.String,
    // },
    type: Schema.Types.String,
    user_id: Schema.Types.String
})

const newsFilters = mongoose.models.newsFilters || mongoose.model("newsFilters", NewsFilters)

export default newsFilters;