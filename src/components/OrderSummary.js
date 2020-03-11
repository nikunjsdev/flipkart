import React, { Component } from 'react'
import OrderDetailSummary from './OrderDetailSummary';
import { withRouter } from 'react-router-dom'

class OrderSummary extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            order: []             
        }                
    }

    componentDidMount(){
        let orderData;
       
        if(localStorage.getItem('cartProducts') !== null){
            orderData = JSON.parse(localStorage.getItem('cartProducts'))
        }   
       
        this.setState({
            order: orderData
        })
    }
    
    render() {
        let products;

        if(this.state.order.length > 0){
            products = this.state.order
        }else{
            // this.props.history.push('/')
        }
        
        return (
            <div className="_7XMNLT">
                <div className="_1GRhLX _38vNoF">
                    <h3 className="_2RMAtd">
                        <span className="_1Tmvyj">3</span>
                        <span className="_1_m52b">Order Summary</span>
                    </h3>
                    <div className="_3K1hJZ">
                        <div className="_2eTL2v">
                            <div className="_20egpM">
                                {
                                    products && products.map((item, i) => {
                                        return <OrderDetailSummary item={item} key={i}/> 
                                    })
                                }                                                                
                                <div className="_3cCusG">
                                    <span style={{flex: "1 1 auto"}}>Order confirmation email will be sent to  
                                        <form className="BuHaJm _1pSXw6" role="form">
                                            <input type="email" value="test@gmail.com" readOnly className="_35lzyU" disabled="" placeholder="Enter your email ID"/> 
                                        </form>
                                    </span>
                                    <span id="to-payment">
                                        <button className="_2AkmmA _2Q4i61 _7UHT_c">CONTINUE</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(OrderSummary)
