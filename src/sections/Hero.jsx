
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { FaLinkedin,   FaGithub, } from "react-icons/fa";
import RightSection from "./RightSection";

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const wordRef = useRef(null);
  const socialRef = useRef(null);
  const cardRef = useRef(null);
  const lanyardRef = useRef(null);
  const shadowRef = useRef(null);

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
      cardRef.current,
      {
        opacity: 0,
        y: -80,
        rotation: -10,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.4,
        ease: "bounce.out",
        delay: 0.3,
      },
    )

      gsap.to(cardRef.current,{
y:10,
repeat:-1,
yoyo:true,
duration:2.2,
ease:"sine.inOut"
});

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

    const card = cardRef.current;
const lanyard = lanyardRef.current;
const shadow = shadowRef.current;

if (!card || !lanyard || !shadow) return;

let rotateX = 0;
let rotateY = 0;

const moveCard = (e)=>{

const rect = card.getBoundingClientRect();

const cx = rect.left + rect.width/2;
const cy = rect.top + rect.height/2;

const dx = e.clientX-cx;
const dy = e.clientY-cy;

rotateY = gsap.utils.clamp(-18,18,dx/18);

rotateX = gsap.utils.clamp(-10,10,-dy/35);

gsap.to(card,{
rotation:rotateY,
rotateX:rotateX,
rotateY:rotateY/3,
duration:0.6,
ease:"power3.out",
transformPerspective:1200,
transformOrigin:"top center"
});

gsap.to(lanyard,{
rotation:rotateY*0.35,
duration:0.6,
ease:"power3.out"
});

gsap.to(shadow,{
x:rotateY*1.6,
scaleX:1-Math.abs(rotateY)/90,
opacity:0.25+Math.abs(rotateY)/40,
duration:0.6
});

};

const reset=()=>{

gsap.to(card,{
rotation:0,
rotateX:0,
rotateY:0,
duration:1.4,
ease:"elastic.out(1,0.35)"
});

gsap.to(lanyard,{
rotation:0,
duration:1.4,
ease:"elastic.out(1,0.35)"
});

gsap.to(shadow,{
x:0,
scaleX:1,
opacity:.25,
duration:1.4,
ease:"power3.out"
});

};

window.addEventListener("mousemove",moveCard);

window.addEventListener("mouseleave",reset);

return ()=>{

window.removeEventListener("mousemove",moveCard);

window.removeEventListener("mouseleave",reset);

};
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
            className="border border-gray-300 hover:bg-linear-to-br hover:from-orange-400 hover:to-purple-400 hover:opacity-80 transition-all duration-500"
          ></div>
        ))}
      </div>
      {/* Subtle overlay glow for depth */}
      <div className="absolute inset-0 bg-linear-to-tr from-white/60 via-transparent to-orange-100/40 pointer-events-none"></div>
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
            <span className="absolute inset-0 bg-linear-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
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

      <RightSection />
    </section>
  );
};

export default Hero;
