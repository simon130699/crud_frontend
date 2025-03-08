import React, {  } from 'react';
import ButtonAppBar from './components/navBar/ButtonAppBar';
import ProductFormModal from './components/addProduct/AddButtonProduct';

const App = () => {
    return (
        <div>
            <ButtonAppBar />
                <ProductFormModal  />
        </div>
    );
};

export default App;