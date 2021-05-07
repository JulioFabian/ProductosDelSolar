import React from 'react';
import 'firebaseui/dist/firebaseui.css';
import Firebase from '../server/Firebase';
import Contenedor from '../Contenedor'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import './Login.css';

class Login extends React.Component{

    state = {
        sutenticado : false,
        usuario : "",
        firebase: null
    }

    componentDidMount(){
        const firebase = new Firebase();

        firebase.auth.onAuthStateChanged(authUser => {
            authUser ? 
            this.setState({
                autenticado : true,
                usuario: firebase.auth.currentUser.email,
                firebase : firebase
            })
            : firebase.firebaseui.start("#firebaseui-auth-container",{
                signInSuccesUrl : "/Inicio",
                credentialHelper: "none",
                callbacks: {
                    signInSuccessWithAuthResult : (authResult, redirectUrl) => {
                        this.setState({
                            autenticado : true,
                            usuario : firebase.auth.currentUser.email,
                            firebase: firebase
                        })

                        return false;
                    }
                },
                signInOptions:[
                    {
                        provider : firebase.autorization.EmailAuthProvider.PROVIDER_ID
                    }
                ]
            })
        })

    }
    render(){
        return this.state.autenticado ? 
        (
            <div>
                <React.Fragment>
                    {/* <div>Usuario Logeado {this.state.usuario}</div> */}

                    <Contenedor usuario={this.state.usuario}/>
                    <div className="Login-Box">
                        <h1><Button variant="outlined" color="primary" disableElevation
                                href="/" onClick={()=> {  this.state.firebase.auth.signOut().then(success=> {  
                                            this.setState({ 
                                                autenticado: false })  
                                            })  
                                        }  
                            }>Cerrar Sesión</Button></h1>
                    </div>
                </React.Fragment>
            </div>
        )
        : <div id="firebaseui-auth-container"></div>
    }
}

export default Login;