import React from 'react';;
import Products from 'components/products/products';
import baseUrl from 'helpers/baseUrl';

const index = ({ products }) => {
  // console.log(products);
  return (
    <div style={{ textAlign: "center" }}>
      <h1 >WelCome to E-commerce site</h1>
      <Products products={products} />
    </div>
  )
}


// export async function getStaticProps() {
//   const response = await fetch( baseUrl+"/api/products");
//   const data = await response.json();

//   return {
//     props: {
//       products: data.products
//     }
//   }
// }


export async function getServerSideProps() {
  const response = await fetch( baseUrl+"/api/products");
  const data = await response.json();

  return {
    props: {
      products: data.products
    }
  }
}


export default index
