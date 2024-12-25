import React, { useEffect, useState } from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <h1>Товары</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
