import React, { useContext } from 'react'
import { CartContext } from './CartContext'

const Featured = ({product}) => {
  const {addProduct}=useContext(CartContext)
  const addFeaturedToCart=()=>{
addProduct(product._id)
  }
  return (
    <div className={`${product.featured?" h-screen w-full":'hidden'} bg-gray-950 flex flex-col md:flex-row items-center sm:mt-10 mt-24 md:px-10 justify-evenly  md:justify-between`}>
        {
            product.featured?
            <>
            
        
        <div className='md:w-1/3 w-full px-5 text-white h-auto'>

<h1 className='text-3xl'>{product.title}</h1>

<p className='text-sm my-5 text-gray-400'>
 
     {product.description}</p>    
       
       <div className='flex items-center justify-between'>
        <button className='bg-gray-700 px-4 py-1 rounded '>Learn More</button>
        <button className='bg-blue-700 px-4 py-1 rounded '
        onClick={()=>addFeaturedToCart()}>Buy Now</button>
       </div>
       
        </div>
        
        <div className='md:w-1/3 w-full px-5 '>
{/* 
        <img src="https://dawid-next-ecommerce.s3.amazonaws.com/1679151719649.png" alt=""
        className='w-full'/> */}

        <img src={product.imagesUrl[0]} className='w-full'/>
        </div>
        </>
        :''
          }
        
    </div>
  )
}

export default Featured