import React, { useState } from "react";
import usePost from "../../services/usePost";
import { useForm } from "../../services/useForm"; 
import { TextField, Button, Box, Typography, CircularProgress, Alert } from "@mui/material";

const ProductAdd = ({handleClose,refetch}) => {
  

    const { formState, onInputChange, onResetForm } = useForm({
        nombre: "",
        codigo_producto: "",
        costo: "",
        cantidad_disponible: "",
        descripcion: "",
    });
    const { postData, isLoading, error } = usePost("http://localhost:8080/productos/crear");
    const handleSubmit = async (e) => {
        console.log(refetch)
        
        e.preventDefault();
        const response = await postData(formState);
        if (response) {
            console.log("Producto guardado:", response);   
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
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Costo"
                    name="costo"
                    type="number"
                    value={formState.costo}
                    onChange={onInputChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Cantidad Disponible"
                    name="cantidad_disponible"
                    type="number"
                    value={formState.cantidad_disponible}
                    onChange={onInputChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Descripción"
                    name="descripcion"
                    value={formState.descripcion}
                    onChange={onInputChange}
                    multiline
                    rows={4}
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