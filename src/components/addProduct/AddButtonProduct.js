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

  const handleClose = () => {
    setOpen(false); // Cerrar el modal
  };

  // Si los datos son cargados o hay un error, puedes manejarlos aquí
  useEffect(() => {
    // Esto puede ser útil si quieres que algo suceda cuando `data` cambie
    if (data) {
      console.log("Datos actualizados", data);
    }
    if (hasError) {
      console.error("Error al cargar los productos:", hasError);
    }
  }, [data, hasError]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Button variant="contained" onClick={handleClickOpen}>
        Agregar Producto
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Producto</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <ProductAdd handleClose={handleClose} refetch={refetch} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Aquí puedes mostrar los productos si están disponibles */}
      {isLoading ? (
        <p>Cargando productos...</p>
      ) : hasError ? (
        <p>Error al cargar los productos</p>
      ) : (
        <div>
          <h2>Productos:</h2>
          {data?.map(product => (
            <div key={product.codigo_producto}>
              <h3>{product.nombre}</h3>
              <p>{product.descripcion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}