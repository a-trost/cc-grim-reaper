import React, { useState } from "react";
import { RichText } from "prismic-reactjs";
import Credit from "../../components/Credit";

const MySlice = ({ slice }) => {
  const [prize, setPrize] = useState("");

  const prizeOptions = slice.items.map((item) => item.text);

  function pickRandomPrize() {
    if (!prize)
      setPrize(prizeOptions[Math.floor(Math.random() * prizeOptions.length)]);
  }

  return (
    <section className="relative flex justify-center bg-gray-50">
      <div className="w-full py-18 md:py-32 max-w-7xl">
        {slice.primary.title && (
          <h2 className="mb-8 text-6xl font-medium text-center text-gray-700">
            {RichText.asText(slice.primary.title)}
          </h2>
        )}

        {slice.primary.description && (
          <p className="max-w-2xl mx-auto mb-8 text-center">
            {RichText.asText(slice.primary.description)}
          </p>
        )}
        <div className="block mx-auto text-center">
          {prize ? (
            <>
              <h3 className="text-4xl font-medium text-gray-700">
                Your Prize is:
              </h3>
              <p className="text-2xl text-gray-800">{prize}!</p>
            </>
          ) : (
            <button
              className="block px-4 py-2 mx-auto text-white bg-gray-700 rounded"
              onClick={pickRandomPrize}
            >
              Get your Prize
            </button>
          )}
        </div>
      </div>
      <Credit
        author="Ryan Mulligan"
        twitter="https://www.twitter.com/hexagoncircle"
        pending
      />
    </section>
  );
};

export default MySlice;
