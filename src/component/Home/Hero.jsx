import React, { useState } from "react";
import Intro from "./Intro";
import { menu_list, restaurants } from "../../constant";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import RestaurantCard from "../Cards/RestaurantsCard";
import MenuCard from "../MenuCard";
// import CategoryCard from "../Cards/CategoryCard";
const breakpoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
};

export default function Hero() {
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const handleFilter = (filterOption) => {
    // Filter the restaurants based on the selected filter option
    if (filterOption === "Fast Delivery") {
      setFilteredRestaurants(
        restaurants.filter(
          (restaurant) => restaurant.info.sla.deliveryTime <= 30
        )
      );
    } else if (filterOption === "Ratings 4.0+") {
      setFilteredRestaurants(
        restaurants.filter((restaurant) => restaurant.info.avgRating >= 4.0)
      );
    }
    // Add more filter options as needed

    // Reset the filtered restaurants if no filter option is selected
    if (filterOption === "All") {
      setFilteredRestaurants(restaurants);
    }
  };

  return (
    <div className="w-full">
      <Intro />

      <h2 className="capitalize text-2xl md:text-3xl my-10 font-bold">
        Whats In Your Mind ?
      </h2>
      {/* <CategoryCard /> */}

      <Swiper
        
        breakpoints={breakpoints}
        navigation={true}
        modules={[Navigation, Autoplay]} // Use Autoplay module
          autoplay={{ delay: 3500 }} // Add autoplay configuration
          loop={true}
        pagination={{ clickable: true }}
      >
        {menu_list.map((menuItem) => (
          <SwiperSlide  key={menuItem.menu_name}>
            <MenuCard
              menu_name={menuItem.menu_name}
              imageUrl={menuItem.menu_image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
        <div className="border-2 bg-gray-400/35 my-10"></div>
        
        <h2 className="capitalize text-2xl md:text-3xl my-10 font-bold">
        retaurent near you 
      </h2>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleFilter("Fast Delivery")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          Fast Delivery
        </button>
        <button
          onClick={() => handleFilter("Ratings 4.0+")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          Ratings 4.0+
        </button>
        {/* Add more filter buttons here */}
        <button
          onClick={() => handleFilter("All")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          All
        </button>
      </div>

      <Swiper
        
        breakpoints={breakpoints}
        navigation={true}
        modules={[Navigation, Autoplay]}
        pagination={{ clickable: true }}
      >
        {filteredRestaurants.map((restaurant) => (
          <SwiperSlide key={restaurant.info.id}>
            <RestaurantCard restaurant={restaurant.info} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
