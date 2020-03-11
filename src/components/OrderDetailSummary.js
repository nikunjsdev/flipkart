import React, { Component } from 'react'
import { BASE_URL } from '../static_data/constants'

class OrderDetailSummary extends Component {    
    render() {        
        let item = this.props.item

        return (
            <div className="_3ycxrs">
                <div className="PaJLWc">
                    <div className="">
                        <div className="_3BTv9X" style={{height: "112px", width: "112px"}}>
                            <img className="_1Nyybr  _30XEf0" alt="" 
                            src={BASE_URL + item.image} />  
                        </div>
                    </div>
                    <div className="_3vIvU_">
                        <div className="_1Ox9a7">
                            <div className="_325-ji">{item.name}</div>
                        </div>
                        <div className="v7-Wbf"> {item.description} </div>
                        <div className="_2EitLy">
                            <span>Seller: {item.brand}</span>
                        </div>
                        <span className="pMSy0p XU9vZa">₹{item.amount}</span>
                        <span className="pMSy0p LYRnr_">₹3,998</span>
                        <span className="hMGTLH">{item.discount}% Off</span>
                        <div className="c8yCDe">
                            <div className="_1YoKa3" id="offers-LSTSMWFEJSDS58XZ33F0IX0U3">3 offers available
                                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" className="_3p6_km">
                                    <g fill="none">
                                        <path d="M-1-1h16v16H-1"></path>
                                        <path d="M7 0C3.136 0 0 3.136 0 7s3.136 7 7 7 7-3.136 7-7-3.136-7-7-7zm.7 10.5H6.3V6.3h1.4v4.2zm0-5.6H6.3V3.5h1.4v1.4z" fill="#388e3c" className=""></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="aCNg3Z">
                        <div className="_3aZm8l">
                            <div className="bzD9az">Delivery by Tue Nov 19 | <span className="_3ACFa6">₹54</span></div>
                        </div>
                        <div className="_2103ss"></div>
                    </div>
                </div>
                <div className="_3cto0P">
                    <div className="_3RkJty">
                        <div className="_3md1dr">
                            <button className="wNrY5O"> – </button>
                            <div className="_2zH4zg">
                                <input type="text" value={item.quantity} className="_2csFM9" readOnly/>
                            </div>
                            <button className="wNrY5O"> + </button>
                        </div>
                    </div>
                    <div className="_3IO2ev _2K02N8 _2x63a8">
                        <div className="gdUKd9" tabIndex="12">
                            <span>Remove</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetailSummary
