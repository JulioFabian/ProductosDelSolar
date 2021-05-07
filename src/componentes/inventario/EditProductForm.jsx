import React from 'react'
import { useState, useEffect } from 'react'
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

const EditProductForm = (props) => {
  const [product, setUser] = useState(props.currentProduct)

  useEffect(
    () => {
      setUser(props.currentProduct)
    },
    [ props ]
  )

  const handleInputChange = (event) => {
    const { name, value} = event.target

    setUser({ ...product, [name]: value })
  }

  const classes = useStyles();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (!product.producto || !product.codigo || !product.precioA || !product.precioB || !product.precioC || !product.costo || !product.cantidad){
            return
        }
        props.updateProduct(props.currentProduct.id, product)
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
      color="primary"
    >Editar Producto</button>
      <button
        variant="contained" 
        color="secondary"
        onClick={() => props.setEditing1(false)} 
        className="button muted-button"
      >
        Cancelar
      </button>
      </div>
    </form>
  )
}

export default EditProductForm
