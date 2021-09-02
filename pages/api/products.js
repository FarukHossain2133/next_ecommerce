import initDB from 'helpers/initDB';
import product from 'models/product';

initDB();

export default async (req, res) => {
    const products = await product.find({});
    if (!products) return res.status(400).json({ message: "Product not found" })

    res.status(200).json({ products });
}