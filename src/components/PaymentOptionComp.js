import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { BASE_URL } from '../static_data/constants'
import loader from '../assets/images/loader.gif'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../static_data/constants'

class PaymentOptionComp extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isLoading: false
        }

        this.showLoader = this.showLoader.bind(this)
    }

    showLoader = () => {
        let custId = localStorage.getItem('custId')
        let cartIt = localStorage.getItem('cartProducts')

        this.setState({
            isLoading: true
        })

        axios.get(BASE_URL + `order-history?id=${custId}&items=${cartIt}`)
        .then(response => console.log(response))
        .catch(error => console.log(error))

        axios.get(BASE_URL + `remove-cart-item?id=${custId}`)
        .then(response => console.log(response))
        .catch(error => console.log(error))

        setTimeout( () => {
            this.props.history.push('/checkout')
        }, 2000)
    }
    
    render() {
        return (
            <div className="_1GRhLX _38vNoF">
                <h3 className="_2RMAtd">
                    <span className="_1Tmvyj">4</span>
                    <span className="_1_m52b">Payment Options</span>
                </h3>
                <div className="_3K1hJZ">
                    <div className="foVA5Z">    
                        <div className="_1GRhLX _17_fE5">
                            <div>                        
                                <label  htmlFor="COD" className="_8J-bZE _3C6tOa _2i24Q8">
                                    {/* <input type="radio" className="_2haq-9" name="OTHERS" readOnly="" id="COD" value="on" /> */}
                                    {/* <div className="_6ATDKp"></div> */}
                                    <div className="_2o59RR _27CukN">
                                        <div className="_16sk0J">
                                            <div className="_3i_pKg">
                                                <div className="_34nCiT">Cash on Delivery</div>
                                                <div>                                                    
                                                    <form className="_1PX0dX">
                                                        {/* <Link to='/checkout' > */}
                                                            <button className="_2AkmmA _23FrK1 _7UHT_c" 
                                                            tabIndex="2" type="button" onClick={this.showLoader}>
                                                                <span>
                                                                    {
                                                                        this.state.isLoading ? <span>
                                                                        <img src={loader} alt=""/>Loading...</span>
                                                                        : "Confirm Order"
                                                                    }                                                                    
                                                                </span>
                                                            </button>
                                                        {/* </Link>     */}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>            
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}    


export default withRouter(PaymentOptionComp)
