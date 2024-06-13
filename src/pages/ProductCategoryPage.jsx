import React from "react";
import { useParams } from "react-router-dom";
import { food_list } from "../constant"; // Assuming your food data is stored here
import FoodCart from "./Foodcard";

function ProductCategoryPage() {
  const { categoryName } = useParams();

  // Filter food items based on the selected category
  const filteredFood = food_list.filter(
    (food) => food.category.toLowerCase() === categoryName.toLocaleLowerCase()
  );

  return (
    <div>
      <h2 className="capitalize text-2xl md:text-3xl my-10 font-bold">
       Search Result for <span className="text-orange-500">{categoryName}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto gap-4">
        {filteredFood.map((foodItem) => (
          <FoodCart key={foodItem._id} foodItem={foodItem} />
        ))}
      </div>
      <h2 className="capitalize text-2xl md:text-3xl my-10 font-bold">
        all food items
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto gap-4">
        {food_list.map((foodItem) => (
          <FoodCart key={foodItem._id} foodItem={foodItem} />
        ))}
      </div>
    </div>
  );
}

export default ProductCategoryPage;
