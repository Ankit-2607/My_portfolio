// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const certificates = [
//   { title: "Python 101 for Data Science ", org: "IBM", year: "2026" },
//   { title: "Full Stack Web Development", org: "Udemy", year: "2025" },
//   // { title: "Python for Developers", org: "Google", year: "2023" },
//   // { title: "React Advanced Concepts", org: "Meta", year: "2024" },
//   // { title: "Backend Development", org: "Node Academy", year: "2025" },
// ];

// const Certification = () => {
//   const sectionRef = useRef(null);
//   const stageRef = useRef(null);

//   useEffect(() => {
//     // Scoping the query to `.certificate-card` only is what keeps the
//     // left content panel untouched — nothing there is ever selected
//     // or tweened, so it just sits still for the whole pinned sequence.
//     const cards = gsap.utils.toArray(".certificate-card");

//     const ctx = gsap.context(() => {
//       // Card 0 starts centered and visible. Every other card starts
//       // parked just below the stage, invisible — waiting its turn.
//       gsap.set(cards, {
//         yPercent: (i) => (i === 0 ? 0 : 100),
//         opacity: (i) => (i === 0 ? 1 : 0),
//       });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           // Pinning the section is what fixes the two original bugs:
//           // the page can't scroll the cards out of view mid-animation
//           // anymore, so every card (including the 5th) gets its full
//           // on-screen moment, and there's no leftover dead scroll gap
//           // afterward — the pin releases the instant the sequence ends.
//           end: () => `+=${(certificates.length - 1) * window.innerHeight}`,
//           scrub: 1,
//           pin: true,
//           pinSpacing: true,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//         },
//       });

//       // For each transition: the current (centered) card rises out of
//       // view while the next card rises into the center from below —
//       // "the previous card moves up" as you scroll, next one takes its place.
//       for (let i = 1; i < cards.length; i++) {
//         tl.to(
//           cards[i - 1],
//           { yPercent: -100, opacity: 0, ease: "power2.inOut", duration: 1 },
//           i - 1,
//         ).to(
//           cards[i],
//           { yPercent: 0, opacity: 1, ease: "power2.inOut", duration: 1 },
//           i - 1,
//         );
//       }
//     }, sectionRef);

//     // Recalculate positions once layout has fully settled (fonts,
//     // images, sections above this one finishing their own animations).
//     // This guards against the exact kind of stale-measurement issue
//     // that made the pin/scrub collapse until a manual reload fixed it.
//     const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

//     return () => {
//       cancelAnimationFrame(refreshId);
//       ctx.revert(); // kills the timeline, ScrollTrigger, and undoes gsap.set on unmount
//     };
//   }, []);

//   return (
//     <section
//       id="certificates"
//       ref={sectionRef}
//       className="relative h-screen w-full flex items-center bg-gray-50 px-6 md:px-16 overflow-hidden"
//     >
//       <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
//         {/* ---------------- LEFT: static content, never animated ---------------- */}
//         <div className="flex flex-col items-start text-left">
//           <span className="italic text-purple-600 font-medium tracking-wide text-lg mb-2">
//             Check Out
//           </span>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
//             My Certificates
//           </h2>
//           <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
//             I've completed several programming and web-development courses along
//             the way to keep sharpening my skills — here are a few of them.
//           </p>

//           <div className="flex items-center gap-6 flex-wrap">
//             <a
//               href="#contact"
//               className="inline-flex items-center gap-2 border-2 border-purple-600 text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
//             >
//               Know More
//             </a>
//             <span className="text-gray-500 text-sm">
//               {certificates.length} Certificates Earned
//             </span>
//           </div>

//           <p className="text-gray-400 text-xs mt-10">
//             Scroll to see all certificates →
//           </p>
//         </div>

//         {/* ---------------- RIGHT: pinned, centered card-swap animation ---------------- */}
//         <div
//           ref={stageRef}
//           className="relative w-full max-w-md mx-auto h-[280px] flex items-center justify-center"
//         >
//           {certificates.map((cert, index) => (
//             <div
//               key={index}
//               className="certificate-card absolute inset-0 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-xl p-8 text-center transform-gpu flex flex-col items-center justify-center"
//             >
//               <h3 className="text-2xl font-semibold text-purple-600">
//                 {cert.title}
//               </h3>
//               <p className="text-gray-700 mt-2">{cert.org}</p>
//               <p className="text-gray-500 text-sm mt-1">{cert.year}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Certification;

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    title: "Python 101 for Data Science",
    org: "IBM",
    year: "2026",

    // Image shown inside the card
    image: "/certificates/IBM_Certificate.png",

    // Original certificate PDF
    pdf: "/certificates/IBM_Certificate.pdf",
  },
  {
    title: "Full Stack Web Development",
    org: "Udemy",
    year: "2025",

    // Image shown inside the card
    image: "/certificates/FullStack_Certificate.png",

    // Original certificate PDF
    pdf: "/certificates/FullStack_Certificate.pdf",
  },

  // Add more certificates like this:
  // {
  //   title: "React Advanced Concepts",
  //   org: "Meta",
  //   year: "2025",
  //   image: "/certificates/react.png",
  //   pdf: "/certificates/react.pdf",
  // },
];

const Certification = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".certificate-card");

      // -----------------------------------------
      // Initial card positions
      // -----------------------------------------

      gsap.set(cards, {
        yPercent: (i) => (i === 0 ? 0 : 100),
        opacity: (i) => (i === 0 ? 1 : 0),
      });

      // -----------------------------------------
      // ScrollTrigger Timeline
      // -----------------------------------------

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",

          end: () => `+=${(certificates.length - 1) * window.innerHeight}`,

          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // -----------------------------------------
      // Certificate card animation
      // -----------------------------------------

      for (let i = 1; i < cards.length; i++) {
        // Previous card moves UP
        tl.to(
          cards[i - 1],
          {
            yPercent: -100,
            opacity: 0,
            ease: "power2.inOut",
            duration: 1,
          },
          i - 1,
        );

        // Next card comes from BELOW
        tl.to(
          cards[i],
          {
            yPercent: 0,
            opacity: 1,
            ease: "power2.inOut",
            duration: 1,
          },
          i - 1,
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger after layout
    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="
        relative
        h-screen
        w-full
        flex
        items-center
        bg-gray-50
        px-6
        md:px-16
        overflow-hidden
      "
    >
      <div
        className="
          w-full
          max-w-6xl
          mx-auto
          grid
          md:grid-cols-2
          gap-12
          md:gap-20
          items-center
        "
      >
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div className="flex flex-col items-start text-left">
          {/* Small heading */}

          <span
            className="
              italic
              text-purple-600
              font-medium
              tracking-wide
              text-lg
              mb-2
            "
          >
            Check Out
          </span>

          {/* Main heading */}

          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
              text-gray-900
              leading-tight
              mb-6
            "
          >
            My Certificates
          </h2>

          {/* Description */}

          <p
            className="
              text-gray-600
              max-w-md
              mb-8
              leading-relaxed
            "
          >
            I've completed several programming and web-development courses along
            the way to keep sharpening my skills — here are a few of them.
          </p>

          {/* Button + Certificate Count */}

          <div className="flex items-center gap-6 flex-wrap">
            <a
              href="#contact"
              className="
                inline-flex
                items-center
                gap-2
                border-2
                border-purple-600
                text-purple-600
                font-semibold
                px-6
                py-3
                rounded-lg
                hover:bg-purple-600
                hover:text-white
                transition-colors
              "
            >
              Know More
            </a>

            <span className="text-gray-500 text-sm">
              {certificates.length} Certificates Earned
            </span>
          </div>

          {/* Scroll Hint */}

          <p className="text-gray-400 text-xs mt-10">
            Scroll to see all certificates →
          </p>
        </div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div
          ref={stageRef}
          className="
            relative
            w-full
            max-w-md
            mx-auto
            h-[500px]
            flex
            items-center
            justify-center
          "
        >
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="
                certificate-card
                absolute
                inset-0
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-[0_15px_40px_rgba(0,0,0,0.12)]
                transform-gpu
                flex
                flex-col
              "
            >
              {/* =================================================
                  CERTIFICATE IMAGE
              ================================================== */}

              <div
                className="
                  relative
                  w-full
                  h-[330px]
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className="
                    w-full
                    h-full
                    object-contain
                    p-4
                    transition-transform
                    duration-500
                    hover:scale-105
                  "
                />

                {/* Image overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/0
                    hover:bg-black/5
                    transition-colors
                    duration-300
                    pointer-events-none
                  "
                />
              </div>

              {/* =================================================
                  CERTIFICATE INFORMATION
              ================================================== */}

              <div
                className="
                  flex-1
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  px-6
                  py-5
                "
              >
                {/* Certificate title */}

                <h3
                  className="
                    text-xl
                    md:text-2xl
                    font-semibold
                    text-purple-600
                  "
                >
                  {cert.title}
                </h3>

                {/* Organization */}

                <p className="text-gray-700 mt-2 font-medium">{cert.org}</p>

                {/* Year */}

                <p className="text-gray-500 text-sm mt-1">Issued {cert.year}</p>

                {/* View PDF Button */}

                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    bg-purple-600
                    text-white
                    px-5
                    py-2
                    rounded-lg
                    text-sm
                    font-semibold
                    hover:bg-purple-700
                    transition-colors
                  "
                >
                  View Certificate
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certification;