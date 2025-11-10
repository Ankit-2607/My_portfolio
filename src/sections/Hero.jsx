// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { TextPlugin } from "gsap/TextPlugin";
// import { FaLinkedin } from "react-icons/fa";

// gsap.registerPlugin(TextPlugin);

// const Hero = () => {
//   const wordRef = useRef(null);
//   const profileRef = useRef(null);
//   const socialRef = useRef(null);

//   useEffect(() => {
//     // Typing Effect Animation
//     const words = ["Code.", "Create.", "Innovate."];
//     let masterTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

//     words.forEach((word) => {
//       let tl = gsap.timeline({ repeat: 0, repeatDelay: 0.5 });

//       tl.to(wordRef.current, {
//         text: word,
//         duration: word.length * 0.15,
//         ease: "none",
//         onStart: () => {
//           if (wordRef.current) wordRef.current.textContent = "";
//         },
//       })
//         .to({}, { duration: 1.2 })
//         .to(wordRef.current, {
//           text: "",
//           duration: 0.8,
//           ease: "none",
//         });

//       masterTl.add(tl);
//     });

//     // Reveal animation for profile image
//     gsap.fromTo(
//       profileRef.current,
//       { opacity: 0, scale: 0.9, y: 30 },
//       {
//         opacity: 1,
//         scale: 1,
//         y: 0,
//         duration: 1.5,
//         ease: "power2.out",
//         delay: 0.3,
//       }
//     );

//     // Social button animation
//     gsap.fromTo(
//       socialRef.current,
//       { opacity: 0, y: 20 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1.2,
//         ease: "power2.out",
//         delay: 1.2,
//       }
//     );
//   }, []);

//   return (
//     <section
//       id="hero"
//       className="min-h-screen flex items-center justify-between pl-200 pr-10 md:pl-24 sm:pl-12 bg-gray-100 overflow-hidden"
//     >
//       {/* ✨ Animated Grid Background */}
//       <div className="absolute inset-0 -z-10 grid grid-cols-20 grid-rows-11 opacity-50">
//         {[...Array(220)].map((_, i) => (
//           <div
//             key={i}
//             className="border border-gray-300 hover:bg-gradient-to-br hover:from-orange-400 hover:to-purple-400 hover:opacity-80 transition-all duration-500"
//           ></div>
//         ))}
//       </div>

//       {/* Subtle overlay glow for depth */}
//       <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-orange-100/40 pointer-events-none"></div>

//       {/* Left Content */}
//       <div className="w-[55%] relative z-10">
//         <p className="flex items-center gap-2 bg-gray-300 w-fit px-3 py-1 rounded-lg text-gray-700 font-medium">
//           <span className="relative flex h-3 w-3">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//           </span>
//           Available for work.
//         </p>

//         <p className="mt-10 text-2xl text-gray-800">
//           👋 Hi there, I'm{" "}
//           <span className="text-purple-500 font-semibold">Ankit Kumar</span>.
//         </p>

//         {/* Typing Effect */}
//         <h3 className="mt-5 text-4xl md:text-5xl font-semibold text-gray-900">
//           Full Stack Developer |{" "}
//           <span
//             ref={wordRef}
//             className="inline-block text-purple-600 border-r-2 border-purple-600 pr-1"
//           ></span>
//         </h3>

//         <p className="mt-5 text-lg text-gray-800 leading-relaxed">
//           From crafting responsive interfaces to building robust backends —{" "}
//           <br />I bring ideas to life with clean, scalable code.
//         </p>

//         {/* Contact + LinkedIn */}
//         <div className="mt-8 flex items-center gap-5" ref={socialRef}>
//           <a
//             href="#contact"
//             className="relative inline-block px-8 py-3 text-lg font-semibold text-white bg-purple-500 rounded-full overflow-hidden transition-all duration-500 hover:bg-purple-600 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] group"
//           >
//             <span className="relative z-10">Contact Me</span>
//             <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
//           </a>

//           <a
//             href="https://www.linkedin.com/in/ankit-kumar-80473a383/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-12 h-12 flex items-center justify-center bg-amber-500 rounded-full text-white text-2xl shadow-lg transition-all duration-500 hover:scale-110 hover:bg-amber-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
//           >
//             <FaLinkedin />
//           </a>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div
//         className="w-[45%] flex justify-center items-center relative"
//         ref={profileRef}
//       >
//         <div className="absolute w-[380px] h-[460px] bg-gradient-to-tr from-purple-400 via-purple-500 to-yellow-400 rounded-[60%_40%_70%_30%_/_30%_60%_40%_70%] blur-3xl opacity-80 shadow-[0_0_60px_rgba(255,255,255,0.2)]"></div>

//         <div className="relative z-10 group">
//           <img
//             src="profile.png"
//             alt="Profile"
//             className="rounded-[60%_40%_70%_30%_/_30%_60%_40%_70%] w-[420px] h-[480px] object-cover shadow-[0_25px_50px_rgba(0,0,0,0.4)] transform scale-125 group-hover:scale-130 transition-all duration-500"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { FaLinkedin,   FaGithub, } from "react-icons/fa";

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const wordRef = useRef(null);
  const profileRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    // Typing Effect Animation
    const words = ["Code.", "Create.", "Innovate."];
    let masterTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    words.forEach((word) => {
      let tl = gsap.timeline({ repeat: 0, repeatDelay: 0.5 });

      tl.to(wordRef.current, {
        text: word,
        duration: word.length * 0.15,
        ease: "none",
        onStart: () => {
          if (wordRef.current) wordRef.current.textContent = "";
        },
      })
        .to({}, { duration: 1.2 })
        .to(wordRef.current, {
          text: "",
          duration: 0.8,
          ease: "none",
        });

      masterTl.add(tl);
    });

    // Reveal animation for profile image
    gsap.fromTo(
      profileRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.3,
      }
    );

    // Social button animation
    gsap.fromTo(
      socialRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 1.2,
      }
    );
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 md:px-20 lg:px-32 bg-gray-100  overflow-hidden relative"
    >
      {/* ✨ Animated Grid Background */}
      <div className="absolute inset-0 -z-10 grid grid-cols-21 grid-rows-14 opacity-50">
        {[...Array(294)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-300 hover:bg-gradient-to-br hover:from-orange-400 hover:to-purple-400 hover:opacity-80 transition-all duration-500"
          ></div>
        ))}
      </div>

      {/* Subtle overlay glow for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-orange-100/40 pointer-events-none"></div>

      {/* Left Content */}
      <div className="relative z-10 w-full lg:w-1/2 text-center lg:text-left ml-35">
        <p className="flex items-center justify-center lg:justify-start gap-2 bg-gray-300 w-fit mx-auto lg:mx-0 px-3 py-1 rounded-lg text-gray-700 font-medium">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Available for work.
        </p>

        <p className="mt-10 text-2xl text-gray-800">
          👋 Hi there, I'm{" "}
          <span className="text-purple-500 font-semibold">Ankit Kumar</span>.
        </p>

        {/* Typing Effect */}
        <h3 className="mt-5 text-4xl md:text-5xl font-semibold text-gray-900">
          Full Stack Developer |{" "}
          <span
            ref={wordRef}
            className="inline-block text-purple-600 border-r-2 border-purple-600 pr-1"
          ></span>
        </h3>

        <p className="mt-5 text-lg text-gray-800 leading-relaxed">
          From crafting responsive interfaces to building robust backends —{" "}
          <br />I bring ideas to life with clean, scalable code.
        </p>

        {/* Contact + LinkedIn */}
        <div
          className="mt-8 flex justify-center lg:justify-start items-center gap-5"
          ref={socialRef}
        >
          <a
            href="#contact"
            className="relative inline-block px-8 py-3 text-lg font-semibold text-white bg-purple-500 rounded-full overflow-hidden transition-all duration-500 hover:bg-purple-600 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] group"
          >
            <span className="relative z-10">Contact Me</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </a>

          <a
            href="https://www.linkedin.com/in/ankit-kumar-80473a383/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-amber-500 rounded-full text-white text-2xl shadow-lg transition-all duration-500 hover:scale-110 hover:bg-amber-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Ankit-2607"
            target="_blank"
            rel="noopener noreferrer"
            className=" bg-amber-500 hover:bg-amber-600 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
          >
            <FaGithub className="text-white text-2xl" />
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div
        className="relative w-full lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0 mr-10"
        ref={profileRef}
      >
        <div className="absolute w-[300px] sm:w-[340px] md:w-[380px] h-[420px] sm:h-[460px] bg-gradient-to-tr from-purple-400 via-purple-500 to-yellow-400 rounded-[60%_40%_70%_30%_/_30%_60%_40%_70%] blur-3xl opacity-80 shadow-[0_0_60px_rgba(255,255,255,0.2)]"></div>

        <div className="relative z-10 group">
          <img
            src="profile.png"
            alt="Profile"
            className="rounded-[60%_40%_70%_30%_/_30%_60%_40%_70%] w-[340px] sm:w-[380px] md:w-[420px] h-[420px] sm:h-[460px] md:h-[480px] object-cover shadow-[0_25px_50px_rgba(0,0,0,0.4)] transform scale-120 group-hover:scale-125 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
