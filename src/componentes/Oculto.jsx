import React from 'react'
import {withWidth, Typography, Hidden} from '@material-ui/core'

const Oculto = (props) => {
    return (
        <div>
            <Typography  variant="h6" color="initial">
                Ancho: {props.width}
            </Typography>

            <Hidden  mdDown>
            </Hidden>

            <Hidden only='lg'>
            </Hidden>
        </div>
    )
}

export default withWidth()(Oculto);