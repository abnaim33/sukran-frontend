import { connectToDb } from "@/lib/connectToDb";
import { Product } from "@/models/productModel";


export default async function handle(req,res){
     connectToDb()
const id=req.body.id
const product=await Product.find({_id:id})
res.json({product})
}