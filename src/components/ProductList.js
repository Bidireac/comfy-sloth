import React, { useEffect } from 'react';
import GridView from './GridView';
import ListView from './ListView';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/productsSlice';
import { loadProducts } from '../redux/filteredSlice';

const ProductList = () => {
  const products = useSelector((state) => state.products.products);
  const filtered = useSelector(
    (state) => state.filteredProducts.filtered_products
  );
  const grid_view = useSelector((state) => state.filteredProducts.grid_view);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    dispatch(loadProducts(products));
  }, [products]);

  if (filtered.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    );
  }

  if (grid_view === false) {
    return <ListView products={filtered} />;
  }

  return <GridView products={filtered}>product list</GridView>;
};

export default ProductList;
