const express = require('express')

const router = express.Router()

//import controllers
//user
const { addUsers, getUsers, getUser, updateUser, deleteUser, getProfile, getUserProducts } = require('../controllers/user')

//product
const { getProducts, addProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/product')

//login and register
const { register, login } = require('../controllers/auth')

// Middleware
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

//category
const { addCategory, getCategoris, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category')

//transaction
const { addTransaction, getTransactions } = require('../controllers/transaction')

//transaction
const { getAdmin } = require('../controllers/admin')


//route Users
router.post('/users', addUsers)
router.get('/users', auth, getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.get('/user-products', getUserProducts)


router.get('/profiles', getProfile)

//Product
router.get('/products', getProducts)
router.get('/product/:id', auth, getProduct)
router.patch('/product/:id', auth, updateProduct)
router.delete('/product/:id', auth, deleteProduct)
router.post('/product', auth, uploadFile('image'), addProduct);

//register & login
router.post('/register', register)
router.post('/login', login)

//Category
router.post('/category', auth, addCategory)
router.get('/category', getCategoris)
router.get('/category/:id', auth, getCategoryById)
router.patch('/category/:id', auth, updateCategory)
router.delete('/category/:id', auth, deleteCategory)

//transaction
router.get('/transaction', getTransactions)
router.post('/transaction', addTransaction)

//admin
router.get('/admin', getAdmin)



module.exports = router