import express from 'express';
import { signup, signin, signout, getUser} from './controllers/auth.js'
import { createWishlist, deleteWishlist, getWishlist, getAllWishlists,
     getWishlistItemsFullObjects, createWishlistItem, deleteWishlistItem,
     editWishlistItem
} from './controllers/wishlist.js'
import { saveOnboardingForm } from './controllers/onboarding.js' 
import isAuthenticated from './middlewares/isAuth.js'


export default (app) => {
    const authRoutes = express.Router();

    app.use('/auth', authRoutes);

    authRoutes.post('/signup', signup);
    authRoutes.post('/signin', signin);
    authRoutes.get('/signout', signout);
    authRoutes.get('/user', getUser);



    const apiRoutes = express.Router();
    app.use('/api', apiRoutes);
    apiRoutes.use(isAuthenticated); // api only for authenticated users.

    apiRoutes.post('/onboarding', saveOnboardingForm);

    // single wishlist
    apiRoutes.post('/wishlist', createWishlist);
    apiRoutes.delete('/wishlist/:id', deleteWishlist);
    apiRoutes.get('/wishlist/:id', getWishlist)

    // all wishlists
    apiRoutes.get('/wishlists', getAllWishlists);


    // single item for a given wishlist
    apiRoutes.post('/wishlist/:id/item', createWishlistItem);
    apiRoutes.delete('/wishlist/item/:item_id', deleteWishlistItem);
    apiRoutes.put('/wishlist/item/:item_id', editWishlistItem);

    // all items for a given wishlist
    apiRoutes.get('/wishlist/:id/items', getWishlistItemsFullObjects); 
};
