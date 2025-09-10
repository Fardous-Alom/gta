import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


function App() {
  const [showContent, setShowContent] = useState(false);
  const smoother = useRef(null);
  const contentRef = useRef(null);

  // Initialize ScrollSmoother
  useGSAP(() => {
    if (showContent) {
      smoother.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
      });

      // Add scroll-triggered animation for the Vice City card
      gsap.utils.toArray('.vice-card').forEach((card) => {
        const img = card.querySelector('img');
        
        // Scale up image on scroll
        gsap.to(img, {
          scale: 1.1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              // Parallax effect
              const y = self.scroll() * 100;
              gsap.set(img, { y: -y * 0.5 });
              
              // Tilt effect on hover
              card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
                gsap.to(card, {
                  rotateY: x * 0.5,
                  rotateX: -y * 0.5,
                  duration: 0.5,
                  ease: "power2.out"
                });
              });

              // Reset on mouse leave
              card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                  rotateY: 0,
                  rotateX: 0,
                  duration: 0.5,
                  ease: "power2.out"
                });
              });
            }
          }
        });
      });
    }
    
    return () => {
      if (smoother.current) {
        smoother.current.kill();
      }
    };
  }, [showContent]);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content" ref={contentRef}>
      <section className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </section>

      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./img/sky.png"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./img/bg.png"
                alt=""
              />
              <div className="text text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[12rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[12rem] leading-none ml-20">theft</h1>
                <h1 className="text-[12rem] leading-none -ml-40">auto</h1>
              </div>
              <img
                className="absolute character w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] h-auto -bottom-[150%] md:-bottom-[120%] left-1/2 -translate-x-1/2 scale-[2] md:scale-[1.8] lg:scale-[1.5] xl:scale-[1.2] rotate-[-20deg] transform-gpu"
                src="./img/girlbg.png"
                alt="Character"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                }}
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              {/* <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl sm:mt-5">
                  Scroll Down
                </h3>
              </div> */}
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./img/ps5.png"
                alt=""
              />
            </div>
          </div>
        </div>
      )}

      <section className="w-full min-h-screen flex items-center justify-center bg-black px-12">
        <div className="cntnr flex flex-col-reverse lg:flex-row items-center text-white w-full max-w-7xl">
          {/* Right Content */}
          <div className="rg w-full lg:w-1/2 mt-12 lg:mt-0 space-y-6 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Still Running,
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-yellow-400">
              Not Hunting
            </h1>

            <p className="mt-6 text-lg md:text-xl font-rajdhani font-medium text-gray-100 leading-relaxed tracking-wide">
              {" "}
              Experience the chaos, freedom, and thrill of the most immersive GTA world yet. Bigger, bolder, and crazier — Vice City has never looked this alive. Customize your story, build your empire, and explore a city that never sleeps. Every street corner hides an opportunity — or a trap.
            </p>
            <p className="mt-6 text-lg md:text-xl font-rajdhani font-medium text-gray-100 leading-relaxed tracking-wide">
              {" "}
            </p>
            <p className="mt-6 text-lg md:text-xl font-rajdhani font-medium text-gray-100 leading-relaxed tracking-wide">
              {" "}
              From fast cars to fast money, this is GTA VI — where legends are made, and rules are broken.
            </p>

            <button className="bg-yellow-500 hover:bg-yellow-400 transition-colors px-8 py-4 rounded-2xl text-black mt-8 text-2xl font-bold shadow-xl">
              Download Now
            </button>
          </div>

          {/* Left Image */}
          <div className="limg relative w-full lg:w-1/2 flex justify-center">
            <img
              className="hero-img max-w-full h-auto object-cover"
              src="./img/imag.png"
              alt="GTA VI Hero"
            />
          </div>
        </div>
      </section>

      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-black px-6 py-20">
        {/* Top Branding */}
        <div className="text-center text-white max-w-2xl">
          <h3 className="text-4xl font-bold flex items-center justify-center gap-2">
            <span className="uppercase">Visit Leonida</span>
            <span className="text-yellow-300">☀</span>
          </h3>
          <p className="mt-6 text-lg md:text-xl font-rajdhani font-medium text-gray-100 leading-relaxed tracking-wide">
            {" "}
            Tour a few of the must-see destinations across the sunshine state.
          </p>
        </div>

        {/* Image Card */}
        <div 
          ref={contentRef}
          className="vice-card relative mt-12 w-full max-w-4xl shadow-2xl border-8 border-white overflow-hidden"
          data-speed="0.8"
        >
          <div className="overflow-hidden">
            <img
              className="w-full h-auto object-cover will-change-transform"
              src="./img/gtavi.png"
              alt="Vice City"
              data-speed="1.2"
            />
          </div>

          {/* Overlay Content */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-white text-5xl md:text-6xl font-extrabold italic drop-shadow-lg hidden md:block">
              Vice City
            </h2>
          </div>

          {/* Button */}
          <button className="absolute bottom-6 right-6 bg-white text-black px-6 py-2 rounded-full shadow-md font-semibold hover:bg-gray-100 transition">
            Explore Vice City
          </button>
        </div>
      </section>
        </div>
      </div>
    </>
  );
}

export default App;
