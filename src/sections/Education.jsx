// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Timeline } from "gsap/gsap-core";

// gsap.registerPlugin(ScrollTrigger);

// const timeline = [
//   {
//     title: "Masters in Computer Application (M.C.A.)",
//     description: "Lovely Professional University\n📍 Panjab\n2025 -present",
//     image: "/project11.png",
//   },
//   {
//     title: "Graduation in Bachelor of Art (B.A.)",
//     description:
//       "Munger University\n📍Munger, Bihar\n Year: 2020 - 2023",
//     image: "/project2.png",
//   },
//   {
//     title: "Higher Secondary Education(10+2)",
//     description:
//       "S.B. Public School\n📍 Tarapur, Bihar\n Year: 2018 - 2020",
//     image: "/project3.png",
//   },
// ];

// const Education = () => {
//   const containerRef = useRef([]);
//   const titleRef = useRef(null);

//   useEffect(() => {
//     // Animate heading
//     gsap.fromTo(
//       titleRef.current,
//       { opacity: 0, y: 60 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1.2,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: titleRef.current,
//           start: "top 90%",
//         },
//       }
//     );

//     // Animate each project card
//     containerRef.current.forEach((el) => {
//       gsap.fromTo(
//         el,
//         { opacity: 0, y: 120 },
//         {
//           opacity: 1,
//           y: 0,
//           scrollTrigger: {
//             trigger: el,
//             start: "top 80%",
//             end: "top 40%",
//             scrub: 1,
//           },
//           duration: 1,
//           ease: "power3.out",
//         }
//       );
//     });
//   }, []);

//   return (
//     <section
//       id="education"
//       className="relative w-full min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] pt-32 pb-60 text-white overflow-hidden"
//     >
//       {/* Background fade at top & bottom */}
//       <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none"></div>
//       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

//       {/* Section heading */}
//       <div className="text-center mb-28 z-10 relative">
//         <h1
//           ref={titleRef}
//           className="text-5xl md:text-6xl font-bold tracking-tight bg-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]"
//         >
//           Education
//         </h1>
//         <p className="text-gray-300 mt-4 text-lg">
//           A showcase of my latest web creations
//         </p>
//       </div>

//       {/* Center fading line */}
//       <div className="absolute left-1/2 top-[220px] h-[calc(100%-250px)] w-[3px] bg-gradient-to-b from-transparent via-purple-500 to-transparent transform -translate-x-1/2"></div>

//       {/* Project timeline */}
//       <div className="max-w-6xl mx-auto flex flex-col gap-40 px-4">
//         {timeline.map((project, index) => (
//           <div
//             key={index}
//             ref={(el) => (containerRef.current[index] = el)}
//             className={`relative flex flex-col md:flex-row items-center gap-10 ${
//               index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//             }`}
//           >
//             {/* Project Image with hover animation */}
//             <div className="w-full md:w-1/2 flex justify-center">
//               <div className="relative group w-[90%] md:w-[80%] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 transition-all duration-500 hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]">
//                 <img
//                   src={timeline.image}
//                   alt={timeline.title}
//                   className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
//                 />
//                 {/* Overlay effect */}
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
//               </div>
//             </div>

//             {/* Project Text + Button */}
//             <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-5 text-center md:text-left">
//               <h2 className="text-3xl md:text-4xl font-bold text-amber-500 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">
//                 {timeline.title}
//               </h2>
//               <p className="text-gray-300 leading-relaxed text-lg">
//                 {timeline.description}
//               </p>
//             </div>

//             {/* Connector Dot */}
//             <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-amber-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)]"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Education;





// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const timeline = [
//   {
//     title: "Masters in Computer Application (M.C.A.)",
//     description: "Lovely Professional University\n📍 Punjab\n2025 - Present",
//     image: "/project11.png",
//   },
//   {
//     title: "Graduation in Bachelor of Art (B.A.)",
//     description: "Munger University\n📍 Munger, Bihar\n2020 - 2023",
//     image: "/project2.png",
//   },
//   {
//     title: "Higher Secondary Education (10+2)",
//     description: "S.B. Public School\n📍 Tarapur, Bihar\n2018 - 2020",
//     image: "/project3.png",
//   },
//   {
//     title: "Secondary Education (10th)",
//     description: "S.B. Public School\n📍 Tarapur, Bihar\n2016 - 2018",
//     image: "/project4.png",
//   },
// ];

// const Education = () => {
//   const containerRef = useRef([]);
//   const titleRef = useRef(null);

//   useEffect(() => {
//     // Animate heading
//     gsap.fromTo(
//       titleRef.current,
//       { opacity: 0, y: 60 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1.2,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: titleRef.current,
//           start: "top 90%",
//         },
//       }
//     );

//     // Animate each education card
//     containerRef.current.forEach((el) => {
//       gsap.fromTo(
//         el,
//         { opacity: 0, y: 120 },
//         {
//           opacity: 1,
//           y: 0,
//           scrollTrigger: {
//             trigger: el,
//             start: "top 85%",
//             end: "top 40%",
//             scrub: 1,
//           },
//           duration: 1.2,
//           ease: "power3.out",
//         }
//       );
//     });
//   }, []);

//   return (
//     <section
//       id="education"
//       className="relative w-full min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] pt-32 pb-60 text-white overflow-hidden"
//     >
//       {/* Background fade effects */}
//       <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none"></div>
//       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

//       {/* Section heading */}
//       <div className="text-center mb-28 z-10 relative">
//         <h1
//           ref={titleRef}
//           className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]"
//         >
//           Education
//         </h1>
//         <p className="text-gray-300 mt-4 text-lg">
//           A glimpse of my academic background and learning journey
//         </p>
//       </div>

//       {/* Center vertical line */}
//       <div className="absolute left-1/2 top-[220px] h-[calc(100%-250px)] w-[3px] bg-gradient-to-b from-transparent via-purple-500 to-transparent transform -translate-x-1/2"></div>

//       {/* Education timeline */}
//       <div className="max-w-6xl mx-auto flex flex-col gap-40 px-4">
//         {timeline.map((item, index) => (
//           <div
//             key={index}
//             ref={(el) => (containerRef.current[index] = el)}
//             className={`relative flex flex-col md:flex-row items-center gap-10 ${
//               index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//             }`}
//           >
//             {/* Image with animation
//             <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-10">
//               <div className="relative group w-[90%] md:w-[80%] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 transition-all duration-500 hover:shadow-[0_0_35px_rgba(251,191,36,0.7)]">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
//               </div>
//             </div> */}

//             {/* Info box with background */}
//             <div
//               className={`w-full md:w-1/2 flex flex-col items-start justify-center gap-5 text-center md:text-left md:pl-10 ${
//                 index % 2 === 0 ? "md:pl-14" : "md:pr-14"
//               }`}
//             >
//               <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg hover:bg-black/40 transition-all duration-500">
//                 <h2 className="text-3xl md:text-4xl font-bold text-amber-500 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">
//                   {item.title}
//                 </h2>
//                 <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
//                   {item.description}
//                 </p>
//               </div>
//             </div>

//             {/* Connector Dot */}
//             <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-amber-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] animate-pulse"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Education;









import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, GraduationCap, School, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    title: "Masters in Computer Application (M.C.A.)",
    description: "Lovely Professional University\n📍 Punjab\n2025 - Present",
    icon: <GraduationCap className="w-10 h-10 text-black" />,
  },
  {
    title: "Graduation in Bachelor of Arts (B.A.)",
    description: "Munger University\n📍 Munger, Bihar\n2020 - 2023",
    icon: <BookOpen className="w-10 h-10 text-black" />,
  },
  {
    title: "Higher Secondary Education (10+2)",
    description: "S.B. Public School\n📍 Tarapur, Bihar\n2018 - 2020",
    icon: <School className="w-10 h-10 text-black" />,
  },
  {
    title: "Secondary Education (10th)",
    description: "New Era public school\n📍 Munger, Bihar\n2016 - 2018",
    icon: <Award className="w-10 h-10 text-black" />,
  },
];

const Education = () => {
  const containerRef = useRef([]);
  const titleRef = useRef(null);

 useEffect(() => {
  // Heading Animation
  gsap.set(titleRef.current, { opacity: 0, y: 60 });

  ScrollTrigger.create({
    trigger: titleRef.current,
    start: "top 75%",
    end: "bottom 20%",
    onEnter: () =>
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power1.out",
      }),
    onLeaveBack: () =>
      gsap.to(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power1.inOut",
      }),
  });

  // Cards Animation
  containerRef.current.forEach((el) => {
    gsap.set(el, { opacity: 0, y: 100 }); // initial state

    ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      end: "bottom 20%",
      onEnter: () =>
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power1.out",
        }),
      onLeaveBack: () =>
        gsap.to(el, {
          opacity: 0,
          y: 100,
          duration: 1,
          ease: "power1.inOut",
        }),
    });
  });

  // Refresh triggers in case layout shifts
  ScrollTrigger.refresh();
}, []);


  return (
    <section
      id="education"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] pt-32 pb-60 text-white overflow-hidden"
    >
      {/* Background fades */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

      {/* Section Title */}
      <div className="text-center mb-28 relative z-10">
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold tracking-tight bg-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]"
        >
          Education
        </h1>
        <p className="text-gray-300 mt-4 text-lg">
          My Academic Journey & Achievements
        </p>
      </div>

      {/* Timeline Center Line */}
      <div className="absolute left-1/2 top-[220px] h-[calc(100%-250px)] w-[3px] bg-gradient-to-b from-transparent via-purple-500 to-transparent transform -translate-x-1/2"></div>

      {/* Timeline Items */}
      <div className="max-w-6xl mx-auto flex flex-col gap-32 px-6">
        {timeline.map((item, index) => (
          <div
            key={index}
            ref={(el) => (containerRef.current[index] = el)}
            className={`relative flex flex-col md:flex-row items-center gap-12 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Certificate Card */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-500 w-[90%] md:w-[80%]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-amber-500 p-4 rounded-full shadow-lg">
                    {item.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    {item.title}
                  </h2>
                </div>
                <p className="text-black font-semibold whitespace-pre-line leading-relaxed ml-22">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Spacer + Timeline Dot */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-amber-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;








// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Award, GraduationCap, School, BookOpen } from "lucide-react";

// gsap.registerPlugin(ScrollTrigger);

// const timeline = [
//   {
//     title: "Masters in Computer Application (M.C.A.)",
//     description: "Lovely Professional University\n📍 Punjab\n2025 - Present",
//     icon: <GraduationCap className="w-10 h-10 text-black" />,
//   },
//   {
//     title: "Graduation in Bachelor of Arts (B.A.)",
//     description: "Munger University\n📍 Munger, Bihar\n2020 - 2023",
//     icon: <BookOpen className="w-10 h-10 text-black" />,
//   },
//   {
//     title: "Higher Secondary Education (10+2)",
//     description: "S.B. Public School\n📍 Tarapur, Bihar\n2018 - 2020",
//     icon: <School className="w-10 h-10 text-black" />,
//   },
//   {
//     title: "Secondary Education (10th)",
//     description: "S.B. Public School\n📍 Tarapur, Bihar\n2016 - 2018",
//     icon: <Award className="w-10 h-10 text-black" />,
//   },
// ];

// const Education = () => {
//   const containerRef = useRef([]);
//   const titleRef = useRef(null);

//   useEffect(() => {
//     // Heading animation
//     gsap.set(titleRef.current, { opacity: 0, y: 60 });
//     ScrollTrigger.create({
//       trigger: titleRef.current,
//       start: "top 75%",
//       onEnter: () =>
//         gsap.to(titleRef.current, {
//           opacity: 1,
//           y: 0,
//           duration: 1.2,
//           ease: "power3.out",
//         }),
//     });

//     // 🎬 Unique “unfolding paper” animation
//     containerRef.current.forEach((el, i) => {
//       gsap.set(el, {
//         opacity: 0,
//         rotateX: i % 2 === 0 ? -90 : 90, // alternate direction
//         scaleY: 0.5,
//         transformOrigin: "top center",
//       });

//       ScrollTrigger.create({
//         trigger: el,
//         start: "top 80%",
//         end: "bottom 40%",
//         onEnter: () =>
//           gsap.to(el, {
//             opacity: 1,
//             rotateX: 0,
//             scaleY: 1,
//             duration: 1.5,
//             ease: "elastic.out(1, 0.6)", // bouncy unfold
//             transformOrigin: "center center",
//           }),
//         onLeaveBack: () =>
//           gsap.to(el, {
//             opacity: 0,
//             rotateX: i % 2 === 0 ? -90 : 90,
//             scaleY: 0.5,
//             duration: 0.8,
//             ease: "power2.inOut",
//           }),
//       });
//     });

//     ScrollTrigger.refresh();
//   }, []);

//   return (
//     <section
//       id="education"
//       className="relative w-full min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] pt-32 pb-60 text-white overflow-hidden"
//     >
//       {/* Background fades */}
//       <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none"></div>
//       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

//       {/* Section Title */}
//       <div className="text-center mb-28 relative z-10">
//         <h1
//           ref={titleRef}
//           className="text-5xl md:text-6xl font-bold tracking-tight bg-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]"
//         >
//           Education
//         </h1>
//         <p className="text-gray-300 mt-4 text-lg">
//           My Academic Journey & Achievements
//         </p>
//       </div>

//       {/* Timeline Center Line */}
//       <div className="absolute left-1/2 top-[220px] h-[calc(100%-250px)] w-[3px] bg-gradient-to-b from-transparent via-purple-500 to-transparent transform -translate-x-1/2"></div>

//       {/* Timeline Items */}
//       <div className="max-w-6xl mx-auto flex flex-col gap-32 px-6">
//         {timeline.map((item, index) => (
//           <div
//             key={index}
//             ref={(el) => (containerRef.current[index] = el)}
//             className={`relative flex flex-col md:flex-row items-center gap-12 ${
//               index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//             }`}
//           >
//             {/* Certificate Card */}
//             <div className="w-full md:w-1/2 flex justify-center perspective-1000">
//               <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-500 w-[90%] md:w-[80%] transform-style-preserve-3d">
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="bg-gradient-to-r from-purple-500 to-amber-500 p-4 rounded-full shadow-lg">
//                     {item.icon}
//                   </div>
//                   <h2 className="text-2xl md:text-3xl font-semibold text-white">
//                     {item.title}
//                   </h2>
//                 </div>
//                 <p className="text-black font-semibold whitespace-pre-line leading-relaxed ml-22">
//                   {item.description}
//                 </p>
//               </div>
//             </div>

//             {/* Timeline Dot */}
//             <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-amber-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] animate-pulse"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Education;
