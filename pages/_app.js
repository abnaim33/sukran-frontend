import { CartContextProvider } from '@/components/CartContext';
import '@/styles/globals.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react"
import Footer from '@/components/Footer';
import MessengerCustomerChat from 'react-messenger-customer-chat';

export default function App({  Component,
  pageProps: { session, ...pageProps }, }) {
  return   <SessionProvider   session={session}>
 <MessengerCustomerChat
    pageId="110357511648610"
    appId="1010865156576386"
    htmlRef="<REF_STRING>"
  />

  <ToastContainer/>

<CartContextProvider>
    <Component {...pageProps} />
</CartContextProvider>

<Footer/>
</SessionProvider>
}
