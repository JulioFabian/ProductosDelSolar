import React from 'react'
import { useState } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(0.5),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const AddProductForm = (props) => {

  const initialFormState = {
    id: null, producto: '', codigo: '', precioA: '',
    precioB: '', precioC: '', costo: '', cantidad: '' 
  }
  const [product, setUser] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setUser({ ...product, [name]: value })
  }

  const classes = useStyles();

  return (
    <form
    className={classes.root}
    onSubmit={(event) => {
      event.preventDefault()
      if (!product.producto || !product.codigo || !product.precioA || !product.precioB || !product.precioC || !product.costo || !product.cantidad){
          return
      }

      props.addProduct(product)
      setUser(initialFormState)
    }}
  >
    <div>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Producto</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="producto"
      value={product.producto}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Código</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="codigo"
      value={product.codigo}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <div>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">PrecioA</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="precioA"
      value={product.precioA}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">PrecioB</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="precioB"
      value={product.precioB}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">PrecioC</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="precioC"
      value={product.precioC}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    </div>
    <div>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Costo</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="costo"
      value={product.costo}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Cantidad</InputLabel>
      <OutlinedInput
      type="number"
      label="number"
      name="cantidad"
      value={product.cantidad}
      onChange={handleInputChange}
    />
    </FormControl>
    </div>
    </div>
    <div>
    <button 
      variant="contained"
    >Agregar Producto</button>
    </div>
  </form>
  )
}

export default AddProductForm

/*
<form onSubmit={(event)}>
            <label>Producto</label>
            <input type="text" name="producto">

            </input>
            <label>Cantidad</label>
            <input type="text" name="cantidad"/>
            <button>Agregar Producto</button>
        </form>
*/

/*<form
      onSubmit={(event) => {
        event.preventDefault()
        if (!product.producto || !product.cantidad) return

        props.addProduct(product)
        setProduct(initialFormState)
      }}
    >
      <label>Producto</label>
      <input
        type="text"
        name="producto"
        value={product.producto}
        onChange={handleInputChange}
      />
      <label>Cantidad</label>
      <input
        type="text"
        name="cantidad"
        value={product.cantidad}
        onChange={handleInputChange}
      />
      <button>Agregar Producto</button>
    </form>*/

    /* const initialFormState = { id: null, producto: "hola", cantidad: "julio" }
  const [product, setProduct] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { producto, value } = event.target

    setProduct({ ...product, [producto]: value })
  }*/

  //Github






  /*<form
      className={classes.root}
      onSubmit={(event) => {
        event.preventDefault()
        if (!product.producto || !product.cantidad){
            return
        }

        props.addProduct(product)
        setUser(initialFormState)
      }}
    >
      <label>producto</label>
      <input
        type="text"
        name="producto"
        value={product.producto}
        onChange={handleInputChange}
      />
      <label>precioA</label>
      <input
        type="number"
        label="number"
        name="cantidad"
        value={product.cantidad}
        onChange={handleInputChange}
      />
      <label>precioB</label>
      <input
        type="number"
        label="number"
        name="cantidad"
        value={product.cantidad}
        onChange={handleInputChange}
      />
      <label>precioC</label>
      <input
        type="number"
        label="number"
        name="cantidad"
        value={product.cantidad}
        onChange={handleInputChange}
      />
      <label>costo</label>
      <input
        type="number"
        label="number"
        name="cantidad"
        value={product.cantidad}
        onChange={handleInputChange}
      />
      <label>cantidad</label>
      <input
        type="number"
        label="number"
        name="cantidad"
        value={product.cantidad}
        onChange={handleInputChange}
      />
      <button variant="contained">Agregar Producto</button>
    </form>*/