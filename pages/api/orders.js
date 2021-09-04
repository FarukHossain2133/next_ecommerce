import Orders from 'models/Order';
import initDB from 'helpers/initDB';
import { Authenticated } from 'helpers/Authenticated';


initDB();

export default async (req, res) => {

    switch (req.method) {
        case "GET":
            await fetchUserOrders(req, res);
            break;

    }

};


const fetchUserOrders = Authenticated(async (req, res) => {
    try {
        const orders = await Orders.find({ user: req.userId }).populate("products.productId");
        if (!orders) return res.status(404).json({ error: "Orders not found" });
        return res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ error: "Orders not found" });
    }


})