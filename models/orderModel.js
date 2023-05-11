import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
name:{
    type:String,
    required:true
},
phoneNumber:{
    type:Number,
    required:true
},
email:{
    type:String,
    required:true
},
region:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
area:{
    type:String,
    required:true
},
address:{
    type:String,
    required:true
},
orderProducts:{
    type:Array,
    required:true
},
orderStatus:{
    type:String,
    default:"pending"
},
paid:{
    type:Boolean,
    default:false
},
total:{
    type:Number,
    required:true
}
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);