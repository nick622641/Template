import axios from 'axios'
import {     
    ALL_CATEGORYONES_REQUEST,
    ALL_CATEGORYONES_SUCCESS,
    ALL_CATEGORYONES_FAIL,
    CATEGORYONE_DETAILS_REQUEST,
    CATEGORYONE_DETAILS_SUCCESS,
    CATEGORYONE_DETAILS_FAIL,    
    NEW_CATEGORYONE_REQUEST,
    NEW_CATEGORYONE_SUCCESS,
    NEW_CATEGORYONE_FAIL,
    DELETE_CATEGORYONE_REQUEST,
    DELETE_CATEGORYONE_SUCCESS,
    DELETE_CATEGORYONE_FAIL,
    UPDATE_CATEGORYONE_REQUEST,
    UPDATE_CATEGORYONE_SUCCESS,
    UPDATE_CATEGORYONE_FAIL,
    ALL_CATEGORYTWOS_REQUEST,
    ALL_CATEGORYTWOS_SUCCESS,
    ALL_CATEGORYTWOS_FAIL,
    CATEGORYTWO_DETAILS_REQUEST,
    CATEGORYTWO_DETAILS_SUCCESS,
    CATEGORYTWO_DETAILS_FAIL,    
    NEW_CATEGORYTWO_REQUEST,
    NEW_CATEGORYTWO_SUCCESS,
    NEW_CATEGORYTWO_FAIL,
    DELETE_CATEGORYTWO_REQUEST,
    DELETE_CATEGORYTWO_SUCCESS,
    DELETE_CATEGORYTWO_FAIL,
    UPDATE_CATEGORYTWO_REQUEST,
    UPDATE_CATEGORYTWO_SUCCESS,
    UPDATE_CATEGORYTWO_FAIL,
    ALL_CATEGORYTHREES_REQUEST,
    ALL_CATEGORYTHREES_SUCCESS,
    ALL_CATEGORYTHREES_FAIL,
    CATEGORYTHREE_DETAILS_REQUEST,
    CATEGORYTHREE_DETAILS_SUCCESS,
    CATEGORYTHREE_DETAILS_FAIL,    
    NEW_CATEGORYTHREE_REQUEST,
    NEW_CATEGORYTHREE_SUCCESS,
    NEW_CATEGORYTHREE_FAIL,
    DELETE_CATEGORYTHREE_REQUEST,
    DELETE_CATEGORYTHREE_SUCCESS,
    DELETE_CATEGORYTHREE_FAIL,
    UPDATE_CATEGORYTHREE_REQUEST,
    UPDATE_CATEGORYTHREE_SUCCESS,
    UPDATE_CATEGORYTHREE_FAIL, 
    CLEAR_ERRORS
} from '../constants/categoryConstants'

// Get all Category Ones
export const getCategoryOnes = ( ) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORYONES_REQUEST })    
        const { data } = await axios.get('/api/v1/category1')
        dispatch({
            type: ALL_CATEGORYONES_SUCCESS,
            payload: data
        })        
    } catch (error) {
        dispatch({
            type: ALL_CATEGORYONES_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get Category One Details
export const getCategoryOneDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORYONE_DETAILS_REQUEST })    
        const { data } = await axios.get(`/api/v1/category1/${id}`)
        dispatch({
            type: CATEGORYONE_DETAILS_SUCCESS,
            payload: data.data
        })        
    } catch (error) {
        dispatch({
            type: CATEGORYONE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Add new Category One (Admin)
export const newCategoryOne = (formData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_CATEGORYONE_REQUEST })    
        const { data } = await axios.post('/api/v1/admin/category1/new', formData )
        dispatch({
            type: NEW_CATEGORYONE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_CATEGORYONE_FAIL,
            payload: error.response.data.message
        })
    }

}
// Update Category One (Admin)
export const updateCategoryOne = (id, formData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_CATEGORYONE_REQUEST })    
        const { data } = await axios.put(`/api/v1/admin/category1/${id}`, formData )
        dispatch({
            type: UPDATE_CATEGORYONE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORYONE_FAIL,
            payload: error.response.data.message
        })
    }

}
// Delete Category One (Admin)
export const deleteCategoryOne = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_CATEGORYONE_REQUEST })    
        const { data } = await axios.delete(`/api/v1/admin/category1/${id}` )
        dispatch({
            type: DELETE_CATEGORYONE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORYONE_FAIL,
            payload: error.response.data.message
        })
    }

}

// Get Category Twos
export const getCategoryTwos = ( ) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORYTWOS_REQUEST })    
        const { data } = await axios.get('/api/v1/category2')
        dispatch({
            type: ALL_CATEGORYTWOS_SUCCESS,
            payload: data
        })        
    } catch (error) {
        dispatch({
            type: ALL_CATEGORYTWOS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get Category Two Details
export const getCategoryTwoDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type:CATEGORYTWO_DETAILS_REQUEST })    
        const { data } = await axios.get(`/api/v1/category2/${id}`)
        dispatch({
            type:CATEGORYTWO_DETAILS_SUCCESS,
            payload: data.data
        })        
    } catch (error) {
        dispatch({
            type: CATEGORYTWO_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Add new Category Two (Admin)
export const newCategoryTwo = (formData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_CATEGORYTWO_REQUEST })    
        const { data } = await axios.post('/api/v1/admin/category2/new', formData )
        dispatch({
            type: NEW_CATEGORYTWO_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_CATEGORYTWO_FAIL,
            payload: error.response.data.message
        })
    }

}
// Update Category Two (Admin)
export const updateCategoryTwo = (id, formData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_CATEGORYTWO_REQUEST })    
        const { data } = await axios.put(`/api/v1/admin/category2/${id}`, formData )
        dispatch({
            type: UPDATE_CATEGORYTWO_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORYTWO_FAIL,
            payload: error.response.data.message
        })
    }

}
// Delete Category Two (Admin)
export const deleteCategoryTwo = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_CATEGORYTWO_REQUEST })    
        const { data } = await axios.delete(`/api/v1/admin/category2/${id}` )
        dispatch({
            type: DELETE_CATEGORYTWO_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORYTWO_FAIL,
            payload: error.response.data.message
        })
    }

}

// Get Category Threes
export const getCategoryThrees = ( ) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORYTHREES_REQUEST })    
        const { data } = await axios.get('/api/v1/category3')
        dispatch({
            type: ALL_CATEGORYTHREES_SUCCESS,
            payload: data
        })        
    } catch (error) {
        dispatch({
            type: ALL_CATEGORYTHREES_FAIL,
            payload: error.response.data.message
        })
    }
}
// Get Category Three Details
export const getCategoryThreeDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORYTHREE_DETAILS_REQUEST })    
        const { data } = await axios.get(`/api/v1/category3/${id}`)
        dispatch({
            type: CATEGORYTHREE_DETAILS_SUCCESS,
            payload: data.data
        })        
    } catch (error) {
        dispatch({
            type: CATEGORYTHREE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Add new Category Three (Admin)
export const newCategoryThree = (formData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_CATEGORYTHREE_REQUEST })    
        const { data } = await axios.post('/api/v1/admin/category3/new', formData )
        dispatch({
            type: NEW_CATEGORYTHREE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_CATEGORYTHREE_FAIL,
            payload: error.response.data.message
        })
    }

}
// Update Category Three (Admin)
export const updateCategoryThree = (id, formData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_CATEGORYTHREE_REQUEST })    
        const { data } = await axios.put(`/api/v1/admin/category3/${id}`, formData )
        dispatch({
            type: UPDATE_CATEGORYTHREE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORYTHREE_FAIL,
            payload: error.response.data.message
        })
    }

}
// Delete Category Three (Admin)
export const deleteCategoryThree = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_CATEGORYTHREE_REQUEST })    
        const { data } = await axios.delete(`/api/v1/admin/category3/${id}` )
        dispatch({
            type: DELETE_CATEGORYTHREE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORYTHREE_FAIL,
            payload: error.response.data.message
        })
    }

}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}