import { Swiper, SwiperSlide } from "swiper/react";
import { slid1, slid2, slid3, slid5, slid6, slid7, HomeBanner, scooter } from "../../constant"; // Ensure these imports are correct
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules"; // Correctly import Autoplay module
import SearchBar from "../SearchBar";

export default function Intro() {
  return (
    <div className="mt-10 mx-auto w-full gap-10 flex flex-col  md:flex-row">
      <div className="md:w-2/3 flex flex-col md:flex-row bg-cover  bg-no-repeat bg-center p-5 rounded-lg" style={{ backgroundImage: `url(${HomeBanner})` }}>
        <div
          className="md:w-1/3  flex  justify-center md:justify-start items-center"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className=" h-2/3">
            <img
              src={scooter}
              alt="illustration"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="md:w-1/2 flex flex-1 flex-col gap-5 justify-center  items-center md:items-start px-6 py-10">
          <h1 className="text-4xl font-extrabold ">Hello Dear,</h1>
          <p className="">
            Hungry? You're in the right place... Order From!
          </p>
          <SearchBar/>
        </div>
      </div>

      <div className="w-full  overflow-hidden rounded-lg md:w-1/3">
        <Swiper
          className="mySwiper"
          modules={[Navigation, Autoplay]} // Use Autoplay module
          autoplay={{ delay: 3000 }} // Add autoplay configuration
          loop={true}
        >
          <SwiperSlide className="flex justify-center items-center">
            <img src={slid1} alt="Slide 1" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center">
            <img src={slid2} alt="Slide 2" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center">
            <img src={slid3} alt="Slide 3" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center">
            <img src={slid5} alt="Slide 5" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center">
            <img src={slid6} alt="Slide 6" className="h-full w-full object-cover" />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center">
            <img src={slid7} alt="Slide 7" className="h-full w-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
