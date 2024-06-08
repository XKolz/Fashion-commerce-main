import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import backArrow from "../../assets/back-arrow.svg";
import star from "../../assets/Star 4.svg";
import { ProductDataContext } from "../../App";
import { useAuth } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";


const Cart = () => {
  const {
    uniqueItems,
    handleAddToCart,
    handleRemoveFromCart,
    cartDetails,
    subTotalPrice,
  } = useContext(ProductDataContext);

  // Navigate to previous page
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  
  
  // Get Current User
  const user = useAuth();

  // Handle Checkout Button
  const handleCheckout = () => {
    if (user && cartDetails.length > 0) {
      navigate("/checkout");
    } else if ((user && cartDetails.length < 1) || (!user && cartDetails.length < 1)) {
      toast.error("Please add product to cart!", {
        pauseOnHover: false,
      });
    } else {
      navigate("/login");
    }
  };
  return (
    <section className="px-[20px] bg-[#FDFBFB] pt-4 mt-12 pb-64 relative">
      <div className="w-[30px] h-[30px] flex justify-center items-center mb-6 bg-[rgba(225,225,225,0.2)] rounded-[100%] cursor-pointer hover:scale-110">
        <img
          onClick={handleBack}
          src={backArrow}
          alt="back arrow icon"
          className="w-[15px] h-[15px]"
        />
      </div>
      {uniqueItems.length < 1 ? (
        <div className="w-full mt-[64px] flex justify-center items-center">
          <div className="w-full h-full bg-gray-100 border shadow-md p-12 rounded-md flex flex-col gap-y-6 justify-center items-center md:max-w-[600px]">
            <p className="text-[#303030] font-semibold animate-bounce">
              Cart is Empty!
            </p>
            <Link
              to="/"
              className=" bg-[#28ADBF] flex  w-fit p-2 rounded-md text-white text-sm hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        uniqueItems.map((cart) => {
          return (
            <div
              key={cart.id}
              className="w-full bg-white shadow-md rounded-md mb-2 border flex justify-between gap-x-[20px] p-4"
            >
              <dmaxiv className="bg-[#C5EAEF] flex justify-center align-center  max-w-[137px] max-h-[120px] rounded-md ">
                <img src={cart.images[0]} alt={cart.title} className="w-fit" />
              </dmaxiv>
              <div className="text-[#303030]">
                <h1 className="font-bold">{cart.title}</h1>
                <div className="flex gap-x-1 mt-4 mb-[15px]">
                  <img src={star} alt="star icon" />
                  <img src={star} alt="star icon" />
                  <img src={star} alt="star icon" />
                  <img src={star} alt="star icon" />
                  <img src={star} alt="star icon" />
                  <p className="text-sm">{cart.rating}</p>
                </div>
                <div className="flex gap-x-6">
                  <p className="font-semibold text-[20px]">${cart.price}</p>
                  <div className="flex gap-x-2 cursor-pointer">
                    <p
                      onClick={() => handleRemoveFromCart(cart)}
                      className="font-bold text-lg"
                    >
                      -
                    </p>
                    <input
                      value={cart.quantity}
                      className="border w-[30px] text-center font-medium"
                    />
                    <p
                      onClick={() => handleAddToCart(cart)}
                      className="font-bold text-lg"
                    >
                      +
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      <footer className="bg-[#fefefe] flex flex-col  rounded-t-3xl border px-[20px] py-6 w-full h-[184px] fixed left-0 bottom-0 z-10">
        <div className="flex justify-between font-bold text-[#303030] text-lg">
          <h3>Total Items: {uniqueItems.length}</h3>
          <div className="">
            <h3>Total Price: ${subTotalPrice.toFixed(2)}</h3>
            <p className="text-xs font-normal mt-1 text-[rgba(48,48,48,0.7)]">
              Delivery fees not included
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleCheckout}
            className="mt-12 bg-[#28ADBF] w-full  text-white font-semibold rounded-sm px-[93px] py-[13px]"
          >
            Checkout
          </button>
        </div>
      </footer>
      <ToastContainer />
    </section>
  );
};

export default Cart;
