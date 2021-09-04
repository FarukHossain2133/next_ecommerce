import Cart from 'models/Cart';
import initDB from 'helpers/initDB';
import {Authenticated} from 'helpers/Authenticated';

initDB()

export default async (req, res) => {

    switch (req.method) {
        case "GET":
            await fetchUserCart(req, res);
            break;
        case "DELETE":
            await removeProduct(req, res);
            break;
        case "PUT":
            await addProduct(req, res);
            break;



    }

};



const fetchUserCart = Authenticated(async (req, res) => {

    const cart = await Cart.findOne({ user: req.userId }).populate("products.productId");
    return res.status(200).json(cart.products);

})


const addProduct = Authenticated(async (req, res) => {
    const { quantity, productId } = req.body;
    // console.log(productId);

    const userCart = await Cart.findOne({ user: req.userId });
    if (!userCart) return res.status(404).json({ error: "Cart is not found" });

    const findProduct = userCart.products.some((prod) => prod.productId.toString() === productId);

    try {

        if (findProduct) {

            await Cart.findOneAndUpdate(
                { _id: userCart._id, "products.productId": productId },
                { $inc: { "products.$.quantity": quantity } }
            )

        } else {
            const product = {
                quantity,
                productId
            }
            await Cart.findByIdAndUpdate(
                { _id: userCart._id },
                { $push: { products: product } }
            );
        }

    } catch (error) {
        return res.status(422).json({ error: "Failed to update your cart" });
    }

    //    const productIndex =  userCart.products.findIndex((cart) => cart.productId.toString() === productId);
    //    console.log(productIndex);
    //    if(productIndex === -1){
    //        userCart.products.push({
    //         quantity,
    //         productId
    //        })
    //    }else {
    //        userCart.products.splice(productIndex, 1, {
    //         quantity,
    //         productId
    //        })
    //    }

    // if (!savedProduct) return res.status(500).json({ error: "Product not saved" });
    return res.status(200).json({ message: "Cart is updated" });

});




const removeProduct = Authenticated(async (req, res) => {
    const { productId } = req.body;
    try {
        const cart = await Cart.findOneAndUpdate(
            { user: req.userId },
            { $pull: { products: { productId: productId } } },
            { new: true }
        ).populate("products.productId");

        res.status(200).json({message: "Product removed successfull", products: cart.products});
    } catch (error) {
        res.status(404).json({ error: "Product removed failed" });

    }

});

