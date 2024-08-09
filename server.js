//1.import expres
import  express from 'express';
import productRouter from './src/features/product/product.routes.js'
import bodyParser from 'body-parser';
import userRouter from './src/features/user/user.routes.js';
//jwtAuth for whenever user want information they want to login through token
import jwtAuth from './src/middleware/jwt.middleware.js';
import cartRouter from './src/features/cart/cartitems.router.js';

//2.create serv`er
const server=express();

// server.use(express.json());

//to parse the data from JSON format to req.body
server.use(bodyParser.json());

//for all APIs of product,redirect to product productRouter
server.use('/api/products',jwtAuth,productRouter)
//for all APIs of cartItems are go from this cartRouter
server.use('/api/cartItems',jwtAuth,cartRouter);
//for all APIs of users,redirect to or from userRouter
server.use('/api/users',userRouter);

//3.Default request handler
server.get('/',(req,res)=>{
    res.send("Welcome to Ecommerce APIs")
})

//4.specify port
server.listen(3000,()=>{
    console.log('server is listening at port 3000');
})