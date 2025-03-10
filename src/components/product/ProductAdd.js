import React from "react";
import usePost from "../../services/usePost";
import { useForm } from "../../services/useForm";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const ProductAdd = ({ handleClose, refetch }) => {
  const { formState, onInputChange, onResetForm } = useForm({
    nombre: "",
    codigo_producto: "",
    costo: "",
    cantidad_disponible: "",
    descripcion: "",
  });

  const { postData, isLoading, error } = usePost(
    "http://localhost:8080/productos/crear"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombreSinEspacios = formState.nombre.trim();

    // Validaciones
    if (!nombreSinEspacios) {
      alert("El nombre es obligatorio");
      return;
    }

   

    if (isNaN(formState.costo) || Number(formState.costo) <= 0) {
      alert("El costo debe ser un número mayor que cero");
      return;
    }

    if (
      isNaN(formState.cantidad_disponible) ||
      !Number.isInteger(Number(formState.cantidad_disponible)) ||
      Number(formState.cantidad_disponible) < 0
    ) {
      alert("La cantidad disponible debe ser un número entero mayor o igual a cero");
      return;
    }

    if (!formState.descripcion.trim()) {
      alert("La descripción es obligatoria");
      return;
    }

    const response = await postData({
      ...formState,
      costo: parseFloat(formState.costo),
      cantidad_disponible: parseInt(formState.cantidad_disponible),
    });

    if (response) {
      onResetForm();
      await refetch();
      handleClose();
    }
  };


  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Agregar Producto
      </Typography>
      <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Nombre"
        name="nombre"
        value={formState.nombre}
        onChange={onInputChange}
        inputProps={{
            pattern: "[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+", // Solo letras y espacios
            maxLength: 50,
        }}
        required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Costo"
          name="costo"
          type="number"
          value={formState.costo}
          onChange={(e) => {
            if (Number(e.target.value) >= 0 || e.target.value === "") {
              onInputChange(e);
            }
          }}
          inputProps={{
            step: "0.01",
            min: "0",
          }}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Cantidad Disponible"
          name="cantidad_disponible"
          type="number"
          value={formState.cantidad_disponible}
          onChange={(e) => {
            const valor = e.target.value;
            if (/^\d*$/.test(valor)) {
              onInputChange(e);
            }
          }}
          inputProps={{
            min: "0",
            step: "1",
          }}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Descripción"
          name="descripcion"
          value={formState.descripcion}
          onChange={(e) => {
            if (e.target.value.length <= 200) {
              onInputChange(e);
            }
          }}
          multiline
          rows={4}
          inputProps={{
            maxLength: 200,
          }}
          required
        />

        <Box sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Box>
      </form>

      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          Error: {error}
        </Alert>
      )}
    </Box>
  );
};

export default ProductAdd;
