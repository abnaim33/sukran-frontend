import Header from '@/components/Header'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Order = () => {
  const { data: session, status } = useSession()
const [orders,setOrders]=useState([])
  useEffect(()=>{
async function fetchOrders(){
  const {data}=await axios.get("/api/order",{
    headers:{
      email:session?.user?.email
    }
  })

  setOrders(data.orders)

  console.log(data.orders,'orders')
}
fetchOrders()
  },[])
  return (
    <div>
        <Header/>
        <div className='mt-32'>

        <h1>Your order has been place successfully</h1>
        </div>
    </div>
  )
}

export default Order