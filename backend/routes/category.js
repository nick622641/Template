const express = require('express')

const router = express.Router()

const { 
    getCategoryOnes,
    getCategoryOne,
    newCategoryOne,
    updateCategoryOne,
    deleteCategoryOne,
    getCategoryTwos,
    getCategoryTwo,
    newCategoryTwo,
    updateCategoryTwo,
    deleteCategoryTwo,
    getCategoryThrees,
    getCategoryThree,
    newCategoryThree,
    updateCategoryThree,
    deleteCategoryThree   
} = require('../controllers/categoryController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/category1').get(getCategoryOnes)
router.route('/category1/:id').get(getCategoryOne)
router.route('/admin/category1/new').post(isAuthenticatedUser, authorizeRoles('admin'), newCategoryOne)
router.route('/admin/category1/:id')
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateCategoryOne)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategoryOne)

router.route('/category2').get(getCategoryTwos)
router.route('/category2/:id').get(getCategoryTwo)
router.route('/admin/category2/new').post(isAuthenticatedUser, authorizeRoles('admin'), newCategoryTwo)
router.route('/admin/category2/:id')
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateCategoryTwo)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategoryTwo)

router.route('/category3').get(getCategoryThrees)
router.route('/category3/:id').get(getCategoryThree)
router.route('/admin/category3/new').post(isAuthenticatedUser, authorizeRoles('admin'), newCategoryThree)
router.route('/admin/category3/:id')
    .put   (isAuthenticatedUser, authorizeRoles('admin'), updateCategoryThree)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategoryThree)

module.exports = router