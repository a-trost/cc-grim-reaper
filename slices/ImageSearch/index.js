import React, { useState, useEffect, useRef } from "react";

const createSpeechRecognition = (onResult) => {
  if (typeof window === "undefined") {
    return null;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const sr = new SpeechRecognition();
  sr.continuous = true;
  sr.lang = "en-US";
  if (onResult) sr.onresult = onResult;

  return sr;
};

const MySlice = ({ slice }) => {
  const [searchText, setSearchText] = useState(null);
  const [images, setImages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const startRecording = () => {
    if (recognition.current && !isRecording) {
      // Not working for Firefox, maybe for Safari
      recognition.current.start();
      setIsRecording(true);
    }
  };
  const stopRecording = () => {
    if (recognition.current && isRecording) {
      // Not working for Firefox, maybe for Safari
      recognition.current.stop();
      setIsRecording(false);
    }
  };
  const toggleRecording = isRecording ? stopRecording : startRecording;

  const fetchUnsplashImages = async (e, search) => {
    if (e) e.preventDefault();

    const res = await fetch(`/api/unsplash/${searchText || search}`);
    const json = await res.json();

    setImages(json);
  };

  const onSpeechRecognitionResult = (e) => {
    setSearchText(e.results[e.results.length - 1][0].transcript);
    fetchUnsplashImages(null, e.results[e.results.length - 1][0].transcript);
  };
  const recognition = useRef(
    createSpeechRecognition(onSpeechRecognitionResult)
  );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="mb-20 text-5xl font-medium text-center text-red-900 font-display title-font sm:text-6xl">
          {slice.primary.title}
        </h2>
        <form action="" onSubmit={fetchUnsplashImages}>
          <input
            className="block w-full border"
            type="text"
            id="search"
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
          />
          <button
            type="button"
            className="block border"
            onClick={toggleRecording}
          >
            {isRecording ? "Stop" : "Start"} Recording
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
