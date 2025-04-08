import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Pagination,
    IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        minRating: ''
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 1
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        rating: ''
    });
    const [isEdit, setIsEdit] = useState(false);

    const fetchProducts = useCallback(async () => {
        try {
            const params = new URLSearchParams();
            if (filters.search) params.append('search', filters.search);
            if (filters.category) params.append('category', filters.category);
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
            if (filters.minRating) params.append('minRating', filters.minRating);
            params.append('page', pagination.page);
            params.append('limit', pagination.limit);
    
            const response = await axios.get(`http://localhost:5000/api/products?${params.toString()}`);
            setPagination(prev => ({
                ...prev,
                total: response.data.total,
                pages: response.data.pages
            }));
            setProducts(response.data.products);
            
            const uniqueCategories = [...new Set(response.data.products.map(p => p.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }, [filters, pagination.page, pagination.limit]);  // Added pagination.limit to dependencies

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleProductInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenAddDialog = () => {
        setCurrentProduct({
            name: '',
            description: '',
            category: '',
            price: '',
            rating: ''
        });
        setIsEdit(false);
        setOpenDialog(true);
    };

    const handleOpenEditDialog = (product) => {
        setCurrentProduct({
            ...product,
            price: product.price.toString(),
            rating: product.rating.toString()
        });
        setIsEdit(true);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSubmit = async () => {
        try {
            const productData = {
                ...currentProduct,
                price: parseFloat(currentProduct.price),
                rating: parseFloat(currentProduct.rating)
            };

            if (isEdit) {
                await axios.put(`http://localhost:5000/api/products/${currentProduct._id}`, productData);
            } else {
                await axios.post('http://localhost:5000/api/products', productData);
            }

            fetchProducts();
            setOpenDialog(false);
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Product Management
            </Typography>
            
            {/* Filter Section */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Box display="flex" gap={2} alignItems="center">
                    <TextField
                        label="Search"
                        name="search"
                        value={filters.search}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: <SearchIcon color="action" />
                        }}
                    />
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={filters.category}
                            onChange={handleInputChange}
                            label="Category"
                        >
                            <MenuItem value="">All</MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddDialog}
                    >
                        Add Product
                    </Button>
                </Box>
            </Paper>

            {/* Products Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product._id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>
                                    <Chip label={product.category} color="primary" size="small" />
                                </TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.rating}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenEditDialog(product)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(product._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                    count={pagination.pages}
                    page={pagination.page}
                    onChange={(e, page) => setPagination(prev => ({ ...prev, page }))}
                    color="primary"
                />
            </Box>

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{isEdit ? 'Edit Product' : 'Add Product'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={currentProduct.name}
                            onChange={handleProductInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={currentProduct.description}
                            onChange={handleProductInputChange}
                            margin="normal"
                            multiline
                            rows={3}
                        />
                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={currentProduct.category}
                            onChange={handleProductInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={currentProduct.price}
                            onChange={handleProductInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Rating"
                            name="rating"
                            type="number"
                            value={currentProduct.rating}
                            onChange={handleProductInputChange}
                            margin="normal"
                            inputProps={{ min: 0, max: 5, step: 0.1 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {isEdit ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductsPage;