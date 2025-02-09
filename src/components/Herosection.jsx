'use client'
import React, { useState } from "react";
import Button from "./Button";
import { WiStars } from "react-icons/wi";
import { MdOutlineShowChart } from "react-icons/md";
import { IoIosPlay } from "react-icons/io";
import { IoFilmOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { PiHeadCircuitFill } from "react-icons/pi";
import data from "@/data/card.json";
import Card from "./Card";
import Footer from "./Footer";
import { IoIosClose } from "react-icons/io";

const Herosection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClear = () => {
    setSearchTerm("");
  };

  const clickCategory = (value) => {
    console.log(value);
  };

  return (
    <div className="h-fit md:h-fit p-5 flex flex-col md:ml-28 text-black w-fit">
      <h1 className="text-3xl md:text-5xl font-bold">Discover the Future of</h1>
      <span className="text-3xl md:text-5xl mt-1 block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        AI-Generated Content
      </span>
      <p className="mt-4 text-base md:text-lg">
        Explore a world of AI-powered videos, images & short films crafted just for you.
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <Button bgColor="bg-purple-600" textColor="text-white">
          <WiStars className="text-2xl md:text-3xl inline-block mr-2" />
          Start Creating
        </Button>
        <Button bgColor="bg-black" textColor="text-purple-500">
          Learn More
        </Button>
      </div>

      {/* Search Box */}
      <div className="relative w-full max-w-md mt-8 mb-6">
        <input
          type="text"
          placeholder="Search AI content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoIosClose className="text-2xl" />
          </button>
        )}
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center hover:bg-purple-200 rounded-md" onClick={() => clickCategory("Trending")}>
          <MdOutlineShowChart />
          <Button textColor="text-black">Trending</Button>
        </div>
        <div className="flex items-center hover:bg-purple-200 rounded-md" onClick={() => clickCategory("Videos")}>
          <IoIosPlay />
          <Button textColor="text-black" className="flex items-center">
            Videos
          </Button>
        </div>
        <div className="flex items-center hover:bg-purple-200 rounded-md" onClick={() => clickCategory("AI Short Films")}>
          <IoFilmOutline />
          <Button textColor="text-black" className="flex items-center">
            AI Short Films
          </Button>
        </div>
        <div className="flex items-center hover:bg-purple-200 rounded-md" onClick={() => clickCategory("Marketplace")}>
          <IoCartOutline />
          <Button textColor="text-black" className="flex items-center">
            Marketplace
          </Button>
        </div>
        <div className="flex p-2 items-center hover:bg-purple-200 rounded-md" onClick={() => clickCategory("Creators")}>
          <PiHeadCircuitFill />
          <Button textColor="text-black" className="flex items-center">
            Creators
          </Button>
        </div>
      </div>
      <hr className="m-2" />

      {/* Card Section */}
      <div className="mt-8 flex justify-center flex-wrap gap-5 md :gap-5">
        {data.map((item, index) => (
          <div
            className="flex-1 min-w-[250px] max-w-[350px] h-[250px]"
            key={index}
          >
            <Card
              title={item.title}
              description={item.description}
              creator={item.creator}
              views={item.views}
              type={item.type}
            />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Herosection;