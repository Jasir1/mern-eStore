const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads/product'))
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})

// router.route('/products').get(isAuthenticatedUser, getProducts);
router.route('/products').get(getProducts);
router.route('/product/:id')
    .get(getSingleProduct)

router.route('/review')
    .put(isAuthenticatedUser, createReview)
    .delete(deleteReview);
router.route('/reviews').get(getReviews);

//Admin routes
router.route('/admin/product/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), newProduct);
router.route('/admin/products')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/admin/product/:id')
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)
    .put(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), updateProduct);

module.exports = router;


