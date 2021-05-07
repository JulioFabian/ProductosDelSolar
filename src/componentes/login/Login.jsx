import React, { useState } from 'react';
import './Login.css';
import Title from './partes/title/Title';
import Label from './partes/label/Label';
import Input from './partes/input/Input';
import { Grid, Paper } from '@material-ui/core';
import LOGODELSOLAR from '../imagenes/LOGODELSOLAR.png';
import { Link } from 'react-router-dom';

const Login = () => {

    const [user, setUser] = useState('');
    const [ password, setPassword] = useState('');
    const paperStyle={padding: 20, height: '70vh', width: 280, margin: "20px auto"}
    const [ passwordError, setPasswordError] = useState(false);
    const [ isLogin, setIsLogin ] = useState(false);
    const [hasError, setHasError ] = useState(false);
    

    function handleChange(name, value){
        if(name === 'usuario'){
            setUser(value)
            setHasError(false);
        }else{
            if(value.length < 8){
                setPasswordError(true);
                setHasError(false);
            }else{
                setPasswordError(false);
                setPassword(value)
                setHasError(false);
            }
        }
    };

    function ifMatch(param) {
        if(param.user.length > 0 && param.password.length > 0 ){
            if(param.user === 'JulioFabian' && param.password === '12345678'){
                const {user, password} = param;
                let ac = { user, password};
                let account = JSON.stringify(ac);
                localStorage.setItem('account', account);
                setIsLogin(true);
            }else{
                setIsLogin(false);
                setHasError(true);
            }
        }else{
            setIsLogin(false);
            setHasError(true);
        }
    }

    function handleSubmit() {
        let account = {user, password}
        if(account) {
            ifMatch(account);
        }
    }

    return(
        <Grid className='login-container'>
            { isLogin ?
                <>
                    <h1>¡Hola, {user}!</h1>
                    <label> Felicitaciónes, estás logueado. </label>
                </>
                :
                <Paper elevation={10} style={paperStyle} >
                <Grid align='center'>
                    <img src={LOGODELSOLAR} width="70" height="65"/>
                    <h4>Iniciar Sesión</h4>
                    { hasError &&
                        <label className='label-alert'> 
                            Su contraseña o usuario son incorrectos 
                            o no existen.
                        </label>
                    }
                </Grid>
                <Label text='Usuario'/>
                <Input 
                    atribute={{
                        id: 'usuario',
                        name: 'usuario',
                        type: 'text',
                        placeholder: 'Ingrese su usuario'
                    }}
                    handleChange={handleChange}
                />
                <Label text='Contraseña'/>
                <Input 
                    atribute={{
                        id: 'contraseña',
                        name: 'contraseña',
                        type: 'password',
                        placeholder: 'Ingrese su contraseña'
                    }}
                    handleChange={handleChange}
                    param={passwordError}
                />
                { passwordError &&
                    <label className='label-error'>
                        Contraseña inválida o incompleta
                    </label>
                }
                <Link to="/Inicio">
                    <div className='submit-button-container'>
                        <button onClick={handleSubmit} className='submit-button'>
                            Ingresar
                        </button> 
                    </div>
                </Link>
                </Paper>
            }
        </Grid>
    )
};

export default Login;

/* <Paper elevation={10} style={paperStyle} >
                <Grid align='center'>
                    <img src={LOGODELSOLAR} width="70" height="65"/>
                    <h4>Iniciar Sesión</h4>
                </Grid>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Nombre de usuario</InputLabel>
                    <OutlinedInput type="text"
                    id= 'usuario'
                    name= 'usuario'
                    type= 'text'
                    placeholder= 'Ingrese su usuario'
                        atribute={{
                            id: 'usuario',
                            name: 'usuario',
                            type: 'text',
                            placeholder: 'Ingrese su usuario'
                        }}
                        className={clsx(classes.margin, classes.textField)}
                        handleChange={handleChange}
                    />
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Contraseña</InputLabel>
                    <OutlinedInput type= 'password'
                        atribute={{
                            id: 'contraseña',
                            name: 'contraseña',
                            type: 'password',
                            placeholder: 'Ingrese su contraseña'
                        }}
                        className={clsx(classes.margin, classes.textField)}
                        handleChange={handleChange}
                    />
                </FormControl>
                <h1></h1>
                <Grid align='center' margin={10}>
                <button onClick={handleSubmit}>
                    Ingresar
                </button>
                </Grid>
            </Paper> */