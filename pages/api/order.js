
import { connectToDb } from "@/lib/connectToDb";
import { Order } from "@/models/orderModel";
import { Product } from "@/models/productModel";

export default async function handler(req,res) {
    connectToDb()
  if(req.method==='POST'){

    const {name,email,phoneNumber,region,city,area,address,cartProducts,total}=req.body
    if(!phoneNumber,!region,!city,!area,!address,cartProducts.length<0)res.json({status:400,
  msg:"please add all the fields"})
    if(phoneNumber.length!=11){
      res.json({status:400,msg:"Please enter a valid phone number"})
    }
  
    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({_id:uniqueIds});
  
    let orderProducts = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(p => p._id.toString() === productId);
      const quantity = productsIds.filter(id => id === productId)?.length || 0;
      if (quantity > 0 && productInfo) {
        orderProducts.push({
  
          quantity,
            productInfo,
        });
      }
    }
    
    const order=await Order.create({name,email,phoneNumber,region,city,area,address,cartProducts,orderProducts,total})
    
    console.log(order)
  res.json({
    order,
 
  msg:"Order placed successfully"})
  }

if(req.method==='GET'){
  console.log(req.headers.email)
  const email=req.headers.email
  const orders=await Order.find({email})
res.json({orders,
})
}

}