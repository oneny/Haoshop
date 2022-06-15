import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from './components/Layout';
import Signin from "./pages/signin/Signin";
import Category from './pages/categories/Category';
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Brand from './pages/brands/Brand';
import Lookbooks from "./pages/lookbooks/Lookbooks";
import Signup from "./pages/signup/Signup";
import Product from "./pages/products/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="lookbooks" element={<Lookbooks />} />
          <Route path="brands/:name" element={<Brand />} />
          <Route path="products/:id" element={<Product />} />
          <Route path=":slug/:cid" element={<Category />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;