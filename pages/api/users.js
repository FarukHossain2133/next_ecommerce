import User from 'models/User';
import {Authenticated} from 'helpers/Authenticated';
import initDB from 'helpers/initDB';

initDB();

// export default (req, res) => {
//     switch (req.method) {
//         case "GET":
//             getAllUsers(req, res)
//             break;

//     }

// }

export default Authenticated(async (req, res) => {
    try {
        const users = await User.find({_id: {$ne: req.userId}});
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Unable to fetch all users" });

    }

})