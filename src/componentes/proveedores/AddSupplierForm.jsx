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

const AddSupplierForm = (props) => {

  const initialFormState = {
    id: null, nombre: '', direccion: '', telefono: ''
  }
  const [supplier, setUser] = useState(initialFormState)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setUser({ ...supplier, [name]: value })
  }

  const classes = useStyles();

  return (
    <form
    className={classes.root}
    onSubmit={(event) => {
      event.preventDefault()
      if (!supplier.nombre || !supplier.direccion || !supplier.telefono){
          return
      }

      props.addSupplier(supplier)
      setUser(initialFormState)
    }}
  >
    <div>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Nombre</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="nombre"
      value={supplier.nombre}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Dirección</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="direccion"
      value={supplier.direccion}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">Telefono</InputLabel>
      <OutlinedInput
      id="outlined-adornment-amount"
      type="text"
      name="telefono"
      value={supplier.telefono}
      className={clsx(classes.margin, classes.textField)}
      onChange={handleInputChange}
      />
    </FormControl>
    </div>
    <div>
    <button 
      variant="contained"
    >Agregar Proveedor</button>
    </div>
  </form> 
  )
}

export default AddSupplierForm