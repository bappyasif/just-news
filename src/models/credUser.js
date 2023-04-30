import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CredUser = new Schema({
    name: Schema.Types.String,
    email: Schema.Types.String,
    password: Schema.Types.String
});

const credUser = mongoose.models.credUser || mongoose.model("credUser", CredUser)

export default credUser