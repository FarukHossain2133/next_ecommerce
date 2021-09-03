import initDB from 'helpers/initDB';
import Product from 'models/Product';

initDB();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getAllProducts(req, res)
            break;
        case "POST":
            await saveProduct(req, res);
        default:
            break;
    }

}

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    if (!products) return res.status(400).json({ message: "Product not found" })

    res.status(200).json({ products });
}

const saveProduct = async (req, res) => {
    const { name, price, description, mediaUrl } = req.body;
    // console.log(name, price, description, mediaUrl);
    if (!name || !price || !description || !mediaUrl) {
        return res.status(422).json({ error: "Please add all fields" });
    }

    const product = new Product({
        name,
        price,
        description,
        mediaUrl
    })
    const savedProduct = await product.save();
    if (!savedProduct) return res.status(400).json({ message: "Product save failed" })

    res.status(201).json({ message: "Product uploaded successfull" });
}