// import { navLinks}  from '../../constants/index.js'
// import { gsap } from 'gsap'
// import { useGSAP } from '@gsap/react'

// const Navbar = () => {

//     useGSAP(() => {
//         const navTween = gsap.timeline({
//             scrollTrigger: {
//                 trigger: 'nav',
//                 start: 'bottom top'
//             }
//         });

//         navTween.fromTo('nav', {backgroundColor: 'tansparent'}, {
//             backgroundColor: '#000000050',
//             backgroundFilter: 'blur(10px)',
//             duration:1,
//             ease:'power1.inOut'
//         });
//     })

//   return (
//     <nav>
//         <div>
//             <a href='#home' className='flex '>
//                 {/* <img src='/logo.png' alt='logo' /> */}
//                 <p>Ak</p>
//             </a>

//             <ul>
//                 {navLinks.map((link) => (
//                     <li key={link.id}>
//                         <a href={`#${link.id}`}>{link.title}</a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     </nav>
//   )
// }

// export default Navbar





// import { navLinks } from "../../constants/index.js";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import React, { useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// const Navbar = () => {
//   const navRef = useRef(null);

//   useGSAP(() => {
//     const navTween = gsap.timeline({
//       scrollTrigger: {
//         trigger: navRef.current,
//         start: "bottom top",
//       },
//     });

//     navTween.fromTo(
//       navRef.current,
//       { backgroundColor: "transparent" },
//       {
//         backgroundColor: "rgba(0, 0, 0, 0.2)",
//         backdropFilter: "blur(10px)",
//         duration: 1.6,
//         // scrollTo: { y: target.offsetTop - 80 },
//         ease: "power1.inOut",
//       }
//     );
//   });

//   return (
//     <nav
//       ref={navRef}
//       className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300"
//     >
//       {/* Nav Inner Container with same margin as Hero */}
//       <div className="max-w-8xl mx-auto flex items-center justify-between px-10 py-4">
//         {/* Logo */}
//         <a href="#hero" className="text-2xl font-bold text-amber-500 ml-16">
//           AK
//         </a>

//         {/* Navigation Links */}
//         <ul className="hidden md:flex space-x-10 text-lg font-medium text-gray-600 mr-14">
//           {navLinks.map((link) => (
//             <li key={link.id} className="relative group">
//               <a
//                 href={`#${link.id}`}
//                 className="text-gray-800 transition-all duration-300 group-hover:text-purple-500"
//               >
//                 {link.title}
//                 {/* Underline animation */}
//                 <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden text-2xl text-gray-700">☰</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { navLinks } from "../../constants/index.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: navRef.current,
        start: "bottom top",
      },
    });

    navTween.fromTo(
      navRef.current,
      { backgroundColor: "transparent" },
      {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
        duration: 1.6,
        ease: "power1.inOut",
      }
    );
  });

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300"
    >
      {/* Nav Inner Container */}
      <div className="max-w-8xl mx-auto flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <a href="#hero" className="text-2xl font-bold text-purple-500 ml-15">
          AK.
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-10 text-lg font-medium text-gray-600 items-center ">
          {navLinks.map((link) => (
            <li key={link.id} className="relative group">
              <a
                href={`#${link.id}`}
                className="text-gray-800 transition-all duration-300 group-hover:text-purple-500"
              >
                {link.title}
                {/* Underline animation */}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}

          {/* Download CV Button */}
          <li>
            <a
              href="/Ankit_kumar_CV.pdf"
              download="Ankit_Kumar_CV.pdf"
              className="px-5 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition-all duration-300"
            >
              Download CV
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl text-gray-700">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
