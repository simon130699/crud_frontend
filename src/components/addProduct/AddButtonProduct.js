import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import ProductAdd from '../product/ProductAdd';
import { useFetch } from "../../services/useFetch";

export default function ProductFormModal() {
  const [open, setOpen] = useState(false); 

  // Obtener datos de los productos y la función refetch
  const { refetch, data, isLoading, hasError } = useFetch("http://localhost:8080/productos");
 
  const handleClickOpen = () => {
    setOpen(true); // Abrir el modal
  };
  
  /* const asd = () => {
    try {
      const post = await post
      if(post.success) refetch
      close
    } catch (error) {
      console.log(error);
    }} */
    
  const handleClose = () => {
    setOpen(false); // Cerrar el modal
  };

  useEffect(() => {
    refetch();
    if (hasError) {
      console.error("Error al cargar los productos:", hasError);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Button variant="contained" onClick={handleClickOpen} hideModal>
        Agregar Producto
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Agregar Producto</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <ProductAdd refetch={refetch} handleClose={handleClose}  />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      
    </div>
  );
}