const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const user = require('../controllers/userController');
const index = require('../controllers/user');
const {ProfileUpload} = require('../services/multer');
const {checkLogin, verifyLogin, checkAdminLoggedIn} =
 require('../middlewares/userMiddlewares');


// get requests
router.get('/', checkAdminLoggedIn, user.getHomePage);
router.get('/login', checkAdminLoggedIn, checkLogin, index.getLoginPage);
router.get('/logout', verifyLogin, index.DoLogout);
router.get('/shop', index.getShopPage);
router.get('/product/:id', index.getProductPage);
router.get('/my-profile', verifyLogin, index.getProfilePage);
router.get('/get/image/:image', verifyLogin, index.getImage);
router.get('/cart', verifyLogin, index.getCart);
router.get('/checkout/:token', verifyLogin, index.getCheckout);
router.get('/order/success/:orderId', verifyLogin, index.getSuccessOrder);
router.get('/my-orders', verifyLogin, index.getOrderPage);
router.get('/products', index.getCertainProducts);
router.get('/search/:type/:value', index.getSearchResults);
router.get('/results/:type/:value', index.getResults);
router.get('/email-check', verifyLogin, user.checkEmail);
router.get('/addresses/:id', verifyLogin, index.getOneEditAddress);
router.get('/password/:password', user.checkPasswordExists);
router.get('/wishlist', verifyLogin, index.getWishlist);
router.get('/checkout/check/address', verifyLogin, index.checkAddress);

// post requests
router.post('/signup/email', index.handleEmail);
router.post('/signup/otp', index.handleOtp);
router.post('/signup/resend-otp', index.handleResendOtp);
router.post('/signup/names', index.handleNames);
router.post('/signup/password', index.handlePassword);
router.post('/address', verifyLogin, index.addAddress);
router.post('/get/address', verifyLogin, index.getAddress);
router.post('/add/to/cart', verifyLogin, index.addToCart);
router.post('/checkout', verifyLogin, index.placeOrder);
router.post('/checkout/get/one/address', verifyLogin, index.getOneAddress);
router.post('/checkout/get/address', verifyLogin, index.getAddress);
router.post('/checkout/add/coupon', verifyLogin, index.applyCoupon);
router.post('/checkout/payment/online',
    verifyLogin,
    index.initiatePaymentOnline);
router.post('/checkout/verify/payment', verifyLogin, index.verifyPayment);
router.post('/checkout/check/stock', verifyLogin, index.verifyStock);
router.post('/checkout/address', verifyLogin, index.addAddress);
router.post('/order/details', verifyLogin, index.getOrderDetails);
router.post('/forgotPassword', user.forgotPassword);
router.post('/wishlist', verifyLogin, index.addWishlist);
// post requests
router.post('/login', index.DoLogin);


// route endpoints
router.route('/reset-password/:token')
    .get( checkLogin, user.getResetPassword)
    .post(user.ResetPassword);

// delete requests

router.delete('/delete/address', verifyLogin, index.deleteAddress);
router.delete('/delete/account', verifyLogin, index.deleteAccount);
router.delete('/cart/remove/from/cart', verifyLogin, index.removeFromCart);

// put requests

router.put('/add/image', verifyLogin,
    ProfileUpload.any(), index.addProfilePhoto);
router.put('/cart/increment/quantity', verifyLogin, index.incrementQuantity);
router.put('/cart/decrement/quantity', verifyLogin, index.decrementQuantity);
router.put('/cart/change/size', verifyLogin, index.changeSize);
router.put('/profile', verifyLogin, index.editProfile);
router.put('/addresses', verifyLogin, index.editAddress);

// patch requests

router.patch('/order/change/status', verifyLogin, index.changeStatusOrder);
router.patch('/wishlist', verifyLogin, index.removeFromWishlist);

/* ----------------------------------------- */

module.exports = router;
