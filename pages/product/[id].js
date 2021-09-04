import React from 'react';
import SingleProduct from 'components/products/product-item';
import {useRouter} from 'next/router';
import baseUrl from 'helpers/baseUrl';


const Product = ({ product }) => {
    // if(!product) return <p>Loading...</p>
    const router = useRouter();
    if(router.isFallback) return <p>Loading...</p>;
    return (
        <div>
            <h1>Single product</h1>
            <SingleProduct product={product} single />
        </div>
    )
}

// export async function getServerSideProps({ params: { id } }) {

//     const response = await fetch("http://localhost:3000/api/product/" + id);
//     const product = await response.json();

//     return {
//         props: {
//             product: product
//         }
//     }
// }


export async function getServerSideProps({ params: { id } }) {

    const response = await fetch(baseUrl+"/api/product/" + id);
    const product = await response.json();

    return {
        props: {
            product: product
        }
    }
}



// export async function getStaticProps({ params: { id } }) {

//     const response = await fetch(baseUrl+"/api/product/" + id);
//     const product = await response.json();

//     return {
//         props: {
//             product: product
//         }
//     }
// }

// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { id: "612d9e379df793fdb31aa9d0" } },
//         ],
//         fallback: true
//     }
// }


export default Product
