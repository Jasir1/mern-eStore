const express = require('express');
const { newOrder, getSingleOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser, getMyOrders);

//admin
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports = router;