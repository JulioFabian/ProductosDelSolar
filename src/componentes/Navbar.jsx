import React from 'react'
import {AppBar, IconButton, makeStyles, Toolbar, Typography, Button} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import LOGODELSOLAR from './imagenes/LOGODELSOLAR.png'

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

const Navbar = (props) => {
    const classes = useStyles()
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton 
                    color = "inherit"
                    aria-label="menu" 
                    className={classes.menuButton}
                    onClick={() => props.accionAbrir()}
                >
                    <MenuIcon />
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