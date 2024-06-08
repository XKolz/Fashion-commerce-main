import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login, signInWithGooglePopup } from "../../firebase";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Login With Email and Password
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      // Toast Notification
      toast.success("Login Successful", {
        pauseOnHover: false,
      });
      setTimeout(() => {
        navigate("/checkout");
      }, 5000);
    } catch (error) {
      // Toast Notification
      toast.error("Login Unsuccessful", {
        pauseOnHover: false,
      });
      console.error(error);
    }
    setLoading(false);
  }
// Handle Login with Google
    async function handleLoginWithGoogle() {
      setLoading(true);
      try {
        await signInWithGooglePopup();
        // Toast Notification
        toast.success("Login Successful", {
          pauseOnHover: false,
        });
        setTimeout(() => {
          navigate("/cart");
        }, 5000);
      } catch (error) {
        // Toast Notification
        toast.error("Login Unsuccessful", {
          pauseOnHover: false,
        });
        console.error(error);
      }
      setLoading(false);
    }

  return (
    <section className="bg-gray-100 px-6 w-full h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-5 w-full rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-5">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              ref={emailRef}
              className="w-full px-3 py-2 border rounded-md outline-none"
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
              className="w-full px-3 py-2 border rounded-md outline-none"
              type="password"
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full px-4 py-2 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>
          <hr className="my-5 border-gray-300" />
          <button
          onClick={handleLoginWithGoogle}
            disabled={loading}
            className="w-full px-4 py-2 text-white font-semibold bg-red-500 rounded-md hover:bg-red-600"
            type="button"
          >
            Login with Google
          </button>
        </form>
        <p className="mt-5 text-center">
          Do not have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            SignUp
          </Link>
        </p>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Login;
