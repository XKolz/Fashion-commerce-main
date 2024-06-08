import React, { useState, useEffect } from "react";
import DisCountCard from "./DisCountCard";
import Products from "./Products";
import ProductCategories from "./ProductCategories";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../firebase";
import secure from "../assets/secure.png";
import paperBag from "../assets/Paperbag.png";
import catGames from "../assets/catGames.svg";
import catMobile from "../assets/catMobile.svg";
import catShirts from "../assets/catShirts.svg";
import catTrousers from "../assets/catTrousers.svg";
import catAll from "../assets/catAll.svg";

const Home = () => {
  const [greeting, setGreeting] = useState("");

  // Get Current Time and Set Greeting
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  // check if user is connected to the internet
  useEffect(() => {
    if (!navigator.onLine) {
      alert("You are not connected to the internet");
    }
  }, []);


  // Get Current User
  const user = useAuth();

  return (
    <main className="px-5 py-8 bg-[#FDFBFB] font-[quicksand] w-full lg:px-[100px] lg:py-[80px]">
      <div className="mb-3 mt-12 ">
        <h1 className="text-xl md:text-[30px] font-bold">
          {greeting} {user?.displayName || user?.email}!
        </h1>
        <p className="text-[rgba(48,_48,_48,_0.7)] text-sm md:text-lg py-2">
          What got your attention today?
        </p>
      </div>
      <div className="w-full flex gap-x-4 overflow-hidden mb-6">
        <DisCountCard
          title="Get all products at a"
          subTitle="whooping 50% off"
          img={paperBag}
        />
        <DisCountCard
          title="Shop and make"
          subTitle="secure payments with ease"
          img={secure}
        />
        <DisCountCard
          title="Get all products at a"
          subTitle="whooping 50% off"
          img={paperBag}
        />
        <DisCountCard
          title="Shop and make"
          subTitle="secure payments with ease"
          img={secure}
        />
      </div>
      <section className="w-full cursor-pointer">
        <h2 className="font-medium text-sm md:text-lg mb-3">Categories</h2>
        <div className="flex gap-x-[14px]  pb-4 overflow-x-auto">
          <ProductCategories 
           img={catAll} 
           text="All" 
           borderColor="#6BC0CB" 
          />
          <ProductCategories
            img={catTrousers}
            text="Trousers"
            borderColor="#303030"
          />
          <ProductCategories
            img={catShirts}
            text="Shirts"
            borderColor="#303030"
          />
          <ProductCategories
            img={catMobile}
            text="Phones"
            borderColor="#303030"
          />
          <ProductCategories
            img={catGames}
            text="Games"
            borderColor="#303030"
          />
        </div>
      </section>
      <Products />
      <ToastContainer />
    </main>
  );
};

export default Home;
