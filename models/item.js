import mongoose from 'mongoose'

const { Schema, model } = mongoose;

const itemSchema = new Schema({
    name: String,
    url: String,
    wishlist_id: String,
    price: Number
});


export default model('Item', itemSchema);


