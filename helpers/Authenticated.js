import jwt from 'jsonwebtoken';

export const Authenticated = (component) => {
    return (req, res) => {
        const { authorization } = req.headers;
        // console.log(authorization);
        if (!authorization) return res.status(401).json({ error: "You must logged in" });

        try {
            const token = authorization.split(" ")[1];
            // console.log(token);
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = userId;
            return component(req, res)

        } catch (error) {
            return res.status(401).json({ error: "You must logged in" });
        }
    }
}