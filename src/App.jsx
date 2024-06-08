import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./components/Home";
import Cart from "./components/pages/Cart";
import ProductDetails from "./components/pages/ProductDetails";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Checkout from "./components/pages/Checkout";
import ThankYouPage from "./components/pages/ThankYouPage";
import Header from "./components/Header";
import Profile from "./components/pages/Profile";

// Creating Context
export const ProductDataContext = createContext();

function App() {
  const [showNav, setShowNav] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [cartDetails, setCartDetails] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('')

  // SideBar Toggle Function
  const toggleSideBar = () => setShowNav((prevState) => !prevState);


  // Getting Products Data from Backend
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://dummyjson.com/products/search?q=${searchTerm}&limit=100&skip=0`
    )
      .then((res) => res.json())
      .then((data) => {
        setProductData(data.products);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [searchTerm]);

  // Add Item to Cart
  const handleAddToCart = (product) => {
    setCartDetails([...cartDetails, product]);
    // Toast Notification
    toast.success("Added to Cart!", {
      pauseOnHover: false,
    });
  };

  // Delete or Remove Item from Cart
  const handleRemoveFromCart = (productToRemove) => {
    const indexToRemove = cartDetails.findIndex(
      (item) => item.id === productToRemove.id
    );
    if (indexToRemove !== -1) {
      const updatedCartDetails = [...cartDetails];
      updatedCartDetails.splice(indexToRemove, 1);
      setCartDetails(updatedCartDetails);
    }
  };

  // Create an object to count the quantity of each product
  const itemCounts = cartDetails.reduce((counts, item) => {
    counts[item.title] = (counts[item.title] || 0) + 1;
    return counts;
  }, {});

  // Create a new array of unique products with their quantities
  const uniqueItems = Object.keys(itemCounts).map((name) => {
    const item = cartDetails.find((item) => item.title === name);
    return { ...item, quantity: itemCounts[name] };
  });
  
  // Get Subtotal price of Items in Cart
  let subTotalArray = [];

  cartDetails.forEach((item) => {
    subTotalArray.push(item.price);
  });

  // Add all Prices in Cart together
  const subTotalPrice = subTotalArray.reduce(
    (a, b) => a + b,
    0
  );
  
  return (
    <ErrorBoundary>
      <ProductDataContext.Provider
        value={{
          loading,
          productData,
          cartDetails,
          handleAddToCart,
          handleRemoveFromCart,
          uniqueItems,
          subTotalPrice,
        }}
      >
        <Header
          showNav={showNav}
          setShowNav={setShowNav}
          toggleSideBar={toggleSideBar}
          setSearchTerm={setSearchTerm}
        />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment_successful" element={<ThankYouPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:info" element={<ProductDetails />} />
        </Routes>
      </ProductDataContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
