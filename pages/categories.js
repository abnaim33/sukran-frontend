import { CartContext } from '@/components/CartContext'
import Header from '@/components/Header'

import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const Categories = () => {
  const {addProduct}=useContext(CartContext)
  const [category,setCategory]=useState('all')
const [categories,setCategories]=useState([])
const [products,setProducts]=useState([])
  useEffect(()=>{
    async function fetchCategories(){

      const {data}=await axios.get('/api/categories')
      setCategories(data.categories)

      const res=await axios.post('/api/products',{
       category
      })
 setProducts(res.data.products)

    }
    fetchCategories()
  
  },[category])

  return (
    <div className='bg-gray-400 min-h-screen min-w-screen pt-10'>
      <Header/>
      <div className='mt-20 flex flex-col sm:flex-row items-start justify-between px-5 sm:px-10'>
      <div className='flex flex-col items-center w-full sm:w-1/5 bg-black text-white rounded'>
       {
       categories.length>0 && categories.map((cate)=>(
          <div key={cate._id} className={`w-full text-center p-2 border-b-2 border-gray-500 cursor-pointer`}>
            <h1 onClick={()=>setCategory(cate)}>
            {cate.name}
            </h1>
        
            </div>
        ))
       }
      </div>
      <div className='w-full sm:w-3/4 mt-10 sm:mt-0'>
        <h1 className='text-xl'>Products for <span className='text-2xl font-semibold'> {category.name?category.name:'all'}</span></h1>
        <div className='flex flex-wrap items-center'>

        {
          products.length>0 && products.map((product)=>(
            <div className="w-[80%] sm:w-1/3  md:w-1/4 mx-auto my-3 sm:m-3 flex  flex-col items-center bg-white rounded" key={product._id}>
            <div className='w-[95%] p-2'>
                <img src={product.imagesUrl[0]} className='w-full'/>
            </div>
            <h1>{product.title}</h1>

    
    <p>Tk. {product.price}</p>
    <div className='flex justify-between items-center w-full p-5'>
      <Link href="/" className='bg-gray-700 text-white px-2 rounded text-sm py-1'>View</Link>
    <button onClick={()=>addProduct(product._id)}
     className='bg-gray-950 text-white px-3 rounded text-sm py-1'>Buy</button>
    </div>
        </div>
          ))
        }
        </div>
      </div>
      </div>
    </div>
  )
}

export default Categories


// export async function getServerSideProps() {

//   connectToDb();
 
//  const newProducts = await Product.find({});
//  console.log(newProducts)
//  return {
//    props: {
//    newProducts: JSON.parse(JSON.stringify(newProducts)),
//    },
//  };
// }