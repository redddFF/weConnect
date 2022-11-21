import mongoose from "mongoose" ; 
import mongoosePaginate from "mongoose-paginate" ;


let userSchema=new mongoose.Schema({
    _Id:Number,
    Nom:String,
    Prenom:String,
    Email:String,
    Password:String,
    Status:String,
    Birth:Date,
    Gender:String   
},
 {
     timestamps: true
 }) ; 



userSchema.plugin(mongoosePaginate);
const User=mongoose.model("User",userSchema);

export default User ; 