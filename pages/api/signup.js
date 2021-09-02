import { connectToDb } from 'lib/connectToDb';

async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;
        console.log(email, password);

        if (!email || !password) {
            return res.status(422).json({ message: "Invalid credentials" });
        }

        const { client, collection } = await connectToDb("users");

        try {
            await collection.insertOne({
                email,
                password
            });
            res.status(201).json({ message: "Signup successfully" });
            client.close();
            return
        } catch (error) {
            res.status(500).json({ message: "Failed to insert user in DB" });
            client.close();
            return;
        }

    }

    // client.close();
}


export default handler;