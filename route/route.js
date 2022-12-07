const express=require("express");
const userController=require('../controllers/userController');

const route=express.Router();

route.get('/',userController.index);
route.get('/create',userController.create);
route.get('/edit/:id',userController.edit);
route.post('/insert',userController.insert);
route.post('/update',userController.update);
route.get('/delete/:id',userController.destroy);

module.exports=route;