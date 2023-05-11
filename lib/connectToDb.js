import mongoose from "mongoose";

export function connectToDb(){
    if(mongoose.connection.readyState===1){
        return console.log('already connected')
    }else{
        const uri=process.env.MONGODB_URI
        mongoose.connect(uri,{}).then(
            ()=>console.log('connect to database'),
            err=>{console.log(err)}
        )
    }
}