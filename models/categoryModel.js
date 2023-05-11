import mongoose from 'mongoose'

const categorySchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},parent:{
    type:mongoose.Types.ObjectId,
  ref:'category'
}
},{
    timestamps:true
})

export const Category= mongoose.models.category || mongoose.model('category',categorySchema)