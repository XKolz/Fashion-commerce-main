import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signup, signInWithGooglePopup, } from "../../firebase";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle Signup With Email and Passsword
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      // Toast Notification
      toast.error("Passwords does not match!", {
        pauseOnHover: false,
      });
      return;
    }
    setLoading(true);
    try {
      await signup(emailRef.current.value, confirmPasswordRef.current.value);
      // Toast Notification
      toast.success("SignUp Successful!", {
        pauseOnHover: false,
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      // Toast Notification
      toast.error("SignUp Failed!", {
        pauseOnHover: false,
      });
      console.error(error);
    }
    setLoading(false);
  }



  // Handle Sign up  with Google
  async function handleSignupWithGoogle() {
    setLoading(true);
    try {
      await signInWithGooglePopup();
      // Toast Notification
      toast.success("SignUp Successful", {
        pauseOnHover: false,
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      // Toast Notification
      toast.error("SignUp Unsuccessful", {
        pauseOnHover: false,
      });
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <section className="bg-gray-100 px-6 w-full py-10 mt-10">
      <div className=" max-w-md mx-auto  bg-white p-5 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="email">
              First Name
            </label>
            <input
              ref={firstNameRef}
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="email">
              Last Name
            </label>
            <input
              ref={lastNameRef}
              className="w-full px-3 py-2 border rounded-md"
              type="text"
              required
            />
          </div> */}
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              ref={emailRef}
              className="w-full px-3 py-2 border rounded-md"
              type="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              ref={passwordRef}
              className="w-full px-3 py-2 border rounded-md"
              type="password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-semibold mb-2"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <input
              ref={confirmPasswordRef}
              className="w-full px-3 py-2 border rounded-md"
              type="password"
              required
              autoComplete="true"
            />
          </div>
          <button
            disabled={loading}
            className="w-full px-4 py-2 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Sign Up
          </button>
          <hr className="my-5 border-gray-300" />
          <button
            onClick={handleSignupWithGoogle}
            disabled={loading}
            className="w-full px-4 py-2 text-white font-semibold bg-red-500 rounded-md hover:bg-red-600"
            type="button"
          >
            SignUp with Google
          </button>
        </form>
        <p className="mt-5 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Signup;
