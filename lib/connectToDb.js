import { MongoClient } from 'mongodb';

export const connectToDb = async (collectionName) => {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db("next_test");
    const collection =  db.collection(collectionName);

    return {client, collection};
}

