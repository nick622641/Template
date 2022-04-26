import {     
    ALL_CATEGORYONES_REQUEST,
    ALL_CATEGORYONES_SUCCESS,
    ALL_CATEGORYONES_FAIL,
    CATEGORYONE_DETAILS_REQUEST,
    CATEGORYONE_DETAILS_SUCCESS,
    CATEGORYONE_DETAILS_FAIL,    
    NEW_CATEGORYONE_REQUEST,
    NEW_CATEGORYONE_SUCCESS,
    NEW_CATEGORYONE_RESET,
    NEW_CATEGORYONE_FAIL,
    DELETE_CATEGORYONE_REQUEST,
    DELETE_CATEGORYONE_SUCCESS,
    DELETE_CATEGORYONE_RESET,
    DELETE_CATEGORYONE_FAIL,
    UPDATE_CATEGORYONE_REQUEST,
    UPDATE_CATEGORYONE_SUCCESS,
    UPDATE_CATEGORYONE_RESET,
    UPDATE_CATEGORYONE_FAIL,
    ALL_CATEGORYTWOS_REQUEST,
    ALL_CATEGORYTWOS_SUCCESS,
    ALL_CATEGORYTWOS_FAIL,
    CATEGORYTWO_DETAILS_REQUEST,
    CATEGORYTWO_DETAILS_SUCCESS,
    CATEGORYTWO_DETAILS_FAIL,    
    NEW_CATEGORYTWO_REQUEST,
    NEW_CATEGORYTWO_SUCCESS,
    NEW_CATEGORYTWO_RESET,
    NEW_CATEGORYTWO_FAIL,
    DELETE_CATEGORYTWO_REQUEST,
    DELETE_CATEGORYTWO_SUCCESS,
    DELETE_CATEGORYTWO_RESET,
    DELETE_CATEGORYTWO_FAIL,
    UPDATE_CATEGORYTWO_REQUEST,
    UPDATE_CATEGORYTWO_SUCCESS,
    UPDATE_CATEGORYTWO_RESET,
    UPDATE_CATEGORYTWO_FAIL,
    ALL_CATEGORYTHREES_REQUEST,
    ALL_CATEGORYTHREES_SUCCESS,
    ALL_CATEGORYTHREES_FAIL,
    CATEGORYTHREE_DETAILS_REQUEST,
    CATEGORYTHREE_DETAILS_SUCCESS,
    CATEGORYTHREE_DETAILS_FAIL,    
    NEW_CATEGORYTHREE_REQUEST,
    NEW_CATEGORYTHREE_SUCCESS,
    NEW_CATEGORYTHREE_RESET,
    NEW_CATEGORYTHREE_FAIL,
    DELETE_CATEGORYTHREE_REQUEST,
    DELETE_CATEGORYTHREE_SUCCESS,
    DELETE_CATEGORYTHREE_RESET,
    DELETE_CATEGORYTHREE_FAIL,
    UPDATE_CATEGORYTHREE_REQUEST,
    UPDATE_CATEGORYTHREE_SUCCESS,
    UPDATE_CATEGORYTHREE_RESET,
    UPDATE_CATEGORYTHREE_FAIL,   
    CLEAR_ERRORS
} from '../constants/categoryConstants'

export const categoryOnesReducer = ( state = { categoryOnes: [] }, action ) => {
    switch(action.type) {
        case ALL_CATEGORYONES_REQUEST:
            return {                
                loading: true,
                categoryOnes: []
            }        
        case ALL_CATEGORYONES_SUCCESS:
            return {
                loading: false,
                categoryOnes: action.payload.data               
            }                
        case ALL_CATEGORYONES_FAIL:
             return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const categoryOneDetailsReducer = (state = { categoryOne: {} }, action) => {
    switch(action.type) {
        case CATEGORYONE_DETAILS_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case CATEGORYONE_DETAILS_SUCCESS:
            return {
                loading: false,
                categoryOne: action.payload               
            }                
        case CATEGORYONE_DETAILS_FAIL:
             return {
                 ...state,
                error: action.payload
            }       
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const newCategoryOneReducer = ( state = { categoryOne: {} }, action ) => {
    switch(action.type) {
        case NEW_CATEGORYONE_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case NEW_CATEGORYONE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                categoryOne: action.payload.data               
            }                
        case NEW_CATEGORYONE_FAIL:
             return {
                 ...state,
                loading: false,
                error: action.payload
            }
        case NEW_CATEGORYONE_RESET:
            return {     
                ...state,          
                success: false                
            } 
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const categoryOneReducer = ( state = {}, action ) => {
    switch(action.type) {
        case UPDATE_CATEGORYONE_REQUEST:
        case DELETE_CATEGORYONE_REQUEST:        
            return {     
                ...state,          
                loading: true                
            }        
        case DELETE_CATEGORYONE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload       
            } 
        case UPDATE_CATEGORYONE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload       
            }               
        case UPDATE_CATEGORYONE_FAIL:
        case DELETE_CATEGORYONE_FAIL:
             return {
                 ...state,
                error: action.payload
            }
        case DELETE_CATEGORYONE_RESET:
            return {     
                ...state,          
                isDeleted: false                
            }
        case UPDATE_CATEGORYONE_RESET:
            return {     
                ...state,          
                isUpdated: false                
            }  
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}

export const categoryTwosReducer = ( state = { categoryTwos: [] }, action ) => {
    switch(action.type) {

        case ALL_CATEGORYTWOS_REQUEST:
            return {
                loading: true,
                categoryTwos: []
            }
        
        case ALL_CATEGORYTWOS_SUCCESS:
            return {
                loading: false,
                categoryTwos: action.payload.data               
            }
                
        case ALL_CATEGORYTWOS_FAIL:
             return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }

        default:
            return state
    }
}
export const categoryTwoDetailsReducer = (state = { categoryTwo: {} }, action) => {
    switch(action.type) {
        case CATEGORYTWO_DETAILS_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case CATEGORYTWO_DETAILS_SUCCESS:
            return {
                loading: false,
                categoryTwo: action.payload               
            }                
        case CATEGORYTWO_DETAILS_FAIL:
             return {
                 ...state,
                error: action.payload
            }       
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const newCategoryTwoReducer = ( state = { categoryTwo: {} }, action ) => {

    switch(action.type) {
        case NEW_CATEGORYTWO_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case NEW_CATEGORYTWO_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                categoryTwo: action.payload.data               
            }                
        case NEW_CATEGORYTWO_FAIL:
             return {
                 ...state,
                loading: false,
                error: action.payload
            }
        case NEW_CATEGORYTWO_RESET:
            return {     
                ...state,          
                success: false                
            } 
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const categoryTwoReducer = ( state = {}, action ) => {

    switch(action.type) {
        case UPDATE_CATEGORYTWO_REQUEST:
        case DELETE_CATEGORYTWO_REQUEST:        
            return {     
                ...state,          
                loading: true                
            }        
        case DELETE_CATEGORYTWO_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload       
            } 
        case UPDATE_CATEGORYTWO_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload       
            }               
        case UPDATE_CATEGORYTWO_FAIL:
        case DELETE_CATEGORYTWO_FAIL:
             return {
                 ...state,
                error: action.payload
            }
        case DELETE_CATEGORYTWO_RESET:
            return {     
                ...state,          
                isDeleted: false                
            }
        case UPDATE_CATEGORYTWO_RESET:
            return {     
                ...state,          
                isUpdated: false                
            }  
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}

export const categoryThreesReducer = ( state = { categoryThrees: [] }, action ) => {
    switch(action.type) {

        case ALL_CATEGORYTHREES_REQUEST:
            return {
                loading: true,
                categoryThrees: []
            }
        
        case ALL_CATEGORYTHREES_SUCCESS:
            return {
                loading: false,
                categoryThrees: action.payload.data               
            }
                
        case ALL_CATEGORYTHREES_FAIL:
             return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }

        default:
            return state
    }
}
export const categoryThreeDetailsReducer = (state = { categoryThree: {} }, action) => {
    switch(action.type) {
        case CATEGORYTHREE_DETAILS_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case CATEGORYTHREE_DETAILS_SUCCESS:
            return {
                loading: false,
                categoryThree: action.payload               
            }                
        case CATEGORYTHREE_DETAILS_FAIL:
             return {
                 ...state,
                error: action.payload
            }       
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const newCategoryThreeReducer = ( state = { categoryThree: {} }, action ) => {

    switch(action.type) {
        case NEW_CATEGORYTHREE_REQUEST:
            return {     
                ...state,          
                loading: true                
            }        
        case NEW_CATEGORYTHREE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                categoryThree: action.payload.data               
            }                
        case NEW_CATEGORYTHREE_FAIL:
             return {
                 ...state,
                loading: false,
                error: action.payload
            }
        case NEW_CATEGORYTHREE_RESET:
            return {     
                ...state,          
                success: false                
            } 
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}
export const categoryThreeReducer = ( state = {}, action ) => {

    switch(action.type) {
        case UPDATE_CATEGORYTHREE_REQUEST:
        case DELETE_CATEGORYTHREE_REQUEST:        
            return {     
                ...state,          
                loading: true                
            }        
        case DELETE_CATEGORYTHREE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload       
            } 
        case UPDATE_CATEGORYTHREE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload       
            }               
        case UPDATE_CATEGORYTHREE_FAIL:
        case DELETE_CATEGORYTHREE_FAIL:
             return {
                 ...state,
                error: action.payload
            }
        case DELETE_CATEGORYTHREE_RESET:
            return {     
                ...state,          
                isDeleted: false                
            }
        case UPDATE_CATEGORYTHREE_RESET:
            return {     
                ...state,          
                isUpdated: false                
            }  
        case CLEAR_ERRORS:
            return {
                ...state,
                 error: null
            }
        default:
            return state
    }
}