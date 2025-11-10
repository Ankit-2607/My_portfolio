import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const About = () => {
  const bandRef = useRef(null);
  const bandInnerRef = useRef(null);
  const paragraphsRef = useRef([]);
  const infoBoxesRef = useRef([]);
  const bandTween = useRef(null);

  useEffect(() => {
    // Animate paragraphs (left side)
    paragraphsRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    // Animate info box content (heading then paragraph)
    infoBoxesRef.current.forEach((box) => {
      const heading = box.querySelector("h3");
      const text = box.querySelector("p");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: box,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        heading,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        text,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4" // slight overlap so text comes right after heading
      );
    });

    // Infinite scrolling skill band

  const inner = bandInnerRef.current;
  const totalWidth = inner.scrollWidth / 2;

  gsap.to(inner, {
    x: -totalWidth,
    duration: 20,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: (x) => `${parseFloat(x) % -totalWidth}px`,
    },
  });
}, []);


  return (
    <section
      id="about"
      className="min-h-screen bg-gray-100 flex flex-col items-center pt-30 pb-0 py-20 my-0"
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <p
          className="text-5xl font-bold text-gray-900 mb-12 text-center"
        >
          About Me
        </p>
      </div>

      {/* About Content */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left - Description */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all duration-500">
          <p
            ref={(el) => (paragraphsRef.current[0] = el)}
            className="text-gray-700 text-lg leading-relaxed"
          >
            Hi, I’m{" "}
            <span className="font-semibold text-purple-600">Ankit Kumar</span>,
            a passionate{" "}
            <span className="text-amber-600 font-medium">
              Full Stack Developer
            </span>{" "}
            and an MCA first-year student. With a background in Bachelor of
            Arts, I’ve transitioned into technology to blend creativity with
            logic.
          </p>

          <p
            ref={(el) => (paragraphsRef.current[1] = el)}
            className="mt-4 text-gray-700 text-lg leading-relaxed"
          >
            I specialize in building responsive and user-friendly web
            applications using{" "}
            <span className="text-purple-600 font-semibold">
              HTML, CSS, JavaScript, React, Node.js,
            </span>{" "}
            and <span className="text-purple-600 font-medium">Python</span>.
            Apart from coding, I love{" "}
            <span className="text-amber-600 font-medium">sketching</span>,
            playing <span className="text-amber-600 font-medium">cricket</span>,
            and <span className="text-amber-600 font-medium">online games</span>
            .
          </p>

          <p
            ref={(el) => (paragraphsRef.current[2] = el)}
            className="mt-4 text-gray-700 text-lg leading-relaxed"
          >
            I strongly believe in{" "}
            <span className="text-purple-600 font-medium">teamwork</span> and
            enjoy collaborating with others to create innovative solutions. I’m
            always learning new tools and technologies to grow as a developer
            and craft meaningful web experiences.
          </p>
        </div>

        {/* Right - Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: "Null",
              subtitle: "Years of Experience",
              gradient: "from-purple-500 to-amber-500",
            },
            {
              title: "1",
              subtitle: "Completed Projects",
              gradient: "from-amber-500 to-purple-500",
            },
            {
              title: "Soft Skills",
              subtitle: "Creative, Teamwork, Patient, Adaptability",
              bg: "bg-white text-gray-900",
            },
            {
              title: "Hobbies",
              subtitle: "Sketching, Cricket, Online Games",
              bg: "bg-white text-gray-900",
            },
          ].map((box, i) => (
            <div
              key={i}
              ref={(el) => (infoBoxesRef.current[i] = el)}
              className={`${
                box.gradient
                  ? `bg-gradient-to-r ${box.gradient} text-white`
                  : box.bg
              } rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg transition-all duration-500`}
            >
              <h3 className="text-3xl font-bold">{box.title}</h3>
              <p className="text-lg mt-2 font-medium text-center">
                {box.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Skills Heading */}
      <div className="flex items-center justify-center mt-24 mb-6 w-full">
        {/* Left line and dot */}
        <div className="flex items-center flex-1 justify-end">
          <span className="h-[2px] w-full max-w-full bg-gradient-to-l from-black to-transparent"></span>
          <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
        </div>

        {/* Heading */}
        <h2 className="mx-6 text-3xl font-semibold text-black tracking-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] whitespace-nowrap">
          Technical Skills
        </h2>

        {/* Right line and dot */}
        <div className="flex items-center flex-1 justify-start">
          <span className="w-2 h-2 bg-black rounded-full ml-2"></span>
          <span className="h-[2px] w-full max-w-full bg-gradient-to-r from-black to-transparent"></span>
        </div>
      </div>

      {/* Infinite Scrolling Skills Band */}
      {/* Infinite Scrolling Skills Band */}
      <div
        ref={bandRef}
        className="relative overflow-hidden w-full mt-6 mb-10 py-6 bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-[0px_20px_rgba(0,0,0,0.1.5)]"
      >
        {/* Fading edges */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-100 via-white/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-100 via-white/80 to-transparent z-20 pointer-events-none"></div>

        {/* Band content */}
        <div
          ref={bandInnerRef}
          className="relative flex gap-16 text-2xl font-semibold text-gray-800 whitespace-nowrap z-10 cursor-pointer"
        >
          {[
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Express",
            "Python",
            "Git",
            "Tailwind CSS",
            "MySQL",
            "GSAP",
            "REST API",
            "C++",
            "Figma",
          ]
            .concat([
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Node.js",
              "Express",
              "Python",
              "Git",
              "Tailwind CSS",
              "MySQL",
              "GSAP",
              "REST API",
              "C++",
              "Figma",
            ])
            .map((skill, index) => (
              <span
                key={index}
                className="transition-transform duration-300 hover:scale-110"
              >
                {skill}
              </span>
            ))}
        </div>
      </div>
    </section>
  );
};

export default About;
