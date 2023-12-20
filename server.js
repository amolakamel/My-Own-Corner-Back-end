const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
// connection To DB
async function connect(){
    let connection =  await mongoose.connect('mongodb://0.0.0.0:27017/Cafe');
    if (!connection) {
    console.log('no connect')
    } else {
    console.log('connected to DB...')
   }}
connect()
// create schema
const ProductSchema = new mongoose.Schema({
    id :{
        type :Number,
        required : true,
    } ,
    name :{
        type : String,
        required : true
    } ,
    typeOfProduct : {
        type : String,
        enum : ['Breakfast','Drinks','Desert'],
    },
    
    price :{
        type : Number,
        required : true
    } ,
    description : String ,
});
//convert schema to model (class)
let ProductModel = new mongoose.model("Product", ProductSchema);
// 1- create new document (Product)
let newProduct = new ProductModel({
    id: 1,
    name: "Spinach Smoothie",
    typeOfProduct: "Drinks",
    price: 45,
    description: "Soft Drinks"
}).save();
// 2- create new document (Product)
let new2Product = new ProductModel({
    id: 2,
    name: "Hot Cappuccino",
    typeOfProduct: "Drinks",
    price: 30,
    description: "Hot Drinks"
}).save();
// create new document (Product)
let new3Product = new ProductModel({
    id: 3,
    name: "Sweet Potato Carnitas Hash",
    typeOfProduct: "Breakfast",
    price: 40,
}).save();
/**
 * @desc Get All Product
 * @desc /api/Product
 * @method Get
 * @access public
 */
app.get('/api/Product', async (req, res) => { 
    try { 
    const Product = await ProductModel.find(); 
    res.json(Product); 
    } catch (err) { 
    res.status(500).json({ message: err.message }); 
    } 
}); 
/**
 * @desc Get Product By Id
 * @desc /api/Product/:id
 * @method Get
 * @access public
 */
app.get("/api/Product/:id",async(req,res)=>{
    try{
        const productById = await ProductModel.findOne(
            { id : req.params.id} );
            if(!productById){
            res.status(400).json({message: "product not found"});
            } else{
                res.json(productById);
            }
    }catch(error){
        res.status(401).json({message: "Internal Server error"});
    }
});
/**
 * @desc Create new Product
 * @desc /Product
 * @method Post
 * @access public
 */
app.post('/Product', async (req, res) => { 
    const product = new ProductModel({
        id: app.length+1,
        name: req.body.name,
        typeOfProduct: req.body.typeOfProduct,
        price: req.body.price,
        description: req.body.description,
    });
    try{
        const newProduct = await product.save();
        res.status(201);
        res.json(newProduct);
    } catch(err){
        res.status(400);
        res.json({ message: err.message});
    }
});
/**
 * @desc Update a Product
 * @desc /Product/:id
 * @method put
 * @access public
 */
app.put('/api/product/:id', async (req, res) => {
    try {
        const updateProduct = await ProductModel.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
    );
    if (!updateProduct) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.json(updateProduct);
    }
    } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * @desc Delete a Product
 * @desc api/Product/:id
 * @method delete
 * @access public
 */
app.delete('/api/product/:id', async (req, res) => {
    try {
        const delProduct = await ProductModel.findOneAndDelete({ id: req.params.id });
    if (!delProduct) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.json({ message: 'Product deleted successfully' });
    }
    } catch (error) {
    console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// create schema (bookTable)
const bookTableSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    emailmail:{
        type: String,
        required: true
    },
    Phone:{
        type: String,
        required: true
    },
    Date:{
        type: String,
        required: true
    },
    Time:{
        type: String,
        required: true
    },
    numOfPeople:{
        type: Number,
        required: true
    },
    node: String
});
// convert Schema to Model
let bookTableModel = new mongoose.model("bookTable",bookTableSchema);
// 1- create new document (bookTable)
let newBookTable = new bookTableModel({
    id: 1,
    firstName: "Fatmaa",
    lastName: "Bayomii",
    emailmail: "fatmabayomii124@gmail.com",
    Phone: "01202956964",
    Date: "1/1/2024",
    Time: "8 pm",
    numOfPeople: 5
}).save();
// 2- create new document (bookTable)
let new2BookTable = new bookTableModel({
    id: 2,
    firstName: "Aml",
    lastName: "Mahmoud",
    emailmail: "amlmahmoud364@gmail.com",
    Phone: "01093451266",
    Date: "30/12/2023",
    Time: "7:30 pm",
    numOfPeople: 8
}).save();
/**
 * @desc Get All bookTable
 * @desc /api/bookTable
 * @method Get
 * @access public
 */
app.get('/api/bookTable', async (req, res) => {
    try {
    const book_table = await bookTableModel.find();
    res.json(book_table);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});
/**
 * @desc Get bookTable by id
 * @desc /api/bookTable/:id
 * @method Get
 * @access public
 */
app.get("/api/bookTable/:id",async(req,res)=>{
    try{
        const bookTableById = await bookTableModel.findOne(
            { id : req.params.id} );
            if(!bookTableById){
            res.status(400).json({message: "bookTable not found"});
            } else{
                res.json(bookTableById);
            }
    }catch(error){
        res.status(401).json({message: "Internal Server error"});
    }
});
/**
 * @desc  Create new bookTable
 * @desc /api/bookTable
 * @method post
 * @access public
 */
app.post("/api/bookTable",async(req,res)=>{
    const bookTable = new bookTableModel({
        id: app.length+1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailmail: req.body.emailmail,
        Phone: req.body.Phone,
        Date: req.body.Date,
        Time: req.body.Time,
        numOfPeople: req.body.numOfPeople,
        node: req.body.node
    });
    try{
        const newBookTable = await bookTable.save();
        res.status(201);
        res.json(newBookTable);
    } catch(err){
        res.status(400);
        res.json({ message: err.message});
    }
});
/**
 * @desc   Update a bookTable
 * @desc /api/bookTable
 * @method put
 * @access public
 */
app.put('/api/bookTable/:id',async(req,res)=>{
    try{
        const updateBookTable = await bookTableModel.findOneAndUpdate(
            { id: req.params.id},
            req.body,
            {new: true}
        );
        if(!updateBookTable){
            res.status(404).json({ message: "bookTable not found"});
        } else{
            res.status(200).json(updateBookTable);
        }
    } catch(error){
        console.log("error updating bookTable",error);
        res.status(500).json({message: "Internal Server error"});
    }
});
/**
 * @desc   delete a bookTable
 * @desc /api/bookTable
 * @method delete
 * @access public
 */
app.delete('/api/bookTable/:id',async(req,res)=>{
try{
const delBookTable = await bookTableModel.findOneAndDelete(
        { id: req.params.id},
    )
    if(!delBookTable){
        res.status(404).json({ message: "bookTable not found"});
    } else{
        res.status(200).json({message : "BookTable has Deleted"});
    } } catch(err){
        console.log("Error Deleting BookTable",error);
        res.status(500).json({message: "Internal Server error"});
    }
});
// create schema (feedBack)
const feedBackSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
    type: String,
    required: true 
    },
    email: {
    type: String,
    required: true,
    },
    message: {
    type: String,
    },
});
// Convert Schema To Model
const feedBackModel = mongoose.model("feedback", feedBackSchema);
// create new document (feedBack)
let new1FeedBack = new feedBackModel({
    id: 1,
    name: "Mohamed Ahmed",
    email: "mohamedahmed02@gmail.com",
    message: "المشروب تحفه والمعامله كانت حلوه"
}).save();
// create new document (feedBack)
let new2FeedBack = new feedBackModel({
    id: 2,
    name: "Rawan Elsayed",
    email: "rawanelsayed45@gmail.com",
}).save();
// create new document (feedBack)
let new3FeedBack = new feedBackModel({
    id: 3,
    name: "Nermeen",
    email: "Nermeen934@gmail.com",
    message: "من احسن الكافيهات اللي اتعاملت معاها "
}).save();
/**
 * @desc Get All feadBack
 * @desc /api/feedback
 * @method Get
 * @access public
 */
app.get("/api/feedback",async(req,res)=>{
    try{
    const feedBack = await feedBackModel.find();
    res.status(200)
    res.json(feedBack);
    } catch(err){
        res.status(400)
        res.json({message: "Feadback not found"});
    }   
});
/**
 * @desc Get FeadBack By Id
 * @desc /api/feedback
 * @method Get
 * @access public
 */
app.get("/api/feedback/:id",async(req,res)=>{
    try{
    const feadbackById = await feedBackModel.findOne(
        { id: req.params.id}
    ); if(!feadbackById){
        res.status(401);
        res.json({message: "Feadback not found"});
    }else{
        res.status(201);
        res.json(feadbackById);
    }} catch(err){
        res.status(500)
        res.json({message: "Internal Server error"});
    }
});
/**
 * @desc create new FeadBack 
 * @desc /api/feedback
 * @method post
 * @access public
 */
app.post("/api/feedback",async(req,res)=>{
    const feedback = new feedBackModel({
        id: app.length+1,
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    try{
        const newFeedBack = await feedback.save();
        res.status(201);
        res.json(newFeedBack);
    } catch(err){
        res.status(401);
        res.json({message: err.message});
    }
});
/**
 * @desc  Update a Feedback
 * @desc /api/feedback
 * @method put
 * @access public
 */
app.put("/api/feedback/:id",async(req,res)=>{
    try{
        const updateFeedback = await feedBackModel.findOneAndUpdate(
            { id : req.params.id},
            req.body,
            {new: true}
        );
        if(!updateFeedback){
            res.status(400);
            res.json({message: "Feedback not found"});
        }else{
            res.status(200);
            res.json(updateFeedback);
    }
}catch(err){
    res.status(500);
    res.json({message: err.message});
    }
});
/**
 * @desc  delete a Feedback
 * @desc /api/feedback
 * @method delete
 * @access public
 */
app.delete("/api/feedback/:id",async(req,res)=>{
    try{
    const delFeedback = await feedBackModel.findOneAndDelete(
            { id: req.params.id},
        )
        if(!delFeedback){
            res.status(404).json({ message: "Feedback not found"});
        } else{
            res.status(200).json({message : "Feedback has Deleted"});
        } } catch(err){
            console.log("Error Deleting Feedback",error);
            res.status(500).json({message: "Internal Server error"});
        }
    });


const port = 3000;
app.listen(port,()=>{
    console.log(`Server is Running on Port ${port}`);
});