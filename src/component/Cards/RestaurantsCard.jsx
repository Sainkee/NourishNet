import React from "react";
import { ITEM_IMG_CDN, RES_IMG_CDN } from "../../constant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RestaurantCard = ({ restaurant }) => {
  const handleClick = () => {
   toast.info(" This is static content choose from menu")
  };
  return (
    <div
      onClick={handleClick}
      className=" cursor-pointer rounded-xl overflow-hidden   relative"
    >
      <div className="relative ">
        <img
          className="w-full h-40 object-cover rounded-t-xl"
          src={`${RES_IMG_CDN}/${restaurant.cloudinaryImageId}`}
          alt={restaurant.name}
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-2">
          <span className="text-lg text-white">
            {restaurant?.aggregatedDiscountInfoV3?.subHeader}
          </span>
        </div>
      </div>
      <div className="px-6 py-1 rounded-b-xl">
        <div className="font-bold text-xl mb-2">{restaurant.name}</div>
        <div className="flex items-center text-gray-700 text-base mb-2">
          <span className="font-bold text-green-500 flex items-center">
            <svg
              className="w-4 h-4 fill-current text-green-500 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L1 7.91l6.561-.952L10 1l2.439 5.958L19 7.91l-4.244 3.635 1.122 6.545z" />
            </svg>
            {restaurant.avgRating}
          </span>
          <span className="ml-2">{restaurant.sla.slaString}</span>
        </div>
        <p className="text-gray-700 text-base mb-2">
          {restaurant.locality}, {restaurant.areaName}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
