import { Button, Grid } from '@material-ui/core'
import React from 'react'
import Logo1 from '../imagenes/Logo1.jpg'
import LOGODELSOLAR from '../imagenes/LOGODELSOLAR.png'
import './Portada.css';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const images = [
    {
      url: 'https://smartupmarketing.com/wp-content/uploads/2016/07/VentasPYME.jpg',
      title: 'Ventas',
      width: '25%',
    },
    {
      url: 'https://dnb2eg0emsxdz.cloudfront.net/cdn/13/images/curso-online-de-montacargas_l_primaria_1_1580501245.jpg',
      title: 'Inventario',
      width: '25%',
    },
    {
      url: 'https://cdn.aarp.net/content/dam/aarp/health/healthy-living/2018/10/1140-choose-best-yogur-esp.jpg',
      title: 'Clientes',
      width: '25%',
    },
    {
      url: 'https://image.freepik.com/foto-gratis/gente-negocios-dandose-mano-cerrando-trato-exitoso_35666-159.jpg',
      title: 'Proveedores',
      width: '25%',
    },
  ];
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }));

  const style1 = {
    width: "40%", 
    height:"40%", 
    objectFit: "cover",
    alignItems: "center",
    justifyContent: "center",
    
  };

const Portada = () => {

    const classes = useStyles();

    return(
        <div>
            <Grid>
                <img 
                src={LOGODELSOLAR}
                className="Portada-center"
                alt="brand"
                />
            </Grid>
            <Grid className='Portada-carrete'>
            {images.map((image) => (
            <Link to={image.title}>
                <ButtonBase
                focusRipple
                key={image.title}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: image.width,
                }}
                >
                <span
                    className={classes.imageSrc}
                    style={{
                    backgroundImage: `url(${image.url})`,
                    }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                    >
                    {image.title}
                    <span className={classes.imageMarked} />
                    </Typography>
                </span>
                </ButtonBase>
            </Link>
        ))}
        </Grid>
        </div>
    );
}

export default Portada;

/*<Grid className='login-button' align='center'>
            <Button variant="contained" color='primary'>
                Inventario
            </Button>
            </Grid>
            <Grid className='login-button' align='center'>
            <Button variant="contained" color='primary'>
                Clientes
            </Button>
            </Grid>
            <Grid className='login-button' align='center'>
            <Button variant="contained" color='primary' className='login-button-place'>
                Proveedores
            </Button>
            </Grid> */