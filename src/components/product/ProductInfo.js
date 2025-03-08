import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Grid,
    IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export const ProductInfo = ({ data, isLoading, error,refetch }) => {

    // Funciones para eliminar y editar
    const handleDelete = async (id) => {
    await refetch();
   /*  const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (!confirmDelete) return; */

    try {
        const response = await fetch(`http://localhost:8080/productos/eliminar/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el producto");
        }

      

    } catch (error) {
        console.error("Error eliminando el producto:", error);
        alert("Hubo un problema al eliminar el producto");
    }
    await refetch();
    };


    const handleEdit = (id) => {
        console.log("Editar producto con ID:", id);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ marginTop: 4 }}>
                Error al cargar los datos: {error.message}
            </Alert>
        );
    }

    return (
        <Box sx={{ marginTop: 4 }}>
            <Typography variant="h5" component="h3" gutterBottom>
                Productos Agregados
            </Typography>
            <Card>
                <CardContent>
                    {/* Encabezados */}
                    <Grid container spacing={2} sx={{ fontWeight: "bold", borderBottom: "2px solid #ddd", paddingBottom: 1 }}>
                        <Grid item xs={2}>Nombre</Grid>
                        <Grid item xs={2}>Código</Grid>
                        <Grid item xs={2}>Costo</Grid>
                        <Grid item xs={2}>Cantidad</Grid>
                        <Grid item xs={2}>Descripción</Grid>
                        <Grid item xs={2}>Acciones</Grid>
                    </Grid>

                    {/* Datos de productos */}
                    {data && data.map((producto, index) => (
                        <Grid container key={index} spacing={2} sx={{ paddingY: 1, borderBottom: "1px solid #eee", alignItems: "center" }}>
                            <Grid item xs={2}>
                                <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                                    {producto.nombre}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="body1">{producto.codigo_producto}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="body1">${producto.costo}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="body1">{producto.cantidad_disponible}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                                    {producto.descripcion}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', gap: 1 }}>
                                <IconButton color="primary" onClick={() => handleEdit(producto.codigo_producto)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(producto.codigo_producto)}>
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                </CardContent>
            </Card>
        </Box>
    );
};
