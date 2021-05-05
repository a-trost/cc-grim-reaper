import React, { useState, useEffect, useRef } from "react";
import { RichText } from "prismic-reactjs";

const MySlice = ({ slice }) => {
  const [searchText, setSearchText] = useState(null);
  const [images, setImages] = useState([]);
  let SpeechRecognition = useRef();
  let recognition = useRef(null);

  useEffect(() => {
    // if (!window) return null;

    SpeechRecognition.current =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    recognition.current = new SpeechRecognition.current();
    recognition.current.continuous = true;
    recognition.current.lang = "en-US";

    recognition.current.onresult = (e) => {
      setSearchText(e.results[e.results.length - 1][0].transcript);

      handleSubmit(null, e.results[e.results.length - 1][0].transcript);
    };
  }, []);

  const handleRecord = () => {
    // Not working for Firefox, maybe for Safari
    recognition.current.start();
  };

  const handleSubmit = (e, search) => {
    if (e) e.preventDefault();

    console.log(searchText);
    fetch(`/api/unsplash/${searchText || search}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImages(data);
      });
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="mb-20 text-5xl font-medium text-center text-red-900 font-display title-font sm:text-6xl">
          {slice.primary.title}
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <input
            className="block w-full border"
            type="text"
            id="search"
            value={searchText}
          />
          <button type="button" className="block border" onClick={handleRecord}>
            Record
          </button>
          <button className="block border">Submit</button>
        </form>
        <ul className="grid grid-cols-3 gap-4">
          {images.map((image) => {
            return (
              <li className="h-full ">
                <img
                  class="object-cover w-full h-full"
                  src={image.urls.small}
                  alt={image.alt_description}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default MySlice;
