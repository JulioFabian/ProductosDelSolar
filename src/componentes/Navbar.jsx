import React from 'react'
import {AppBar, IconButton, makeStyles, Toolbar, Typography, Button} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import LOGODELSOLAR from './imagenes/LOGODELSOLAR.png'
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
      },
      title:{
          flexGrow: 1
      },
      appBar: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${240}px)`,
            marginLeft: 240,
        },
      },
}))

const style = {

    background : '#53c4cc'
};
const style2 = {

    color : '#ffffff'
};

const Navbar = (props) => {
    const classes = useStyles()
    return (
        <AppBar className={classes.appBar} style={style}>
            <Toolbar style={style2} >
                <IconButton 
                    style={style}
                    color="inherit"
                    aria-label="menu" 
                    className={classes.menuButton}
                    onClick={() => props.accionAbrir()}
                >
                    <MenuIcon style={style}/>
                </IconButton>
                <Typography className={classes.title}>
                <img src={LOGODELSOLAR} width="50" length="50"/>
                </Typography >
                    {props.usuario}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;