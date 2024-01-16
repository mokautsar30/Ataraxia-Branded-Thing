import React from "react";
import bannerImg from '../assets/img/banner.webp'

const Banner = () => {

  const handleClick = () => {
    console.log("sok tekan-tekan");
  }
  return (
    <div className="bg-white text-gray">
    <header className="py-16">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center">
        <div className="md:w-1/2 text-center">
          <div className="header__content">
            <p className="text-sm uppercase font-bold">GRAB FAST YOUR KIT NOW</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 leading-tight">
              Discover & Shop
              <br />
              The Trend
            </h1>
            <button className="btn mt-4 md:mt-6" onClick={handleClick}>SHOP NOW</button>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 pr-4">
          <div className="header__image">
            <img src={bannerImg} alt="header" className="w-full h-auto rounded-md" />
          </div>
        </div>
      </div>
    </header>
  </div>
  );
};

export default Banner;
