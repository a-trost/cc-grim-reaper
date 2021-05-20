import React from "react";
import { RichText } from "prismic-reactjs";
import Credit from "../../components/Credit";

const MySlice = ({ slice }) => (
  <section className="relative text-gray-600 body-font">
    <div className="container flex flex-wrap items-center px-5 py-24 mx-auto max-w-7xl">
      <div className="pr-0 lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0">
        <h1 className="text-3xl font-medium text-gray-900 title-font">
          {slice.primary.title}
        </h1>
        <div className="mt-4 leading-relaxed">
          <RichText render={slice.primary.description} />
        </div>
      </div>
      <div className="flex flex-col w-full p-8 mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">
        <h2 className="mb-5 text-lg font-medium text-gray-900 title-font">
          {slice.primary.subheading}
        </h2>
        <div className="relative mb-4">
          <label
            htmlFor="full-name"
            className="text-sm leading-7 text-gray-600"
          >
            Full Name
          </label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="text-sm leading-7 text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
          />
        </div>
        <button className="px-8 py-2 text-lg text-white bg-red-500 border-0 rounded focus:outline-none hover:bg-red-600">
          Share!
        </button>
        <p className="mt-3 text-xs text-gray-500">
          By pressing this button you agree to go peacefully when the reaper
          comes.
        </p>
      </div>
    </div>
    <Credit
      author="Darin Senneff"
      twitter="https://www.twitter.com/dsenneff"
      pending
    />
  </section>
);

export default MySlice;
