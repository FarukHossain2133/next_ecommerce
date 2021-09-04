
import Stripe from 'stripe';
import { v4 as uuidV4 } from 'uuid';
import Cart from 'models/Cart';
import jwt from 'jsonwebtoken';
import Order from 'models/Order';

const stripe = Stripe(process.env.STRIPE_SECRET);
export default async (req, res) => {
    if (req.method === "POST") {
        const {paymentInfo} = req.body;
        const { authorization } = req.headers;
        // console.log(authorization);
        if (!authorization) return res.status(401).json({ error: "You must logged in" });

        try {
            const token = authorization.split(" ")[1];
            // console.log(token);
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            const cart = await Cart.findOne({ user: userId }).populate("products.productId");
            let price = 0;

            cart.products.forEach(product => {
                price = price + product.quantity * product.productId.price;
            });

            const prevCustomer = await stripe.customers.list({
                email: paymentInfo.email
            });

            const isExistingCustomer = prevCustomer.data.length > 0;
            // console.log(prevCustomer);
            let newCustomer;
            if (!isExistingCustomer) {
                newCustomer = await stripe.customers.create({
                    email: paymentInfo.email,
                    source: paymentInfo.id
                });
            }

            const charge = await stripe.charges.create({
                currency: "SGD",
                amount: price * 100,
                receipt_email: paymentInfo.email,
                customer: isExistingCustomer ? prevCustomer.data[0].id : newCustomer.id,
                description: `you purchased a product ${paymentInfo.email}`
            }, {
                idempotencyKey: uuidV4()
            })

            const order = new Order({
                user: userId,
                email: paymentInfo.email,
                total: price,
                products: cart.products
            })

            const saveProduct = await order.save();
            if (!saveProduct) return res.status(400).json({ error: "Create new order failed" });

            await Cart.findOneAndUpdate(
                { user: userId },
                { $set: { products: [] } }
            )

            res.status(200).json({ message: "Payment was successfull" });

        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: "Error processing payment" });
        }
    }
}





// import Stripe from 'stripe';
// import { v4 as uuidV4 } from 'uuid';
// import Cart from 'models/Cart';
// import jwt from 'jsonwebtoken';

// const stripe = Stripe(process.env.STRIPE_SECRET);
// export default async (req, res) => {
//     if (req.method === "POST") {
//         const paymentInfo = req.body;
//         const { authorization } = req.headers;
//         // console.log(authorization);
//         if (!authorization) return res.status(401).json({ error: "You must logged in" });

//         try {
//             const token = authorization.split(" ")[1];
//             // console.log(token);
//             const { userId } = jwt.verify(token, process.env.JWT_SECRET);
//             const cart = await Cart.findOne({ user: userId }).populate("products.productId");
//             let price = 0;

//             cart.products.forEach(product => {
//                 price = price + product.quantity * product.productId.price;
//             });


//             const newCustomer = await stripe.customers
//                 .create({
//                     name: "Faruk Hossain",
//                     email: paymentInfo.email,
//                     source: paymentInfo.id
//                 });


//             const payment = await stripe.charges.create({
//                 amount: price * 100,
//                 currency: "usd",
//                 customer: newCustomer.id
//             });

//             res.status(200).json({ message: "Payment was successfull" })


//         } catch (error) {
//             console.log(error);
//             return res.status(400).json({ error: "Error processing payment" });
//         }
//     }
// }



