import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from './components/Layout';
import Signin from "./pages/sign/Signin";
import Category from './pages/categories/Category';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="/:slug/:cid" element={<Category />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;