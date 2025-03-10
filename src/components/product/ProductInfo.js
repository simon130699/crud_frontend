import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useForm } from '../../services/useForm';

export const ProductInfo = ({ data, isLoading, error, refetch }) => {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    
    const initialForm = {
        nombre: '',
        codigo_producto: '',
        costo: '',
        cantidad_disponible: '',
        descripcion: ''
    };
    
    const { formState, onInputChange, onResetForm } = useForm(initialForm);

    // Funciones para eliminar y editar
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/productos/eliminar/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el producto");
            }

            await refetch();

        } catch (error) {
            console.error("Error eliminando el producto:", error);
            alert("Hubo un problema al eliminar el producto");
        }
    };

    // Función para abrir el diálogo de edición
    const handleEdit = (id) => {
        const productToEdit = data.find(product => product.codigo_producto === id);
        
            const productData = {
                nombre: productToEdit.nombre,
                codigo_producto: productToEdit.codigo_producto,
                costo: productToEdit.costo,
                cantidad_disponible: productToEdit.cantidad_disponible,
                descripcion: productToEdit.descripcion
            };
            
            // Reiniciamos el formulario con los datos del producto
            onResetForm(productData);
            
            setOpenEditDialog(true);
        
    };

    // Función para enviar los datos actualizados
    const handleSubmitEdit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/productos/editar/${formState.codigo_producto}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState)
            });
            if (!response.ok) {
                throw new Error("Error al actualizar el producto");
            }

            setOpenEditDialog(false);
            onResetForm(initialForm);
            await refetch();

        } catch (error) {
            console.error("Error actualizando el producto:", error);
            alert("Hubo un problema al actualizar el producto");
        }
    };

    const handleCloseDialog = () => {
        setOpenEditDialog(false);
        onResetForm(initialForm);
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

            {/* Diálogo de edición */}
            <Dialog open={openEditDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Editar Producto</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        name="nombre"
                        value={formState.nombre}
                        onChange={onInputChange}
                        sx={{ mb: 2, mt: 1 }}
                    />
                    <TextField
                        margin="dense"
                        label="Código"
                        type="text"
                        fullWidth
                        name="codigo_producto"
                        value={formState.codigo_producto}
                        disabled 
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Costo"
                        type="number"
                        fullWidth
                        name="costo"
                        value={formState.costo}
                        onChange={onInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Cantidad Disponible"
                        type="number"
                        fullWidth
                        name="cantidad_disponible"
                        value={formState.cantidad_disponible}
                        onChange={onInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        name="descripcion"
                        value={formState.descripcion}
                        onChange={onInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmitEdit} color="primary">
                        Guardar Cambios
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};