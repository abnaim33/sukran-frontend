import { CartContext } from '@/components/CartContext'
import Header from '@/components/Header'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

const Product = () => {
    const {addProduct}=useContext(CartContext)
    const [product,setProduct]=useState({})
    const router=useRouter()
    const id=router.query.id


    useEffect(()=>{
async function fetchProduct(){
    if(id){

  
        const {data}=await axios.get('/api/products',{
            params:{
                id:id
            }
        })
        console.log(data)
        setProduct(data.product)
    }
}
fetchProduct()
    },[])

  return (
    <div>
        <Header/>
        <Head>
            <title>
                {product.title}
            </title>
        </Head>
        <div className='mt-20 p-10'>
{
product &&<div className='flex flex-col'>
    <div className=''>
    {
product.imagesUrl?.map((img,i)=>(
    
    <img src={img} key={i}/>
))
    }
    </div>
    <h1 className='text-3xl my-5'>

{product.title}
    </h1>
<p className='text-gray-700'>{product.description}</p>
    <h1 className='mt-5'>Tk.{product.price}</h1>
    </div>

}


<div className='flex justify-between items-center w-full p-5'>
      <Link href="/" className='bg-gray-700 text-white px-3 sm:px-10 rounded text-sm sm:text-xl py-1'>View</Link>
    <button onClick={()=>addProduct(product._id)}
     className='bg-gray-950 text-white px-3 sm:px-10 rounded text-sm sm:text-xl py-1'>Buy</button>
    </div>
        </div>
        </div>
  )
}

export default Product