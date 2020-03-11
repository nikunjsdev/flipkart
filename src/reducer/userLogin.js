import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, INCRCOUNTER, DECRCOUNTER, ADDTOCART, ITEMSINCART, ADDITEMTOCART } from '../action/actionType'

const initialState = {
    isLoggedIn: false,
    error: null,    
    userdata: null,
    quantity: 0,
    custId: null,
    prodId: [],
    cartItems: 0,
    cartProduct: []
}

const rootReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: false
            }

        case LOGIN_SUCCESS:                  
            return {
                ...state,
                isLoggedIn: action.payload,
                userdata: action.userdata,
                custId: action.id
            }

        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                error: action.payload
            }

        case LOGOUT:
            return{
                ...state,
                isLoggedIn: action.payload
            }    

        case INCRCOUNTER:                            
            let item = action.item            
            return{
                ...state,
                quantity: Number(action.count) + 1,
                cartProduct: state.cartProduct.map(product => product.prod_id === Number(action.id) ? 
                item : {...product, item}),
                // cartProduct: [...state.cartProduct, action.item]
            }
        
        case DECRCOUNTER:{
            let item = action.item            
            return{
                ...state,
                quantity: Number(action.count) - 1,
                cartProduct: state.cartProduct.map(product => product.prod_id === Number(action.id) ? 
                item : {...product, item}),
                // cartProduct: [...state.cartProduct, action.item]
            }
        }

        case ADDTOCART: {               
            return{
                ...state,
                prodId: [...state.prodId, action.prodId],                
            }
        }

        case ITEMSINCART: {            
            return{
                ...state,
                cartItems: action.count
            }
        }

        case ADDITEMTOCART:{                   
            let item = action.item     
            console.log(item)
            return{
                ...state,
                quantity: action.count + 1,
                // cartProduct: state.cartProduct.map(product => console.log(product.prod_id, Number(action.id)) ), 
                cartProduct: state.cartProduct.map(product => product.prod_id === Number(action.id) ?  
                item : state.cartProduct.concat(action.item)),
                // cartProduct: [...state.cartProduct, action.item]
            }
        }

        default:
            return state;
    }
}

export default rootReducer;