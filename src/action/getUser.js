import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, INCRCOUNTER, DECRCOUNTER, ADDTOCART, ITEMSINCART, ADDITEMTOCART } 
from './actionType'
import { BASE_URL } from '../static_data/constants'
import axios from 'axios'

// Async task
export const loginUserAPI = ({email, password}) => {
    
    return (dispatch) => {
        dispatch(loginUser())        

        axios.get(`${BASE_URL}user/login?email=${email}&password=${password}`)
            .then(response => dispatch(loginUserSuccess(response.data.status, response.data.data[0])))
            .catch(error => dispatch(loginUserFail(error)))
    };
}

export const userLogout = (data) => {
    return(dispatch) => {
        dispatch(logout(data))
    }
}

export const userLogin = (data) => {
    return(dispatch) => {
        dispatch(loginUserSuccess(data))
    }
}

export const addToCartApi = ({prodId, custId, quantity, param, val}) => {
    return(dispatch) => {        
        
        axios.get(`${BASE_URL}get-product?id=${prodId}`)
            .then(response => {

                if( val === 'incr'){
                    response.data.data[0]['quantity'] = quantity + 1
                }else if(val === 'decr'){
                    response.data.data[0]['quantity'] = quantity - 1
                }
                
                response.data.data[0]['amount'] = response.data.data[0]['price'] * response.data.data[0]['quantity']
                
                if(param === 'cart'){
                    dispatch(addItemToCart(response.data.data[0], quantity, prodId, false))
                }else if(param === 'counter'){                    
                    dispatch(increment(quantity, response.data.data[0], prodId, false, val))
                }                 
            })
            .catch(error => console.error(error))
    }
}

const loginUser = () => {
    return {
        type: LOGIN,
    }
}

const loginUserSuccess = (data, userData='') => {    
    return {
        type: LOGIN_SUCCESS,
        payload: data,
        id: userData.id,
        userdata: userData
    }
}

const loginUserFail = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error
    }
}

const logout = (data) => {
    return{
        type: LOGOUT,
        payload: data.logout
    }
}

export const increment = (count, items, prodId, load = true, val) => {
    if(load === true){
        if( JSON.parse(localStorage.getItem('cartProducts')) && 
            JSON.parse(localStorage.getItem('cartProducts').length > 0)){
            if(JSON.parse(localStorage.getItem('cartProducts'))[0] !== ''){            
                items = JSON.parse(localStorage.getItem('cartProducts'))[0]
            }
        }
    }

    if( val === 'incr') {        
        return{
            type: INCRCOUNTER,
            count: count,
            item: items,
            id: prodId
        }
    }else{
        return{
            type: DECRCOUNTER,
            count: count,
            item: items,
            id: prodId
        }
    }    
}

export const decrement = (count) => {    
    return{
        type: DECRCOUNTER,
        count: count.quantity
    }
}

export const addToCart = (data) => {
    return{
        type: ADDTOCART,
        prodId: data,
        countItems: data.count
    }
}

export const cartItems = (items) => {
    return{
        type: ITEMSINCART,
        count: items
    }
}

const addItemToCart = (items, qty, id, load = true) => {
    if(load === true){
        if(JSON.parse(localStorage.getItem('cartProducts'))[0] !== ''){
            items = JSON.parse(localStorage.getItem('cartProducts'))[0]
        }
    }    
    return{
        type: ADDITEMTOCART,
        item: items,
        count: qty,
        id: id 
    }
}
