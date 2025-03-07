import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stack } from '@mui/material';
import ProductAdd from '../product/ProductAdd';

export default function ProductFormModal() {
  const [open, setOpen] = React.useState(false); 

  const handleClickOpen = () => {
    setOpen(true); // Abrir el modal
  };

  const handleClose = () => {
    
    setOpen(false); // cerrar el modal
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Button variant="contained" onClick={handleClickOpen}>
        Agregar Producto
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Producto</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <ProductAdd/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
