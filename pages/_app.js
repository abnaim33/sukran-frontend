import { CartContextProvider } from '@/components/CartContext';
import '@/styles/globals.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react"
import Footer from '@/components/Footer';


export default function App({  Component,
  pageProps: { session, ...pageProps }, }) {
  return   <SessionProvider   session={session}>

  <ToastContainer/>
<CartContextProvider>

    <Component {...pageProps} />
</CartContextProvider>
<Footer/>
</SessionProvider>
}
