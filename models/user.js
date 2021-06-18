import mongoose from 'mongoose'

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username cannot be blank'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required:[true, 'email cannot be blank'],
    trim: true,
    lowercase: true,
    unique: true,
  },
  hash: String,
  salt: String,
  birthDate: Date,
  genderIdentification: String,
  country: String,
  wishlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Wishlist'
  }]
});



export default model('User', userSchema);


