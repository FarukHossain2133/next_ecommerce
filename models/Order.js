import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "user"
    },

    products: [
        {
            quantity: { type: Number, default: 1 },
            productId: {
                type: ObjectId,
                ref: "product"
            }
        }
    ],
    email: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    }
);



export default mongoose.models.order || mongoose.model("order", orderSchema)