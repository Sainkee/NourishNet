import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  signInWithGoogle,
  signUpWithEmailPassword,
  signInWithEmailPassword,
} from "../../services/firebase";
import sign2 from "../../assets/sign2.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailPassword(email, password, dispatch);
      toast.success("Logged in successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Invalid credentials. If you are a new user, please sign up.");
      toast.error("Invalid credentials. If you are a new user, please sign up.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmailPassword(email, password, dispatch);
      handleLogin(e);
      toast.success("Signed up successfully!");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Credential already in use. Please try a different email.");
      toast.error("Credential already in use. Please try a different email.");
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithGoogle(dispatch);
      toast.success("Signed in with Google successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Error signing in with Google. Please try again.");
      toast.error("Error signing in with Google. Please try again.");
    }
  };

  return (
    <div className="py-10 flex items-center justify-center my-10">
    
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg w-full max-w-6xl">
        {/* Form Section */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create Your Account
          </h2>
          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                autoFocus
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
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center">Or</p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Sign Up with Google
            </button>
          </div>
        </div>
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={sign2}
            alt="Illustration"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
