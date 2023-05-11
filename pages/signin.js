import Header from '@/components/Header'
import { signIn } from 'next-auth/react'
import React from 'react'

const SignIn = () => {
  return (
    <div>
        <Header/>
        <div className='mt-32'>
        <button onClick={()=>signIn()}>Sign in</button>
        </div>
    </div>
  )
}

export default SignIn