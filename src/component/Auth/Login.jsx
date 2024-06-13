import React, { useState } from "react";
import undraw_eating from "../../assets/undraw_eating.svg";
import {
  signInWithEmailPassword,
  signInWithGoogle,
} from "../../services/firebase";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithGoogle(dispatch);
      toast.success("Signed in with Google successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Error signing in with Google. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailPassword(email, password, dispatch);
      toast.success("Logged in successfully!");
      navigate(-1);
      // Clear form inputs on successful login
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Invalid credentials. If you are a new user, please sign up.");
      toast.error(
        "Invalid credentials. If you are a new user, please sign up."
      );
    }
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    navigate("/signup", { replace: true });
  };

  return (
    <div className="py-20 flex items-center justify-center">
      <div className="flex flex-col-reverse md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-6xl">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={undraw_eating}
            alt="Illustration"
            className="object-cover h-full w-full"
          />
        </div>
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Login to Your Account
          </h2>
          {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}{" "}
              <Link onClick={handleRedirect} className="underline">
                Sign Up
              </Link>
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}
