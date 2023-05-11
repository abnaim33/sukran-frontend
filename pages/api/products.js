import { connectToDb } from "@/lib/connectToDb";
import { Product } from "@/models/productModel";

export default async function handler(req,res) {
    connectToDb()
    if(req.method==="POST"){

        if(req.body.category==='all'){

            const products=await Product.find({})

            res.json({msg:'i am getting response',
        products})
        }else{
            const category=req.body.category
            const products=await Product.find({category})

            res.json({msg:'i am getting response',
        products})
        }
    }
    if(req.method==="GET"){
  
        let id=req.query.id
        if(id){
          
  
            const product=await Product.findById({_id:id})
      
            res.json({product,id})
        }
       
    }
}