import React, { useState } from 'react';
import ButtonAppBar from './components/navBar/ButtonAppBar';
import ProductFormModal from './components/addProduct/AddButtonProduct';
import { ProductInfo } from './components/product/ProductInfo';

const App = () => {
    return (
        <div>
            <ButtonAppBar />
                <ProductFormModal  />
                <ProductInfo  />
        </div>
    );
};

export default App;