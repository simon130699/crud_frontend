import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import ProductAdd from '../product/ProductAdd';
import { useFetch } from "../../services/useFetch";
import { ProductInfo } from "../product/ProductInfo";

export default function ProductFormModal() {
  const [open, setOpen] = useState(false); 
  const { refetch, data, isLoading, hasError } = useFetch("http://localhost:8080/productos");

  const handleClickOpen = () => {
    setOpen(true); // Abrir el modal
  };
  

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
    <>
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Button variant="contained" onClick={handleClickOpen} hideModal>
        Agregar Producto
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Agregar Producto</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <ProductAdd refetch={refetch} handleClose={handleClose} data={data}  />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <ProductInfo data={data} isLoading={isLoading} error={hasError}/>
  </>
    
  );
}