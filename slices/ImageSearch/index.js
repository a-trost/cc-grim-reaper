import React, { useState, useEffect, useRef } from "react";
import Credit from "../../components/Credit";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

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
    try {
      const res = await fetch(`/api/unsplash/${searchText || search}`);
      const json = await res.json();

      setImages(json);
    } catch (error) {
      console.log(error);
    }
  };

  const onSpeechRecognitionResult = (e) => {
    stopRecording();
    setSearchText(e.results[e.results.length - 1][0].transcript);
    fetchUnsplashImages(null, e.results[e.results.length - 1][0].transcript);
  };
  const recognition = useRef(
    createSpeechRecognition(onSpeechRecognitionResult)
  );

  return (
    <section className="relative text-gray-600 body-font bg-gray-50">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="mb-16 text-5xl font-medium text-center text-red-900 font-display title-font sm:text-6xl">
          {slice.primary.title}
        </h2>
        <form
          action=""
          className="flex flex-col items-center mb-10"
          onSubmit={fetchUnsplashImages}
        >
          <button
            type="button"
            className="flex items-center px-4 py-2 mb-4 text-red-900 bg-gray-100 border rounded-lg"
            onClick={toggleRecording}
          >
            {isRecording ? (
              <>
                <FaMicrophoneSlash className="mr-2" /> Stop
              </>
            ) : (
              <>
                <FaMicrophone className="mr-2" /> Start
              </>
            )}{" "}
            Recording
          </button>
          <input
            className="block w-full max-w-xl px-4 py-2 mx-auto mb-4 font-bold text-center border rounded-lg font-lg font-body"
            type="text"
            id="search"
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
          />

          <button className="flex items-center px-4 py-2 text-red-900 bg-gray-100 border rounded-lg">
            Search
          </button>
        </form>
        <ul className="grid grid-cols-3 gap-4">
          {images.map((image) => {
            return (
              <li className="h-full " key={image.id}>
                <img
                  className="object-cover w-full h-full"
                  src={image.urls.small}
                  alt={image.alt_description}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <Credit
        author="Louis Hoebregts"
        twitter="https://twitter.com/Mamboleoo"
      />
    </section>
  );
};

export default MySlice;
