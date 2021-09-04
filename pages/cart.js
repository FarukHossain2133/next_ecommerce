import React, { useState } from 'react';
import { parseCookies } from 'nookies';
import baseUrl from 'helpers/baseUrl';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import Toaster from 'components/ui/Tostify';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import CartItem from 'components/cart/cart-item';
import List from '@material-ui/core/List';
import StripeCheckout from 'react-stripe-checkout';


const Cart = ({ error, products }) => {
    const { token } = parseCookies();
    const [initProduct, setinitProduct] = useState(products)
    const router = useRouter();
    // console.log(products);

    if (!token) {
        return (
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <p style={{ textAlign: 'center' }}>Please login to view your C</p>
                <Button color="primary" variant="outlined">
                    <Link href="/login">
                        Login
                    </Link>
                </Button>

            </div>
        )
    }

    if (error) {
        Toaster({
            message: error,
            type: 'error',
        })
        cookie.remove("token");
        cookie.remove("user");
        router.push("/login")
    }

    let price = 0;

    const handleCheckout = async (paymentInfo) => {
        console.log(paymentInfo);
        const res = await fetch('/api/payment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ paymentInfo })
        });

        const res2 = await res.json();

        if (res2.error) {
            // Error  toster
            Toaster({
                message: res2.error,
                type: 'error',
            })
        } else {
            // success toster
            Toaster({
                message: res2.message,
                type: 'success',
            })
            router.push("/account");

        }

    }

    const totalPrice = () => (
        <div>
            <h4>Total Price:  ৳ {price || 0}</h4>
            <StripeCheckout
                name="My Store"
                amount={price * 100}
                image={initProduct.length > 0 && initProduct[0].productId.mediaUrl}
                currency="SGD"
                shippingAddress={true}
                billingAddress={true}
                zipCode={true}
                stripeKey="pk_test_51JVZN0Es8gUh9Tl2YO0ZAVWzzRTOEzZzd3npEvQowJ8iyGU95QqnIDI9CrcdOF4nawcsqfoI2tUDCKdcqlcur82g005xe6thGv"
                token={(paymentInfo) => handleCheckout(paymentInfo)}
            >
                <Button color="primary" variant="contained" disableElevation>Checkout</Button>
            </StripeCheckout>
        </div>
    )


    return (
        <>
            {initProduct.length > 0 ?
                <List>
                    {
                        initProduct.length > 0 && initProduct.map((product, index) => {
                            price = price + product.quantity * product.productId.price;
                            // console.log(product.quantity, product.productId.price);
                            return <CartItem
                                product={product}
                                key={index}
                                setinitProduct={setinitProduct}
                            />
                        })}
                </List>
                : <p style={{ textAlign: "center" }}>You are not purchased any product yet </p>
            }
            {price > 0 && totalPrice()}
        </>

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
    // console.log("products", products);
    return {
        props: {
            products: products
        }
    }

}

export default Cart;
