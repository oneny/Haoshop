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
import Lookbook from "./pages/lookbooks/Lookbook";
import Collections from "./pages/collections/Collections";
import Collection from './pages/collections/Collection';
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Missing from './pages/missing/Missing.jsx';
import { ROLES } from "./utils/roleList";
import UnAuthorized from "./pages/unauthrozied/Unauthorized";
import Search from "./pages/search/Search";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<Cart />} />
          <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="search/:keyword" element={<Search />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="lookbooks" element={<Lookbooks />} />
          <Route path="lookbooks/:id" element={<Lookbook />} />
          <Route path="collections" element={<Collections />} />
          <Route path="collections/:id" element={<Collection />} />
          <Route path="brands/:name" element={<Brand />} />
          <Route path="products/:id" element={<Product />} />
          <Route path=":slug/:cid" element={<Category />} />
        </Route>
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </Router>
  );
}

export default App;