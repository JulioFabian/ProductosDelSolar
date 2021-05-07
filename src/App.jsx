import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './temaConfig'
import Contenedor from './componentes/Contenedor'
// import Login from './componentes/login/Login';
import Login from './componentes/vistas/Login';

function App() {

  return (
    // <Router>
    //   <ThemeProvider theme = {theme}>
    //     <Route type="public" path="/Login" component={Login} />
    //     <Route type="private" path="/Inicio" component={Contenedor}/>
    //   </ThemeProvider>
    // </Router>
      <div className="App">
        <Login />
      </div>
  );
}

export default App;