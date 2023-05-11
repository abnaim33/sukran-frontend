import { CartContext } from '@/components/CartContext'
import Header from '@/components/Header'
import axios from 'axios'
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'

import React, { useContext, useEffect, useState } from 'react'

const Profile = () => { 
     const { data: session, status } = useSession()
     const {addProduct}=useContext(CartContext)
     const [orders,setOrders]=useState([])


     useEffect(()=>{
   async function fetchOrders(){
  
    if(status!="loading"){

      const {data}=await axios.get("/api/order",{
        headers:{
          email:session?.user?.email
        }
      })

      setOrders(data.orders)
 
    }
   }
   fetchOrders()
     },[session?.user])

  return (
    <div>
      <Head>
        <title>
          Profile
        </title>
      </Head>
        <Header/>
        {session?.user?
<div className='mt-32 p-1 flex flex-col sm:flex-row items-center justify-between min-w-screen'>
 
    <div className=' bg-gray-300 p-5 rounded text-center mx-auto w-full sm:w-1/3 space-y-5'>
        <img src={"https://res.cloudinary.com/dsuh9ww6d/image/upload/v1674622093/user_iany8v.png"} className='w-[80px] h-[80px] rounded-full mx-auto'/>
       <p>Name: {session?.user.name}</p>
     <h1 className='text-sm'>  Your Email: <br/> {session.user.email}</h1>

       <button className='bg-black text-white px-4 py-1 rounded'
       onClick={signOut}>Sign Out</button>
    </div>
  
<div className='ml-0 sm:ml-10 w-full sm:w-1/3'>
{
orders.length===0?
<h1>You don't have any order</h1>:
<div className='bg-gray-300 p-5'>
  <h1>You have {orders.length} orders</h1>
  {
    orders.map((order)=>(
      <div key={order._id} className='bg-white p-3 my-8'>
<h1>
  Order status: <span className={order.orderStatus==='pending'?"text-red-500":"text-green-500"}>{order.orderStatus}</span></h1>

<div>
{order.orderProducts.map((product)=>(
 <div key={product.productInfo._id} className='flex mt-4'>
  <img src={product.productInfo.imagesUrl[0]} className='w-[50px]'/>
  <div className='flex flex-col ml-5 '>
<p> {product.productInfo.title}</p>
<p className='text-sm'>Tk. {product.productInfo.price}</p>
<p className='text-sm text-gray-600'>x{product.quantity}</p>
</div>
<button onClick={()=>addProduct(product.productInfo._id)}
className='bg-gray-950 text-white px-2 py-1 rounded w-auto h-auto
 text-sm ml-3'>Buy Again</button>
 </div>
))}
<h1 className='mt-3'>Total: Tk. {order.total}</h1>

</div>
        </div>
    ))
  }
  </div>
}
</div>
   
</div>
  :
  <div className='mt-32 p-4 text-center bg-white'>
    <h1 className='text-3xl '>You are not login</h1>
    <button onClick={()=>signIn()} className='bg-black text-white px-4 py-1 rounded mt-5'>Sign in</button>
    </div>
  }
    </div>
  )
}

export default Profile




