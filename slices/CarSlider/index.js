import React, { useState } from "react";
import Credit from "../../components/Credit";

const MySlice = ({ slice }) => {
  return (
    <section className="relative p-12 overflow-hidden text-white bg-red-800 car-slider font-display lg:py-40 lg:px-0">
      <div className="relative w-full m-auto md:max-w-6xl h-96">
        {slice?.items?.map((item, i) => (
          <React.Fragment key={`car-${i}`}>
            <input type="radio" name="trigger" id={`car-${i}`} checked />
            {/* Slide */}
            <div className="absolute w-full h-full">
              {i > 0 && (
                <label
                  htmlFor={`car-${i - 1}`}
                  tabindex="0"
                  tabindex="0"
                  className="absolute left-0 text-6xl transition transform -translate-y-1/2 opacity-50 cursor-pointer focus:ring-2 focus:ring-red-100 hover:opacity-100 top-1/2"
                >
                  {"<"}
                </label>
              )}
              <div className="absolute top-0 left-0 transform title -rotate-6">
                <h2 className="text-5xl uppercase lg:text-7xl">
                  {item.carName}
                </h2>
                <h3 className="relative text-xl text-gray-900 opacity-75 lg:text-2xl left-12">
                  {item.tagline}
                </h3>
              </div>
              <div className="absolute left-0 right-0 w-3/4 m-auto transform -translate-y-1/2 lg:w-1/3 md:w-1/2 car top-1/2">
                <img src={item.image.url} alt={item.carName} />
                <img
                  class="wheel wheel--back "
                  src="https://assets.codepen.io/217233/grimwheel.svg"
                />
                <img
                  class="wheel wheel--front"
                  src="https://assets.codepen.io/217233/grimwheel.svg"
                />
                <div class="smoke">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 text-right transform price -rotate-6">
                <p className="text-2xl text-gray-900 opacity-75 lg:text-4xl">
                  Just
                </p>
                <h3 className="text-4xl lg:text-7xl">${item.price}</h3>
                <button className="px-6 py-2 mt-2 text-red-900 transition-transform duration-200 transform bg-white rounded-lg hover:scale-110 focus:ring-2 focus:ring-blue-600">
                  Trade In For Soul
                </button>
              </div>
              {i < slice.items.length - 1 && (
                <label
                  htmlFor={`car-${i + 1}`}
                  tabindex="0"
                  className="absolute right-0 text-6xl transition transform -translate-y-1/2 opacity-50 cursor-pointer hover:opacity-100 top-1/2 focus:ring-2 focus:ring-red-100"
                >
                  {">"}
                </label>
              )}
            </div>
            {/* Slide End */}
          </React.Fragment>
        ))}
        <div class="shadow absolute left-0 right-0 transform -translate-y-1/2 m-auto"></div>
      </div>
      <Credit
        author="Jamie Coulter"
        twitter="https://twitter.com/jamiecoulter89"
      />
    </section>
  );
};

export default MySlice;
