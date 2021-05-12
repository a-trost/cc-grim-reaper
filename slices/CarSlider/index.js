import React, { useState } from "react";
import { RichText } from "prismic-reactjs";

const MySlice = ({ slice }) => {
  const [index, setIndex] = useState(0);
  return (
    <section className="text-gray-600 body-font">
      <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto">
        <div className="flex flex-wrap mx-auto mb-20">
          {slice?.items?.map((item, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="inline-flex items-center justify-center w-1/2 py-3 font-medium leading-none tracking-wider text-indigo-500 bg-gray-100 border-b-2 border-indigo-500 rounded-t sm:px-6 sm:w-auto sm:justify-start title-font"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Car {i + 1}
            </button>
          ))}
        </div>
        {slice?.items?.map((item, i) => (
          <div className={index === i ? "block" : "hidden"}>
            <img
              className="block object-cover object-center w-2/3 mx-auto mb-10 rounded xl:w-1/4 lg:w-1/3 md:w-1/2"
              alt={item.carName}
              src={item.image.url}
            />
            <div className="flex flex-col w-full text-center">
              <h1 className="mb-4 text-xl font-medium text-gray-900 title-font">
                {item.carName}
              </h1>
              <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                {item.tagline}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MySlice;
