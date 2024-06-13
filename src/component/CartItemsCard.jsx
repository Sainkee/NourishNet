import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";

export default function CartItemsCard({ item }) {
  const userId = useSelector((state) => state.auth?.user?.uid);
 
  const dispatch = useDispatch();

  const handleIncrementQuantity = (itemId) => {
    dispatch(incrementQuantity({ id: itemId, userId }));
  };

  const handleDecrementQuantity = (itemId) => {
    dispatch(decrementQuantity({ id: itemId, userId }));
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ id: itemId, userId }));
  };
  return (
    <li className="flex justify-between items-center border-b py-2 sm:py-4">
      <div className="flex items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
        />
        <div className="ml-2 sm:ml-4">
          <h3 className="text-sm sm:text-lg font-semibold">{item.name}</h3>
          <div className="flex items-center mt-1 sm:mt-2">
            <button
              className="bg-gray-300 text-gray-700 px-1 py-1 sm:px-2 sm:py-1 rounded-lg text-xs sm:text-sm hover:bg-gray-400 transition"
              onClick={() => handleDecrementQuantity(item.id)}
            >
              -
            </button>
            <p className="mx-1 sm:mx-2 text-xs sm:text-sm">{item.quantity}</p>
            <button
              className="bg-gray-300 text-gray-700 px-1 py-1 sm:px-2 sm:py-1 rounded-lg text-xs sm:text-sm hover:bg-gray-400 transition"
              onClick={() => handleIncrementQuantity(item.id)}
            >
              +
            </button>
          </div>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2">
            ${item.price.toFixed(2)}
          </p>
        </div>
      </div>
      <button
        className="bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-red-700 transition"
        onClick={() => handleRemoveFromCart(item.id)}
      >
        Remove
      </button>
    </li>
  );
}
