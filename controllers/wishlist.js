import Wishlist from '../models/wishlist.js';
import User from '../models/user.js';
import Item from '../models/item.js';

// TODO: Pagination not included yet
export const getAllWishlists = async (req, res) => {
  
  try {
    const wishlists = await Wishlist.find({createdBy: req.session.username});
    return res.json(wishlists);
  }catch(err){
    return res.status(500).end(err);
  }
}

export const createWishlist = async (req, res) => {
  try {
    const wishlist = new Wishlist();
    wishlist.createdBy = req.session.username;
    wishlist.title = req.body.title
    const savedWishList = await wishlist.save();

    await User.findOneAndUpdate({username: req.session.username},
      { $push: { wishlists: savedWishList._id } },
      { new: true, useFindAndModify: false });

    return res.json(savedWishList);

  } catch (err) {
    return res.status(500).end(err);
  }
}

export const deleteWishlist = async (req, res) => {
  const _id = req.params.id;
  try {
    const wishlist = await Wishlist.findOne({_id});
    if (!wishlist) return res.status(404).end(`Wishlist id  ${_id} does not exists`);
    if (wishlist.createdBy !== req.session.username) return res.status(403).end('forbidden'); // forbidden users to delete other user's wishlist
    await Wishlist.remove({_id});
    return res.json(wishlist);

  }catch(err){
    return res.status(500).end(err);
  }
}

export const getWishlist = async (req, res) => {
  try {
    const _id =  req.params.id
    const wishlist = await Wishlist.findOne({_id});
    return res.json(wishlist);
  }catch(err){
    return res.status(500).end(err);
  }
}

export const getWishlistItemsFullObjects = async (req, res) => {
  const _id = req.params.id;
  try {
    const wishlist = await Wishlist.findOne({_id});
    if (!wishlist) return res.status(404).end(`Wishlist id  ${_id} does not exists`);
    
    const item_ids = wishlist.items
    const items = await Item.find({ '_id': { $in: item_ids } });
    return res.json(items);

  }catch(err){
    return res.status(500).end(err);
  }
}

export const createWishlistItem = async (req, res) => {
  const _id = req.params.id;
  try {
    const wishlist = await Wishlist.findOne({_id});
    if (!wishlist) return res.status(404).end(`Wishlist id  ${_id} does not exists`);
    // forbidden adding items on other user's wishlist
    if (wishlist.createdBy !== req.session.username) return res.status(403).end('forbidden'); // forbidden users to delete other user's wishlist
    const newItem = new Item();
    newItem.url = req.body.url;
    newItem.name = req.body.name;
    newItem.price = req.body.price
    newItem.wishlist_id = _id;
    await newItem.save();

    // findOneAndUpdate may be deprecated in futrue verion of mongo driver.
    const result = await Wishlist.findOneAndUpdate({_id},
      { $push: { items: newItem._id } },
      { new: true, useFindAndModify: false });
    console.log('res: ', result);

    res.json(newItem);

  }catch(err){
    return res.status(500).end(err);
  }
}

export const deleteWishlistItem = async (req, res) => {
  const item_id = req.params.item_id;
  try {
    const item = await Item.findOne({_id: item_id});
    if (!item) return res.status(404).end(`Item id  ${item_id} does not exists`);
    
    const wishlist = await Wishlist.findOne({_id: item.wishlist_id});
    // forbidden users to delete other user's item in thier wishlist
    if (wishlist.createdBy !== req.session.username) return res.status(403).end('forbidden'); 

    await Item.remove({_id: item_id});

    // remove item from wishlist that item belongs to
    const updatedWishlist = await Wishlist.findOneAndUpdate({_id: item.wishlist_id},
      { $pull: { items: { $in: [ item_id ] } }});

    return res.json({item, updatedWishlist});

  }catch(err){
    return res.status(500).end(err);
  }
}

export const editWishlistItem = async (req, res) => {
  const _id = req.params.item_id;
  try {
    const item = await Item.findOne({_id});
    if (!item) return res.status(404).end(`Item id  ${_id} does not exists`);
    const wishlist = await Wishlist.findOne({_id: item.wishlist_id});
    // forbidden users to update other user's item in thier wishlist
    if (wishlist.createdBy !== req.session.username) return res.status(403).end('forbidden');

    const replace = req.body;
    replace.wishlist_id = item.wishlist_id;
    const result = await Item.findOneAndReplace({_id}, replace, { new: true, useFindAndModify: false });
    return res.json(result);

  } catch(err){
    return res.status(500).end(err);
  }
}
