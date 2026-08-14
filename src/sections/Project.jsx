import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "ResolveDesk",
    description:
      "A front-end exercise built using React, Tailwind CSS to improve the front-end skills while learning  frotend.",
    image: "/project11.png",
    link: "https://github.com/Ankit-2607/ResolveDesk",
  },
  {
    title: "BiblioX - E-library Application",
    description:
      "A full-stack e-commerce web app with user authentication, product filters, and cart functionality using React, Node.js, and MongoDB.",
    image: "/Bilbox.png",
    link: "https://github.com/Ankit-2607/E-library-application",
  },
];

const ProjectSection = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
  // ensure ref array is clean
  cardsRef.current = cardsRef.current.slice(0, projects.length);

  const tls = []; // keep timelines so we can kill them in cleanup

  cardsRef.current.forEach((card, index) => {
    if (!card) return;

    // initial state (hidden / scaled down / blurred / below)
    const initState = {
      opacity: 0,
      scale: 0,
      y: 200,
      rotate: -20,
      filter: "blur(10px)",
    };
    gsap.set(card, initState);

    // build a paused timeline that plays the "open-from-icon" animation
    const tl = gsap.timeline({ paused: true });
    tl.to(card, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
    });

    tls.push(tl);

    // ScrollTrigger: play when entering from top; reset when leaving back (scroll up)
    ScrollTrigger.create({
      trigger: card,
      start: "top 75%",
      onEnter: () => {
        // play from start every time you enter from top
        tl.play(0);
      },
      onLeaveBack: () => {
        // reset to initial state so next downward scroll will replay
        tl.pause(0);
        gsap.set(card, initState);
      },
      // don't auto-kill: we want it available again if user scrolls away/back
    });
  });

  // cleanup
  return () => {
    tls.forEach((t) => t.kill());
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);


  return (
    <section
      id="projects"
      className="min-h-screen bg-linear-to-b from-gray-50 to-white py-20 px-6 flex flex-col items-center overflow-hidden"
    >
      {/* Section Header */}
      <h2 className="text-5xl font-bold text-gray-900 mb-12 text-center drop-shadow-sm">
        Featured Projects
      </h2>

      {/* Project Cards */}
      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl w-full">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            {/* Browser Tab Header */}
            <div className="flex items-center px-4 py-2 bg-gray-200 rounded-t-2xl border-b border-gray-200">
              <div className="flex space-x-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
            </div>

            {/* Project Content */}
            <div className="px-4 pb-4 pt-3 flex flex-col gap-5">
              <div className="rounded-2xl overflow-hidden border border-gray-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900">
                {project.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {project.description}
              </p>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start mt-2 px-5 py-2 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-700 transition-all duration-300"
              >
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
