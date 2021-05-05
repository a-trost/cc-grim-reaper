import React from "react";
import { RichText } from "prismic-reactjs";

const MySlice = ({ slice }) => (
  <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <h2 className="mb-20 text-3xl font-medium text-center text-gray-900 title-font sm:text-4xl">
        {slice.primary.title}
      </h2>
      <div className="flex flex-wrap -m-4">
        {slice?.items?.map((item, i) => (
          <div className="w-full p-4 lg:w-1/4 md:w-1/2" key={`img-${i}`}>
            <a className="relative block h-48 overflow-hidden rounded">
              <img
                className="block object-cover object-center w-full h-full"
                src={item.image.url}
                alt={item.image.alt}
              />
            </a>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 title-font">
                {item.name}
              </h3>
              <p className="mt-1">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MySlice;
