import { CartContext } from '@/components/CartContext'
import Header from '@/components/Header'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Cart = () => {
    const { data: session } = useSession()


 
    const {cartProducts,emptyCart,addProduct,removeProduct}=useContext(CartContext)
const [products,setProducts]=useState([])

const [orderData,setOrderData]=useState({
   phoneNumber:'',
   region:'',
   city:'',
   area:'',
   address:'',

})

    useEffect(()=>{
if(cartProducts.length>0){
axios.post('/api/cart',{id:cartProducts})
.then(res=>{
 
    setProducts(res.data.product)
})
}
    },[cartProducts])

    let subTotal = 0;
    for (const productId of cartProducts) {
      const price = products.find(p => p._id === productId)?.price || 0;
      subTotal += price;
    }
    let total=subTotal+100

const handleChange=(name,value)=>{
    setOrderData(prev=>({
        ...prev,
        [name]:value
    }))
}


const handleOrder=async(e)=>{
if(!session){
    toast("Please login to place order",{type:"error"})
    return;
}
let name=session.user.name
let email=session.user.email
    const {phoneNumber,region,city,area,address}=orderData
    if(!phoneNumber,!region,!city,!area,!address)return toast("Please fill all the fields",{type:"error"})
    if(phoneNumber.length!=11){
        toast("Please enter a valid phone number",{type:"error"})
        return;
    }
    if(cartProducts.length===0){
        toast("Your cart is empty",{type:"error"})
        return
    }
    const response = await axios.post('/api/order', {
      name,
      email,
        ...orderData,
        cartProducts,
        total
      });

     if(response.status!==200){
        toast(response.msg,{type:"error"})
     }
     if(response.status===200){
        toast("Order places successfully")
        emptyCart()
        setOrderData({
            phoneNumber:'',
   region:'',
   city:'',
   area:'',
   address:'',
        })
        // router.push("/order")
     }

}
  return (
    <div  className="bg-gray-200 min-h-screen">
        <Head>
            <title>
                Cart
            </title>
        </Head>
        <Header/>
{
      products.length===0?
      <div className='mt-32'>
      <p className=' text-xl md:text-3xl text-center px-5'>You do not have any product into your cart</p>
      </div>:

        
        <div className='flex justify-evenly items-center p-10 flex-wrap min-h-screen mt-20'>
            <div className='md:w-2/4 w-full bg-white mb-5 sm:mb-0 p-3'>
                <h1 className='text-2xl'>Cart</h1>

{
  
   
    products.map((product)=>(
      

        <div key={product._id} className='flex items-center my-3 justify-evenly'>
            <img src={product.imagesUrl[0]} className='w-[40%]'/>
            <div className='flex-grow ml-5 flex flex-col'>
                <h1>{product.title}</h1>
              <span className='text-sm text-gray-500'>size: xl</span>

                <div className='flex items-center justify-between mt-3'>
                <h1>TK. {product.price*cartProducts.filter(id=>id===product._id).length}</h1>
                    <div className='items-center flex'>
                    <button  onClick={()=>removeProduct(product._id)}><MinusIcon className='w-5 h-5'/></button>
                    <span className='bg-gray-400 rounded px-2 mx-2'>{cartProducts.filter(id=>id===product._id).length}</span>
                    <button onClick={()=>addProduct(product._id)}><PlusIcon className='w-5 h-5'/></button>
                    </div>
                    
                    </div>

                    <div className='mt-3 flex items-center justify-between'>
                        <h1 className='text-sm'>In stock</h1>
                        <button className='text-sm bg-gray-400 px-4 py-1 rounded'
                        onClick={()=>removeProduct(product._id)}>remove</button>
                        </div>
                </div>

            
            </div>
    
     
    ))
   
}
<h1 className='ml-auto text-right'>SubTotal: TK. {subTotal}</h1>

<p className='ml-auto text-right text-sm text-gray-500 border-b-2 border-gray-800 mt-3'>Delivery: 100 tk</p>
<div className='flex items-center justify-between mt-2'>
    <button className='bg-gray-950 text-gray-50 px-4 py-1 rounded'
    onClick={()=>emptyCart()}>Clear cart</button>
<p className=''>Total: Tk. {total}</p>
</div>
            </div>


            <div  className='md:w-1/3 w-full bg-white p-4 rounded mt-5'>

<p className='text-sm mb-5'>Dear Naim, Please fill up the fields with valid information</p>

                <div className='flex flex-col space-y-2'>
                <input placeholder='Enter your phone Number'
                     type="number" className='px-3 py-1 rounded border-2 border-gray-400 outline-none text-sm'
                      value={orderData.phoneNumber}
                     name="phoneNumber" onChange={(e)=>handleChange(e.target.name,e.target.value)} required/>
                    <input placeholder='Enter your region'
                     type="text" className='px-3 py-1 rounded border-2 border-gray-400 outline-none text-sm' value={orderData.region}
                     name="region" onChange={(e)=>handleChange(e.target.name,e.target.value)} required/>

                    <input placeholder='Enter your city'
                     type="text" className='px-3 py-1 rounded border-2 border-gray-400 outline-none text-sm'
                     value={orderData.city}
                     name="city" onChange={(e)=>handleChange(e.target.name,e.target.value)} required/>

                    <input placeholder='area name'
                     type="text" className='px-3 py-1 rounded border-2 border-gray-400 outline-none text-sm '    value={orderData.area}
                     name="area" onChange={(e)=>handleChange(e.target.name,e.target.value)} required/>
                    
                 
                    <input placeholder='address name' 
                    type="text" className='px-3 py-1 rounded border-2 border-gray-400 outline-none text-sm'    value={orderData.address}
                    name="address" onChange={(e)=>handleChange(e.target.name,e.target.value)} required/>

                    <button type="submit" className='bg-black text-white p-1 rounded text-sm' onClick={()=>handleOrder()}>Place Order</button>
                </div>
            </div>
        </div>

}
    </div>
  )
}

export default Cart