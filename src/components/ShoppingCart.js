import React, { Component } from 'react'
import FlipkartLogo from './FlipkartLogo'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../static_data/constants'
import { increment, decrement, userLogin, addToCart, cartItems, addToCartApi } from '../action/getUser'
import { connect } from 'react-redux'
import OrderCartFooter from './OrderCartFooter'
import CartPage from './CartPage'
import CartItemsComp from './CartItemsComp'


let custId
let dispQty = 1
class ShoppingCart extends Component {    
        
    constructor(props) {
        super(props)
    
        this.state = {
            fetchProduct: [],
            tot_amt: 0,
            status: false            
        }
        
        this.incrementCount = this.incrementCount.bind(this)
        this.decrementCount = this.decrementCount.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.saveCartItems = this.saveCartItems.bind(this)

        const token = localStorage.getItem('token')
        if(token !== null){
            this.props.userLogin({value: true})
        }

        custId = localStorage.getItem('custId')

        let totItems = this.props.prodId.length    
        if(totItems > 0){
            this.props.cartItems(totItems)
        }

        this.addToCart()        

        // localStorage.removeItem('quantity')
        // localStorage.removeItem('cartProducts')
                
        let qty = (localStorage.getItem('quantity') - 1)
        
        if(cartItems && qty){           
            this.props.increment(qty, localStorage.getItem('cartProducts'), this.props.location.state.prodId)
        }
    }    
    
    incrementCount = () => {                
        this.props.addToCartApi({prodId:this.props.location.state.prodId, custId, quantity: Number(this.props.quantity), 
            param: 'counter', val: 'incr'})
        // this.props.increment({quantity: this.props.quantity})
    }

    decrementCount = (e) => {        
        if(dispQty > 0){
            this.props.addToCartApi({prodId:this.props.location.state.prodId, custId, quantity: dispQty,
                 param: 'counter', val: 'decr'})
            // this.props.decrement({quantity: this.props.quantity})
        }     
    }

    componentDidMount() {        
        let product_id = this.props.location.state.prodId
        
        // if(product_id > 0){
        //     axios.get(BASE_URL + 'get-product?id=' + product_id)
        //     .then(response => this.setState({fetchProduct: response.data.data[0]}))
        //     .catch(error => console.log(error))
        // }       

        axios.get(BASE_URL + `get-cart-items?id=${custId}`)
        .then(response => {            
            this.setState({fetchProduct: response.data.data})
        })
        .catch(error => console.log(error))
    }    
            
    addToCart = () => {       
        let prodId = this.props.location.state.prodId
        
        if(custId > 0 && prodId > 0){     
            this.props.addToCart(prodId)
        }  
    }

    saveCartItems = () => {
        let cartIt = localStorage.getItem('cartProducts')

        axios.get(BASE_URL + `add-into-cart?id=${custId}&items=${cartIt}`)
        .then(response => {
            if(response.data.status === true){
                console.log(response.data.data)
            }else{
                alert('Something Went Wrong')
            }
        })
        .catch(error => console.log(error))
    }
    
    render() {
        if(this.props.cartProduct && this.props.cartProduct.length > 0){
            localStorage.setItem('cartProducts', JSON.stringify(this.props.cartProduct))
        }
        if(this.props.quantity && this.props.quantity > 0){ 
            localStorage.setItem('quantity', Number(this.props.quantity))
            dispQty = this.props.quantity
        }else{
            dispQty = localStorage.getItem('quantity')
        }
        
        if(JSON.parse(localStorage.getItem('cartProducts')) !== null ){
            localStorage.setItem('itemsInCart', JSON.parse(localStorage.getItem('cartProducts')).length)
        }
        // console.log(this.props.cartProduct)
        // console.log(localStorage.getItem('cartProducts'))
        // if( this.props.quantity >= localStorage.getItem('quantity')){
        //     console.log("Hello: "+ this.props.cartProduct)
        //     localStorage.setItem('cartProducts', JSON.stringify(this.props.cartProduct))
        // }
        
        let product = this.state.fetchProduct        
        let rediLink = '/login-before-buy'
        // if(this.props.isLoggedIn.value === true){
        //     rediLink = '/shopping-cart/' + product.prod_id
        // }
        
        // let tot_amt = 0
        // if(this.props.cartProduct.length > 0){
        //     this.setState({
        //         tot_amt: this.props.cartProduct[0].amount
        //     })            
        // }
                
        
        return (
            <div id="container">
                <div className="_3ybBIU _23_I2B">
                    <div className="_1tz-RS">
                        <div className="_1S7OK2"></div>
                        <div className="_3pNZKl">
                            <div className="_1T-JyI">
                                <div className="_3dGepu">
                                    <FlipkartLogo />                                    
                                </div>
                            </div>
                        </div>
                        <div className="_1S7OK2"></div>
                    </div>
                </div>
                <div className="t-0M7P _27IFdQ">
                    <div className="_1VV5Cf _1QHAXj">
                        <div className="_1SFos- " style={{transform: "scaleX(1)"}}></div>
                    </div>
                    <div className="_3e7xtJ">
                        <div className="_1HmYoV hCUpcT col-12-12">
                            <div className="_1HmYoV _35HD7C" style={{flexGrow: 1, overflow: "visible"}}>
                                <div className="_1HmYoV _35HD7C col-12-12" style={{boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 2px 0px"}}>
                                    <div className="_1HmYoV hCUpcT col-12-12" style={{backgroundColor: "rgb(255, 255, 255)"}}>
                                        <div className="bhgxx2 col-3-12">
                                            <div className="_2EoEbp">
                                                <div className="_1lBhq8">My Cart ({localStorage.getItem('itemsInCart')})</div>
                                                <div></div>
                                            </div>
                                        </div>
                                        <div className="bhgxx2 col-9-12" style={{margin: "5px 10px 0px 0px"}}>
                                            <div className="_2KHWIh _3yhhU7 _1nhGgC" style={{float: "right"}}>
                                                <div className="_29cQtz">
                                                    <img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZWxsaXBzZSBjeD0iOSIgY3k9IjE0LjQ3OCIgZmlsbD0iI0ZGRTExQiIgcng9IjkiIHJ5PSIzLjUyMiIvPjxwYXRoIGZpbGw9IiMyODc0RjAiIGQ9Ik04LjYwOSA3LjAxYy0xLjA4IDAtMS45NTctLjgyNi0xLjk1Ny0xLjg0NSAwLS40ODkuMjA2LS45NTguNTczLTEuMzA0YTIuMDIgMi4wMiAwIDAgMSAxLjM4NC0uNTRjMS4wOCAwIDEuOTU2LjgyNSAxLjk1NiAxLjg0NCAwIC40OS0uMjA2Ljk1OS0uNTczIDEuMzA1cy0uODY0LjU0LTEuMzgzLjU0ek0zLjEzIDUuMTY1YzAgMy44NzQgNS40NzkgOC45MjIgNS40NzkgOC45MjJzNS40NzgtNS4wNDggNS40NzgtOC45MjJDMTQuMDg3IDIuMzEzIDExLjYzNCAwIDguNjA5IDAgNS41ODMgMCAzLjEzIDIuMzEzIDMuMTMgNS4xNjV6Ii8+PC9nPjwvc3ZnPg==" className="_3KEg0q" />
                                                    <span className="_1nBnpg">Deliver to</span>
                                                </div>
                                                <div className="_2FexNG OmFqo5">
                                                    <input type="text" placeholder="Enter delivery pincode"
                                                     value="" maxLength="6" className="_20PCkk" readOnly/>
                                                    <span className="_2m9c-p _3PnL67">Check</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        product.length > 0 ? 
                                        product.map((prod, i) => {
                                            return <CartItemsComp product={prod} key={i}/>
                                        }) : 
                                        <CartPage />
                                    }
                                    
                                    <div className="bhgxx2 col-12-12 _3KsTU0">
                                        <div className="_31gTpz _1RLi8m">
                                            {/* <form> */}
                                                <input type="hidden" name="domain" value="physical" />
                                                <Link to={rediLink}>
                                                    <button className="_2AkmmA iwYpF9 _7UHT_c" 
                                                    onClick={this.saveCartItems}>
                                                        <span>Place Order</span>
                                                    </button>
                                                </Link>
                                            {/* </form> */}                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="_1HmYoV _35HD7C col-4-12 _3KsTU0" style={{padding: "0px 0px 0px 16px"}}>
                                <div className="bhgxx2 col-12-12">
                                    <div className="_3CKRe3">
                                        <div className="_13wOiu"><span className="_2huYiT">Price details</span>
                                            <div className="_2twTWD">
                                                <div className="hJYgKM">
                                                    <div>Price ({localStorage.getItem('itemsInCart')} item)</div>
                                                    <span> ₹
                                                    {                                                            
                                                        this.props.cartProduct.length > 0 ?
                                                        this.props.cartProduct[0].amount > product.price ?
                                                        this.props.cartProduct[0].amount : product.price : 
                                                        localStorage.getItem('quantity') * product.price                                                                
                                                    }
                                                    </span>
                                                </div>
                                                <div className="hJYgKM">
                                                    <div>Delivery Fee</div><span> ₹54</span></div>
                                                <div className="_3xFQAD">
                                                    <div className="hJYgKM">
                                                        <div>Total Payable</div>
                                                        <span> ₹
                                                        {                                                            
                                                            this.props.cartProduct.length > 0 ?
                                                            this.props.cartProduct[0].amount > product.price ?
                                                            this.props.cartProduct[0].amount + 54 : product.price + 54 : 
                                                            localStorage.getItem('quantity') * product.price + 54                                                             
                                                        }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="_22vQVX">You will save ₹1,046 on this order</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="_1HmYoV _35HD7C col-12-12" style={{adding: "20px 0px 0px"}}>
                                    <div className="bhgxx2 col-12-12">
                                        <div className="_3fGoeE">
                                            <div className="_2YxCUy">Safe and Secure Payments.Easy returns.100% Authentic products.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <OrderCartFooter />
                    </div>
                </div>
            </div>    
        )
    }
}

const mapStateToProps = state => {
    return {
        quantity: state.quantity,
        isLoggedIn: state.isLoggedIn,
        prodId: state.prodId,                
        cartProduct: state.cartProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        increment: (count) => dispatch(increment(count)),
        decrement: (count) => dispatch(decrement(count)),
        userLogin: (bool) => dispatch(userLogin(bool)),
        addToCart: (id) => dispatch(addToCart(id)),
        cartItems: (count) => dispatch(cartItems(count)),
        addToCartApi: (prodId, custId, quantity, param) => dispatch(addToCartApi(prodId, custId, quantity, param))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
