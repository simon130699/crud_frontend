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
import { Delete, Edit } from "@mui/icons-material"; // Iconos para eliminar y editar
import { useFetch } from '../../services/useFetch';

export const ProductInfo = () => {
    const { data, isLoading, error } = useFetch("http://localhost:8080/productos");

    // Funciones para eliminar y editar
    const handleDelete = (id) => {
        console.log("Eliminar producto con ID:", id);
        // Aquí puedes agregar la lógica para eliminar el producto
    };

    const handleEdit = (id) => {
        console.log("Editar producto con ID:", id);
        // Aquí puedes agregar la lógica para editar el producto
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
                    <Grid container spacing={1}>
                        {/* Columna para Nombre */}
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Nombre
                            </Typography>
                            {data && data.map((producto, index) => (
                                <Typography key={index} variant="body1">
                                    {producto.nombre}
                                </Typography>
                            ))}
                        </Grid>

                        {/* Columna para Código */}
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Código
                            </Typography>
                            {data && data.map((producto, index) => (
                                <Typography key={index} variant="body1">
                                    {producto.codigo_producto}
                                </Typography>
                            ))}
                        </Grid>

                        {/* Columna para Costo */}
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Costo
                            </Typography>
                            {data && data.map((producto, index) => (
                                <Typography key={index} variant="body1">
                                    ${producto.costo}
                                </Typography>
                            ))}
                        </Grid>

                        {/* Columna para Cantidad */}
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Cantidad
                            </Typography>
                            {data && data.map((producto, index) => (
                                <Typography key={index} variant="body1">
                                    {producto.cantidad_disponible}
                                </Typography>
                            ))}
                        </Grid>

                        {/* Columna para Descripción */}
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Descripción
                            </Typography>
                            {data && data.map((producto, index) => (
                                <Typography key={index} variant="body1">
                                    {producto.descripcion}
                                </Typography>
                            ))}
                        </Grid>

                        {/* Columna para Acciones */}
                        <Grid item xs={2}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Acciones
                            </Typography>
                            {data && data.map((producto, index) => (
                                <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(producto.codigo_producto)} 
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(producto.codigo_producto)} 
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};