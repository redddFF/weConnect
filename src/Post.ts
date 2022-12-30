import mongoose from "mongoose" ; 
import mongoosePaginate from "mongoose-paginate" ;
import { buffer } from "stream/consumers";

let PostSchema =new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName:String,
    title : String,
    description :String,
    ImageName:String
    },{
    timestamps: true
    },
    
);
PostSchema.plugin(mongoosePaginate);
const Post =mongoose.model("Post",PostSchema) ; 
export default Post ; 