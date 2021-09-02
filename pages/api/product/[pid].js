import Product from 'models/product';
// import initDB from 'helpers/initDB';


// initDB()

export default async function (req, res) {

    switch (req.method) {
        case "GET":
            await getProduct(req, res);
            break;
        case "DELETE":

            await deleteProduct(req, res);
            break;
    }

}


async function getProduct(req, res) {
    const { pid } = req.query;
    try {
        const product = await Product.findOne({ _id: pid });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Produt not found");
    }
}

const deleteProduct = async (req, res) => {
    const { pid } = req.query;
    try {
        const product = await Product.findByIdAndDelete(pid);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Produt not found");
    }
}