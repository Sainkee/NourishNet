import React from "react";
// import { useRouteError } from "react-router-dom";
import BackgroundSVG from "../assets/error.svg"; // Update the path to your SVG file
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();

  return (
    <div className=" relative bg-white  bg-opacity-75 w-full  h-screen text-center flex items-center   justify-center rounded-lg shadow-lg">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-500 mb-4">
        Oh no! Something went wrong.<Link className="text-blue-500 underline" to={"/"}>Go to Home</Link>
      </h1>
      
      <p className="text-lg text-gray-700">
        { error?.message || error?.statusText}
      </p>
      <div className="absolute -z-10 bottom-0 w-full flex justify-center">
        <img src={BackgroundSVG} alt="Error" className=" " />
      </div>
    </div>
  );
}
