import Featured from "@/components/Featured";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { connectToDb } from "@/lib/connectToDb";
import { Product } from "@/models/productModel";
import Head from "next/head";


export default function Home({newProducts}) {

  return (
  <div className="bg-gray-300">
    <Head>
      <title>Sukran</title>
    </Head>
    <Header/>
    <Featured product={newProducts[0]}/>
<div className="flex flex-wrap items-center justify-between h-auto p-10">

{
 newProducts.length>0 && newProducts.map((product)=>(
    <ProductCard product={product} key={product._id}/>
  ))
}
</div>

  </div>
  )
}

export async function getServerSideProps() {

   connectToDb();
  
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
    newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
