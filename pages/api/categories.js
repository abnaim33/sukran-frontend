
import { connectToDb } from "@/lib/connectToDb"
import { Category } from "@/models/categoryModel"
// import { isAdminRequest } from "./auth/[...nextauth]";


connectToDb()

export default async function handle(req,res){

    // await isAdminRequest(req,res);
const {method}=req

if(method==="POST"){
    const {name,parentCategory}=req.body
    console.log(name,parentCategory)

    const newCategory=await Category.create({name,parent:parentCategory?parentCategory:'643f9334cb2a5d6690680cd4'})

    res.json({newCategory,msg:'category created successfully'})
}
if(method==="GET"){
    const categories=await Category.find().populate('parent')

    res.json({
        categories
    })
}

if(method==="PUT"){
    const {editCategory,name,parentCategory}=req.body
    const id=editCategory._id
  
    const newCategory=await Category.findByIdAndUpdate(id,{name:editCategory.name,parent:parentCategory})
  
  console.log(req.body)
    res.json({msg:"successfully updated category",
newCategory})
}

if(method==="DELETE"){
    console.log(req.query.id)
    const id=req.query.id
    const deleted=await Category.findByIdAndDelete(id)
    res.json({
        deleted,
    msg:"Category deleted successfully"})
}

}