import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer, latestProductReducer, randomProductsReducer, productDetailsReducer, adminProductDetailsReducer, newProductReducer, productReducer, newReviewReducer, productReviewsReducer, reviewReducer } from './reducers/productReducers'
import { categoryThreesReducer, newCategoryThreeReducer, categoryThreeReducer, categoryThreeDetailsReducer, categoryTwosReducer, newCategoryTwoReducer, categoryTwoReducer, categoryTwoDetailsReducer, categoryOnesReducer, newCategoryOneReducer, categoryOneReducer, categoryOneDetailsReducer } from './reducers/categoryReducers'
import { authReducer, userReducer, forgotPasswordReducer, allUsersdReducer, userDetailsReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers'

const reducer = combineReducers({

    categoryOnes: categoryOnesReducer,
    newCategoryOne: newCategoryOneReducer,
    categoryOne: categoryOneReducer,
    categoryOneDetails: categoryOneDetailsReducer,

    categoryTwos: categoryTwosReducer,
    newCategoryTwo: newCategoryTwoReducer,
    categoryTwo: categoryTwoReducer,
    categoryTwoDetails: categoryTwoDetailsReducer,

    categoryThrees: categoryThreesReducer,
    newCategoryThree: newCategoryThreeReducer,
    categoryThree: categoryThreeReducer,
    categoryThreeDetails: categoryThreeDetailsReducer,   
     
    products: productsReducer,    
    productDetails: productDetailsReducer,
    adminProductDetails: adminProductDetailsReducer,    
    newProduct: newProductReducer,
    product: productReducer,

    latestProduct: latestProductReducer,
    randomProducts: randomProductsReducer,    

    productReviews: productReviewsReducer,
    review: reviewReducer,
    newReview: newReviewReducer,

    auth: authReducer,
    user: userReducer,
    allUsers: allUsersdReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,

    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') 
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo') 
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store