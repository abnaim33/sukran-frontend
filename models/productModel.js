import mongoose from 'mongoose'

const productSchema=new mongoose.Schema({
title:{type:String,required:true},
description:{type:String},
price:{type:Number,required:true},
imagesUrl:{type:Array,required:true},
stock:{
    type:Number,
    default:1
},
featured:{
    type:Boolean,
    default:false
},
category:{  
      type:mongoose.Types.ObjectId,
    ref:'category'}
},{
    timestamps:true
})

export const Product= mongoose.models.product || mongoose.model('product',productSchema)