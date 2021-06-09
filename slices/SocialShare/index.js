import React, { useEffect, useCallback } from "react";
import { RichText } from "prismic-reactjs";
import Credit from "../../components/Credit";
import Drawing from "./Drawing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/dist/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/dist/MorphSVGPlugin";

const MySlice = ({ slice }) => {
  let shareButton;
  let shareGraphic;
  let reaperArm,
    reaperHand,
    reaperArm2,
    reaperArm3,
    reaperArm4,
    reaperHand2,
    reaperHand3,
    reaperHand4;
  let skeleton,
    skeletonArm,
    skeletonHand,
    skeletonArm2,
    skeletonArm3,
    skeletonHand2,
    skeletonHand3,
    skeletonArm4,
    skeletonHand4;
  let trunkOuter, trunkInner;
  let starburst;
  let introTl, highFiveTl, highFiveLoopTl;
  let motionReduced;
  // Only load once the SVG has entered the DOM
  const drawingRef = useCallback((drawing) => {
    console.log(drawing);
    // register gsap plugins
    gsap.registerPlugin(MorphSVGPlugin, DrawSVGPlugin, ScrollTrigger);

    motionReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function select(s) {
      return drawing?.querySelector(s);
    }
    function selectAll(s) {
      return drawing?.querySelectorAll(s);
    }

    reaperArm = select("#reaper--arm");
    reaperArm2 = select("#reaper--arm2");
    reaperArm3 = select("#reaper--arm3");
    reaperArm4 = select("#reaper--arm4");
    reaperHand = select("#reaper--hand");
    reaperHand2 = select("#reaper--hand2");
    reaperHand3 = select("#reaper--hand3");
    reaperHand4 = select("#reaper--hand4");
    skeleton = select("#skeleton");
    skeletonArm = select("#skeleton--arm");
    skeletonArm2 = select("#skeleton--arm2");
    skeletonArm3 = select("#skeleton--arm3");
    skeletonArm4 = select("#skeleton--arm4");
    skeletonHand = select("#skeleton--hand");
    skeletonHand2 = select("#skeleton--hand2");
    skeletonHand3 = select("#skeleton--hand3");
    skeletonHand4 = select("#skeleton--hand4");
    trunkOuter = select("#car--trunkOuter");
    trunkInner = select("#car--trunkInner");
    starburst = selectAll("#starburst line");

    // set initial illo props
    gsap.set(skeleton, { y: 170 });
    gsap.set(reaperArm, { morphSVG: reaperArm3 });
    gsap.set(reaperHand, { morphSVG: reaperHand3 });
    gsap.set(skeletonArm, { morphSVG: skeletonArm3 });
    gsap.set(skeletonHand, { morphSVG: skeletonHand3 });
    gsap.set(trunkOuter, { opacity: 1, transformOrigin: "50% 0" });
    gsap.set(trunkInner, {
      opacity: 1,
      transformOrigin: "50% 100%",
      scaleY: 0,
    });
    gsap.set(starburst, { drawSVG: "0 0" });

    // create intro timeline
    introTl = gsap.timeline({
      paused: true,
      delay: 1,
      scrollTrigger: ".share",
    });
    introTl
      // trunk open
      .to(trunkOuter, { scaleY: 0, duration: 0.5, ease: "power1.in" }, "0")
      .to(trunkInner, { scaleY: 1, duration: 0.6, ease: "power2.out" }, ">")

      // skeleton pop up
      .to(skeleton, { y: -10, duration: 0.5, ease: "power2.out" }, ">-.5")
      .to(skeleton, { y: 0, duration: 0.2, ease: "power1.out" }, ">");
    if (motionReduced) {
      introTl.seek(introTl.duration());
    }

    if (!motionReduced) {
      highFiveTl = gsap.timeline({ paused: true, repeat: 0, repeatDelay: 2 });
      highFiveTl
        // reaper arm move up
        .to(
          reaperArm,
          { morphSVG: reaperArm2, duration: 0.6, ease: "power1.inOut" },
          "0"
        )
        .to(
          reaperHand,
          { morphSVG: reaperHand2, duration: 0.6, ease: "power1.inOut" },
          "<"
        )

        // skeleton arm move up
        .to(
          skeletonArm,
          { morphSVG: skeletonArm2, duration: 0.5, ease: "power1.inOut" },
          ".2"
        )
        .to(
          skeletonHand,
          { morphSVG: skeletonHand2, duration: 0.5, ease: "power1.inOut" },
          "<"
        )

        // reaper arm wind up
        .to(
          reaperArm,
          { morphSVG: reaperArm4, duration: 0.2, ease: "power1.out" },
          "1"
        )
        .to(
          reaperHand,
          { morphSVG: reaperHand4, duration: 0.2, ease: "power1.out" },
          "<"
        )

        // skeleton arm wind up
        .to(
          skeletonArm,
          { morphSVG: skeletonArm4, duration: 0.2, ease: "power1.out" },
          "1.05"
        )
        .to(
          skeletonHand,
          { morphSVG: skeletonHand4, duration: 0.2, ease: "power1.out" },
          "<"
        )

        // reaper high five
        .to(
          reaperArm,
          { morphSVG: reaperArm, duration: 0.25, ease: "power3.in" },
          "1.5"
        )
        .to(
          reaperHand,
          { morphSVG: reaperHand, duration: 0.25, ease: "power3.in" },
          "<"
        )

        // skeleton high five
        .to(
          skeletonArm,
          { morphSVG: skeletonArm, duration: 0.25, ease: "power3.in" },
          "1.5"
        )
        .to(
          skeletonHand,
          { morphSVG: skeletonHand, duration: 0.25, ease: "power3.in" },
          "<"
        )

        // starburst
        .to(
          starburst,
          { drawSVG: "0 100%", duration: 0.25, ease: "power1.inOut" },
          "1.65"
        )
        .to(
          starburst,
          { drawSVG: "100% 100%", duration: 0.15, ease: "power1.inOut" },
          ">"
        )
        .set(starburst, { drawSVG: "0 0" }, ">")

        .call(
          () => {
            highFiveLoopTl.play();
          },
          [],
          ">3"
        );
    } else {
      highFiveTl = new gsap.timeline({ paused: true });
      highFiveTl
        // fade arms out
        .to(
          [reaperArm, reaperHand, skeletonArm, skeletonHand],
          { opacity: 0, duration: 1 },
          "0"
        )

        // fade arms in
        .set(reaperArm, { morphSVG: reaperArm }, ">")
        .set(reaperHand, { morphSVG: reaperHand }, ">")
        .set(skeletonArm, { morphSVG: skeletonArm }, ">")
        .set(skeletonHand, { morphSVG: skeletonHand }, ">")
        .set(starburst, { drawSVG: "0% 100%" }, ">")
        .to(
          [reaperArm, reaperHand, skeletonArm, skeletonHand, starburst],
          { opacity: 1, duration: 1 },
          ">"
        );
    }

    highFiveLoopTl = gsap.timeline({
      paused: true,
      repeat: -1,
      repeatDelay: 3,
    });
    highFiveLoopTl
      // reaper arm wind up
      .to(
        reaperArm,
        { morphSVG: reaperArm2, duration: 0.2, ease: "power1.out" },
        "0"
      )
      .to(
        reaperHand,
        { morphSVG: reaperHand2, duration: 0.2, ease: "power1.out" },
        "<"
      )

      // skeleton arm wind up
      .to(
        skeletonArm,
        { morphSVG: skeletonArm2, duration: 0.2, ease: "power1.out" },
        ".05"
      )
      .to(
        skeletonHand,
        { morphSVG: skeletonHand2, duration: 0.2, ease: "power1.out" },
        "<"
      )

      // reaper high five
      .to(
        reaperArm,
        { morphSVG: reaperArm, duration: 0.25, ease: "power3.in" },
        ".5"
      )
      .to(
        reaperHand,
        { morphSVG: reaperHand, duration: 0.25, ease: "power3.in" },
        "<"
      )

      // skeleton high five
      .to(
        skeletonArm,
        { morphSVG: skeletonArm, duration: 0.25, ease: "power3.in" },
        ".5"
      )
      .to(
        skeletonHand,
        { morphSVG: skeletonHand, duration: 0.25, ease: "power3.in" },
        "<"
      )

      // starburst
      .to(
        starburst,
        { drawSVG: "0 100%", duration: 0.25, ease: "power1.inOut" },
        ".65"
      )
      .to(
        starburst,
        { drawSVG: "100% 100%", duration: 0.15, ease: "power1.inOut" },
        ">"
      );
  });

  function shareIt() {
    const shareData = {
      title: "Grim Reaper's Used Cars!",
      text: "Check out these deals to die for!",
      url: "https://grim.componentcarousel.com",
    };

    if (navigator.share) {
      // Our functionality
      console.log("Sharing supported!");
      navigator
        .share(shareData)
        .then((e) => {
          console.log("Share complete!");
          highFiveTl.play();
        })
        .catch((e) => {
          // Might be from user cancelling share
          console.error(e);
        });
    } else {
      // Fall back to other share functionality
      console.log("Sharing Not supported!");
    }
  }
  useEffect(() => {
    // shareIt();
  }, []);

  return (
    <section className="relative py-12 bg-red-800 social-share ">
      <h2 className="text-5xl tracking-wide text-center text-gray-50 drop-shadow-sm font-display">
        {slice.primary.title}
      </h2>
      <div className="max-w-lg mx-auto mt-8 mb-12 text-xl leading-relaxed text-center text-white">
        <RichText render={slice.primary.description} />
      </div>
      <Drawing drawingRef={drawingRef} />
      <div className="flex flex-col items-center justify-center gap-4 py-4 mt-8 button-container">
        <button
          className="block px-8 py-2 text-4xl text-red-600 transition-colors bg-white border-0 rounded font-display focus:outline-none hover:bg-red-50 hover:text-red-800 "
          onClick={shareIt}
        >
          Share!
        </button>
        <button
          onClick={() => {
            highFiveTl.play();
          }}
          className="block px-8 py-2 text-lg transition-colors bg-red-800 border-0 rounded text-gray-50 font-display focus:outline-none hover:bg-red-900 hover:text-white"
        >
          Play High Five
        </button>
      </div>
      <Credit
        author="Darin Senneff"
        twitter="https://www.twitter.com/dsenneff"
        codepen="https://codepen.io/dsenneff/pen/yLMMepw"
      />
    </section>
  );
};

export default MySlice;
