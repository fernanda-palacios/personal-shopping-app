import mongoose from 'mongoose'

const { Schema, model } = mongoose;

const wishlistSchema = new Schema({
    createdBy: String,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    title: String
});


export default model('Wishlist', wishlistSchema);


