import React, { Component } from 'react'
import FlipkartLogo from './FlipkartLogo'
import { connect } from 'react-redux'
import { userLogin } from '../action/getUser'
import LoginDoneComp from './LoginDoneComp'
import WithoutLoginComp from './WithoutLoginComp'
import DeliveryAddressComp from './DeliveryAddressComp'
import OrderSummary from './OrderSummary'
import PaymentOptionComp from './PaymentOptionComp'
import OrderCartFooter from './OrderCartFooter'
import axios from 'axios'
import { BASE_URL } from '../static_data/constants'

class LoginBeforeBuyPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }

        const token = localStorage.getItem('token')     
        if(token !== null){
            this.props.userLogin({value: true})
        }
    }

    // componentDidMount(){               
    //     let cartIt = localStorage.getItem('cartProducts')
    //     let custId = localStorage.getItem('custId')

    //     axios.get(BASE_URL + `add-into-cart?id=${custId}&items=${cartIt}`)
    //     .then(response => {
    //         if(response.data.status === true){                
    //             console.log(response.data.data)
    //         }else{
    //             alert('Something Went Wrong')
    //         }
    //     })
    //     .catch(error => console.log(error))        
    // }
    
    render() {
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
                <div className="_1Ua1Gl">
                    <div className="row _2e3-6j">
                        <div className="_3B4tat">
                            <div className="_7XMNLT">                                                                    
                                {                                        
                                    this.props.isLoggedIn ? 
                                    <LoginDoneComp /> : <WithoutLoginComp />                                        
                                }                                                                    
                            </div>
                            <DeliveryAddressComp />
                            <OrderSummary />
                            <PaymentOptionComp />
                        </div>
                        <div className="_3CKRe3 _2kYif3">
                            <div className="_3U2uhx">
                                <img alt="" src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/shield_a7ea6b.png" className="yDMSQ9" />
                                <span className="iZvnDD">Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <OrderCartFooter />
            </div>    
        )
    }
}

const mapStateToProps = state => {
    return {        
        isLoggedIn: state.isLoggedIn,        
    }
}

const mapDispatchToProps = dispatch => {
    return {        
        userLogin: (bool) => dispatch(userLogin(bool)),            
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBeforeBuyPage)
