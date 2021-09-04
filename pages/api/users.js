import User from 'models/User';
import { Authenticated } from 'helpers/Authenticated';
import initDB from 'helpers/initDB';

initDB();

export default (req, res) => {
    switch (req.method) {
        case "GET":
            getAllUsers(req, res)
            break;
        case "PUT":
            switchUserRole(req, res)
            break;

    }

}

const getAllUsers = Authenticated(async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.userId } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Unable to fetch all users" });

    }

})


const switchUserRole = Authenticated(async (req, res) => {
    const { role, userId } = req.body;
 
    try {

        const user = await User.findByIdAndUpdate(userId, {
            role: role === "admin" ? "user" : "admin"
        });
        if(!user) res.status(400).json({ error: "Unable to change user role" });
        const users = await User.find({ _id: { $ne: req.userId } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Unable to fetch all users" });

    }

})