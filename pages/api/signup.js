import initDB from 'helpers/initDB';
import User from 'models/User';
import Cart from 'models/Cart';
import bcrypt from 'bcryptjs';

initDB();

async function handler(req, res) {
    if (req.method === "POST") {
        const {name, email, password } = req.body;
        console.log(email, password);

        if (!email || !password) {
            return res.status(422).json({ error: "Invalid credentials" });
        }

        try {
            const user = await User.findOne({ email });
            if (user) return res.status(422).json({ error: "User is already exist" });

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            const saveduser = await newUser.save();
            if (!saveduser) return res.status(422).json({ error: "User save failed" });
            await new Cart({user: saveduser._id}).save();
            res.status(201).json({ message: "Signup successfully" });

        } catch (error) {
            res.status(500).json({ error: "Failed to insert user in DB" });
            return;
        }

    }

    // client.close();
}


export default handler;