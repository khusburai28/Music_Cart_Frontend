import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";
import Cart from "./components/Cart/Cart.js";
import Checkout from "./components/Checkout/Checkout.js";
import Home from "./components/Home/Home.js";
import Footer from "./components/Layout/Footer.js";
import Header from "./components/Layout/Header.js";
import Loader from "./components/Layout/Loader.js";
import Success from "./components/Layout/Success.js";
import ProductPage from "./components/ProductPage/ProductPage.js";
import { loadUser } from "./redux/actions/user.js";

function App() {
  const { message, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // var newURL =
  //   window.location.protocol +
  //   "//" +
  //   window.location.host +
  //   "/home";

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <Header />
              <ProductPage />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/loader" element={<Loader />} />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;