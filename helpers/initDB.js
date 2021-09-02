import mongoose from 'mongoose';

async function initDB() {

    if (mongoose.connections[0].readyState) {
        console.log("Already connected");
        return;
    }

    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    });

    mongoose.connection.on("connected", () => {
        console.log("Connected to mongo");
    });

    mongoose.connection.on("error", (err) => {
        console.log("Error connecting " + err);
    });
}

export default initDB;