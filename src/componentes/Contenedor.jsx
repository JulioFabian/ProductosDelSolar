import React from 'react';

import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";

import {
    Hidden,
    makeStyles
} from '@material-ui/core';

import Navbar from './Navbar';
import Cajon from './Cajon';
import ApartVentas from './ventas/ApartVentas';
import ApartInventario from './inventario/ApartInventario';
import ApartClient from './clientes/ApartClient';
import ApartSupplier from './proveedores/ApartSupplier';
import Portada from './inicio/Portada';
import ApartCompras from './compras/ApartCompras';

const estilos = makeStyles(theme => ({
    root: {
        display: 'flex',
        backgroundColor: "#ffffff",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        padding: theme.spacing(2.5)
    },
}));

const Contenedor = ( {usuario} ) => {

    const classes = estilos()
    const [abrir, setAbrir] = React.useState(false)

    const accionAbrir = () => {
        setAbrir(!abrir)
    }

    return (
        <Router >
        <div  className={classes.root}>
            <Navbar accionAbrir={accionAbrir} usuario={usuario}/>
            <Hidden smDown>
                <Cajon 
                    variant="permanent"
                    open={true}
                    accionAbrir={accionAbrir}
                />
            </Hidden>

            <Hidden mdUp>
                <Cajon 
                    variant="temporary"
                    open={abrir}
                    onClose={accionAbrir}
                    accionAbrir={accionAbrir}
                />
            </Hidden>
            <switch>
                <Route path="/" exact >
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                            <Portada />
                    </div>
                </Route>
                <Route path="/Ventas" exact>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                            <ApartVentas />
                    </div>
                </Route>
                <Route path="/Inventario" exact>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                            <ApartInventario />
                    </div>
                </Route>
                <Route path="/Clientes" exact>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                            <ApartClient />
                    </div>
                </Route>
                <Route path="/Proveedores" exact>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                        <ApartSupplier />
                    </div>
                </Route>
                <Route path="/Compras" exact>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                        <ApartCompras />
                    </div>
                </Route>
            </switch>
        </div>
        </Router>
    )
}

export default Contenedor

//<ApartInventario />

/*<div className={classes.content}>
                        <div className={classes.toolbar}></div>
                            <ApartInventario />
                        
                    </div>*/