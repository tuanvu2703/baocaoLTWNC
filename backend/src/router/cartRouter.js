
import express from 'express';
import { 
    addCart,
    clearCart,
    deleteCart,
    updateCart,
    getCart,

 } from '../Controller/cartController';
import { authenticate } from '../midderwere/midderwere';

const router = express.Router();

router.post('/addcart', authenticate ,addCart);
router.get('/getcart', authenticate ,getCart);
router.delete('/deletecart', authenticate ,deleteCart);
router.delete('/clearcart', authenticate ,clearCart);
router.put('/updatecart', authenticate ,updateCart);

export default router;