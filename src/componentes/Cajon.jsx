import React from 'react'

import {
    makeStyles,
    Drawer,
    Divider
} from '@material-ui/core'
import Listas from './Listas'

const estilos = makeStyles(theme => ({
    drawer: {
        width: 240,
        flexShrink: 0,
      },
      drawerPaper: {
        width: 240,
        backgroundColor: '#f5fcfb',
      },
      toolbar: theme.mixins.toolbar,
}))

const Cajon = (props) => {

    const classes = estilos()

    return (
        <Drawer
            className = {classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor ="left"
            variant={props.variant}
            open={props.open}
            onClose={props.onClose ? props.onClose : null}
        >
            <div className={classes.toolbar}></div>
            <Divider />
            <Listas accionAbrir={props.accionAbrir}/>
        </Drawer>
    )
}

export default Cajon