import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
} from './pages';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { cartTotals } from './redux/cartSlice';

function App() {
  const cart = useSelector((state) => state.cartProducts.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartTotals());
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products/:id" children={<SingleProduct />} />
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
