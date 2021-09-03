import React from 'react';
import { parseCookies } from 'nookies';
import baseUrl from 'helpers/baseUrl';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import Toaster from 'components/ui/Tostify';

const cart = ({ error }) => {

    const router = useRouter();
    
    if (error) {
        Toaster({
            message: error,
            type: 'error',
        })
        cookie.remove("token");
        cookie.remove("user");
        router.push("/login")
    }
    return (
        <div>
            Cart
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx);
    if (!token) {
        return {
            props: {
                products: []
            }
        }
        //    res.writeHead(302, {location: "/login"});
        //    res.end();
    }

    const res = await fetch(`${baseUrl}/api/cart`, {
        headers: {
            "Authorization": "Bearer " + token 
        }
    });

    const products = await res.json();
    if (products.error) {
        return {
            props: { error: products.error }
        }
    }
    console.log("products", products);
    return {
        props: {
            products
        }
    }

}

export default cart;
