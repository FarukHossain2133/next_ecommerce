import initDB from 'helpers/initDB';
import User from 'models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

initDB();

async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "Invalid credentials" });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ error: "User is Not found" });

            const comparePassword = await bcrypt.compare(password, user.password);
            console.log(comparePassword);
            if (!comparePassword) return res.status(401).json({ error: "Email or password don't match" });

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
            const { name, role, email: userEmail } = user;

            res.status(200).json({
                message: "signin successfully",
                token,
                user: {
                    name, role, email: userEmail
                }
            });

        } catch (error) {
            res.status(500).json({ error: "Failed to login" });
            return;
        }

    }

    // client.close();
}


export default handler;