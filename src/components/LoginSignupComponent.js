import React, { Component } from 'react'
import Popup from "reactjs-popup";
import LoginSignupPopup from './LoginSignupPopup';
import SignupPopup from './SignupPopup'
// import { connect } from 'react-redux'
// import { getUser } from '../action/getUser';
import { Link } from 'react-router-dom'

class LoginSignupComponent extends Component{
    render(){
        return(
            <div className="_1jA3uo _34niwY">
                <div className="dHGf8H">                
                    <Popup trigger={<Link className="login-link" to="/">Login</Link>} position="right center">       
                        {/* {close => (                                                            
                            <div className="close" onClick={close}>
                            &times;  */}
                            <LoginSignupPopup />                                                                       
                            {/* </div>                            
                        )}                         */}
                    </Popup>
                    <Popup trigger={<Link to="/">Signup</Link>} position="right center">       
                        {/* {close => (                                                            
                            <div className="close" onClick={close}>
                            &times;  */}
                            <SignupPopup />                                                                       
                            {/* </div>                            
                        )}                         */}
                    </Popup>                    
                </div>
            </div>            
        )
    }
}

// const mapStateToProps = state => {
//     return{
//         user: state.user
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         onLogin: (user) => {
//             dispatch(getUser(user))
//         }
//     }
// }

export default LoginSignupComponent
// export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupComponent)