import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Layout/Header";
import Footer from "../component/Layout/Footer";
import { ToastContainer } from "react-toastify";
export default function Layout() {
  return (
    <>
      <Header />
      <div className="max-w-7xl w-[95%] mx-auto">
        <Outlet />
      </div>
      <Footer />
     
    </>
  );
}
