import Link from 'next/link'
import React, { useContext } from 'react'
import { CartContext } from './CartContext'

const ProductCard = ({product}) => {
  const {addProduct}=useContext(CartContext)
  return (
    <div className="w-[80%] sm:w-1/3  md:w-1/5 mx-auto my-3 sm:m-3 flex  flex-col items-center bg-white">
        <div className='w-[95%] p-2'>
            <img src={product.imagesUrl[0]} className='w-full'/>
        </div>
        <h1>{product.title}</h1>

{/* <p>{product.category}</p> */}

<p>Tk. {product.price}</p>
<div className='flex justify-between items-center w-full p-5'>
  <Link href={`/product/${product._id}`} className='bg-gray-700 text-white px-2 rounded text-sm py-1'>View</Link>
<button onClick={()=>addProduct(product._id)}
 className='bg-gray-950 text-white px-3 rounded text-sm py-1'>Buy</button>
</div>
    </div>
  )
}

export default ProductCard