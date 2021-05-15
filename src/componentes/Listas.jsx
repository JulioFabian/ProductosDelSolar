import React from 'react'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core'
import EventNoteIcon from '@material-ui/icons/EventNote';
import HomeIcon from '@material-ui/icons/Home';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import './Listas.css'

const Listas = (props) => {

    

    return (
        <div style={{backgroundColor: '#f5fcfb',}}>
            <List components='nav'>
                <Link to="/">
                    <ListItem button >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary='INICIO'/>
                    </ListItem>
                </Link>
                <Link to="/Ventas">
                    <ListItem button>
                        <ListItemIcon >
                            <AttachMoneyIcon/>
                        </ListItemIcon>
                        <ListItemText primary='VENTAS'/>
                    </ListItem>
                </Link>
                <Link to="/Inventario">
                    <ListItem button>
                        <ListItemIcon >
                            <AllInboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary='INVENTARIO'/>
                    </ListItem>
                </Link>
                <Link to="/Clientes">
                    <ListItem button>
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary='CLIENTES'/>
                    </ListItem>
                </Link>
                <Link to="/Proveedores">
                <ListItem button>
                    <ListItemIcon>
                        <EventNoteIcon />
                    </ListItemIcon>
                    <ListItemText primary='PROVEEDORES'/>
                </ListItem>
                </Link>
                <Link to="/Compras">
                <ListItem button>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary='COMPRAS'/>
                </ListItem>
                </Link>
                <Divider />
            </List>
        </div>
    )
}

export default Listas;