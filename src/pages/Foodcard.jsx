import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { ratepercents } from "../services/helper";

const FoodCart = ({ foodItem }) => {
  const userId = useSelector((state) => state.auth?.user?.uid);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = {
      id: foodItem._id,
      name: foodItem.name,
      image: foodItem.image,
      price: foodItem.price,
      quantity: 1,
    };
    toast.success(`Added ${foodItem.name}`);
    dispatch(addToCart({ cartItem, userId }));
  };
  const getRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };


  return (
    <div className="bg-white max-w-sm m-10 mx-auto shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-full h-40 object-cover object-center"
        src={foodItem.image}
        alt={foodItem.name}
      />
      <div className="p-4">
        <div className="flex justify-between">
          <h2 className="text-green-500 font-bold text-lg mb-2">
            {foodItem.name}
          </h2>
          <span>Rating: {getRandomRating()}</span>
        </div>
        <p className="text-gray-700 text-base mb-4">{foodItem.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold text-xl">
            {ratepercents(foodItem.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
