import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ProductList from './components/ProductList/ProductList';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="App">
      <ProductList products={products} />
    </div>
  );
};

export default App;
