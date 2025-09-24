import mongoose from "mongoose";

const voteSchema= new mongoose.Schema(
    {
    name: { type: String, default: "" },
    option: { type: String, default: "" },
   
    },
    {timestamps:true}
);

const voteModel= new mongoose.model("vote",voteSchema )
export default voteModel;