// import gsap from "gsap";
// import { useEffect, useRef } from "react";
// import profile from "../assets/profile.png";

// import { PendulumPhysics } from "../physics/Physics.js";
// import {
//   seedEntranceSwing,
//   runCoupledPhysicsLoop,
//   startIdleBreathing,
//   startWindGusts,
//   playDoubleClickSwing,
// } from "../physics/animations.js";

// const RightSection = () => {
//   const sectionRef = useRef(null); // outer wrapper — used to measure drop distance
//   const ribbonRef = useRef(null);
//   const shadowRef = useRef(null);
//   const cardRef = useRef(null);
//   const badgeRef = useRef(null);

//   // Two independent pendulums, created once via refs so they survive
//   // re-renders without re-triggering effects:
//   //   cardPhysics   — the heavy body, drives everything (drag, flick,
//   //                   wind, idle breathing).
//   //   ribbonPhysics — the light body, has no gravity/interaction of
//   //                   its own; it's coupled to (chases, with lag) the
//   //                   card's angle every frame in animations.js.

//   const cardPhysicsRef = useRef(null);
//   const ribbonPhysicsRef = useRef(null);
//   if (!cardPhysicsRef.current) {
//     cardPhysicsRef.current = new PendulumPhysics({
//       length: 420,
//       gravity: 1500,
//       angularDamping: 0.987, // heavy — keeps swinging a long time
//     });
//     ribbonPhysicsRef.current = new PendulumPhysics({
//       length: 130,
//       gravity: 2000,
//       angularDamping: 0.9, // light/stiff — settles fast, mostly just follows
//     });
//   }

//   // Smoothed hover scale for the card (replaces the old CSS
//   // `hover:scale` + `transition-all`, which would otherwise fight the
//   // per-frame JS transform writes below and make the badge feel
//   // laggy/delayed).
//   const hoverRef = useRef(false);
//   const scaleRef = useRef(1);

//   useEffect(() => {
//     const badge = badgeRef.current;
//     const card = cardRef.current;
//     const shadow = shadowRef.current;
//     const cardPhysics = cardPhysicsRef.current;
//     const ribbonPhysics = ribbonPhysicsRef.current;

//     // ---- imperative per-frame writer -------------------------------
//     // `badge` carries the ribbon+connector's own (small, lagging)
//     // rotation. `card` carries its own independent rotation on top of
//     // that — since it's nested inside `badge`, the two compound
//     // visually exactly like a real two-segment lanyard: the card's
//     // absolute lean is "however much the ribbon has drifted, plus
//     // however much the card itself has swung beyond that."

//     const applyFrame = (cp, rp) => {
//       scaleRef.current +=
//         ((hoverRef.current ? 1.035 : 1) - scaleRef.current) * 0.15;

//       const ribbonRotateZ = -rp.angleDeg;
//       badge.style.transform = `rotateZ(${ribbonRotateZ.toFixed(2)}deg)`;

//       const cardRotateZ = -cp.angleDeg;
//       const cardRotateY = Math.max(
//         -8,
//         Math.min(8, -cp.angularVelocity * 2.4 + cp.wobble * 3),
//       );
//       const cardRotateX = Math.max(-5, Math.min(5, cp.wobble * 4));
//       card.style.transform = `rotateZ(${cardRotateZ.toFixed(2)}deg) rotateY(${cardRotateY.toFixed(
//         2,
//       )}deg) rotateX(${cardRotateX.toFixed(2)}deg) scale(${scaleRef.current.toFixed(3)})`;

//       // subtle motion blur on fast swings
//       const speed = Math.abs(cp.angularVelocity);
//       card.style.filter =
//         speed > 0.14
//           ? `blur(${Math.min(2, speed * 1.1).toFixed(2)}px)`
//           : "none";

//       // shadow: tracks the card's combined lean (ribbon + card), stays
//       // a flat ellipse (counter-rotated against the inherited badge
//       // rotation) instead of spinning — same size/color, just repositioned.
//       if (shadow) {
//         const combinedDeg = ribbonRotateZ + cardRotateZ;
//         const dist = Math.min(1, Math.abs(cp.angle) * 1.4);
//         shadow.style.transform = `rotate(${(-ribbonRotateZ).toFixed(2)}deg) translateX(${(
//           combinedDeg * 1.4
//         ).toFixed(1)}px)`;
//         shadow.style.opacity = (0.35 - dist * 0.15).toFixed(2);
//       }
//     };

//     // ---- entrance -> physics loop -> idle breathing / wind ---------
//     let dropTl = null;
//     let stopLoop = () => {};
//     let stopIdle = () => {};
//     let stopWind = () => {};
//     let cancelled = false;

//     const reduceMotion =
//       typeof window !== "undefined" &&
//       window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

//     const beginLoop = () => {
//       if (cancelled) return;
//       stopLoop = runCoupledPhysicsLoop(cardPhysics, ribbonPhysics, applyFrame);
//       stopIdle = startIdleBreathing(cardPhysics);
//       stopWind = startWindGusts(cardPhysics);
//     };

//     // Drop distance: measured from the badge's natural resting spot up
//     // to the top of the hero section itself, so it genuinely falls
//     // from the very top of the section instead of a fixed, often-tiny
//     // 120px. Falls back to a sane default if measurement isn't ready.
//     const sectionRect = sectionRef.current?.getBoundingClientRect();
//     const badgeRect = badge.getBoundingClientRect();
//     const measuredDrop = sectionRect
//       ? Math.max(badgeRect.top - sectionRect.top, 0)
//       : 0;
//     const dropDistance = Math.max(measuredDrop, 420);

//     if (reduceMotion) {
//       gsap.set(badge, { y: 0, opacity: 1 });
//       cardPhysics.angle = 0;
//       cardPhysics.angularVelocity = 0;
//       ribbonPhysics.angle = 0;
//       ribbonPhysics.angularVelocity = 0;
//       applyFrame(cardPhysics, ribbonPhysics);
//       stopLoop = runCoupledPhysicsLoop(cardPhysics, ribbonPhysics, applyFrame);
//     } else {
//       gsap.set(badge, { y: -dropDistance, opacity: 1 });

//       dropTl = gsap
//         .timeline({
//           onComplete: () => {
//             seedEntranceSwing(cardPhysics, ribbonPhysics); // smooth velocity kick, no angle jump
//             beginLoop();
//           },
//         })
//         // accelerating fall — power2.in front-loads the slow motion so
//         // the drop stays clearly visible the whole way down
//         .to(badge, { y: 0, duration: 0.62, ease: "power2.in" })
//         // slight downward overshoot, like the lanyard going briefly taut
//         .to(badge, { y: 16, duration: 0.12, ease: "power1.out" })
//         // bounce back up and settle
//         .to(badge, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.55)" });
//     }

//     return () => {
//       cancelled = true;
//       dropTl?.kill();
//       stopLoop();
//       stopIdle();
//       stopWind();
//     };
//   }, []);

//   // ---- dragging: grab the card, only the card's own pendulum reacts
//   // directly — the ribbon is pulled along afterward via coupling ------
//   const dragState = useRef({ samples: [] });

//   const onCardPointerDown = (e) => {
//     e.preventDefault();
//     const cardPhysics = cardPhysicsRef.current;
//     const card = cardRef.current;
//     const pivotRect = card.getBoundingClientRect();
//     const pivotX = pivotRect.left + pivotRect.width / 2;
//     const pivotY = pivotRect.top; // top-center, matches the card's own `origin-top`

//     cardPhysics.isDragging = true;
//     dragState.current.samples = [
//       { t: performance.now(), x: e.clientX, y: e.clientY },
//     ];

//     const move = (ev) => {
//       const px = ev.clientX - pivotX;
//       const py = ev.clientY - pivotY;
//       cardPhysics.setDragAngle(px, py);
//       dragState.current.samples.push({
//         t: performance.now(),
//         x: ev.clientX,
//         y: ev.clientY,
//       });
//       if (dragState.current.samples.length > 6)
//         dragState.current.samples.shift();
//     };

//     const up = () => {
//       cardPhysics.isDragging = false;
//       const samples = dragState.current.samples;
//       if (samples.length >= 2) {
//         const a = samples[0];
//         const b = samples[samples.length - 1];
//         const dt = Math.max(1, b.t - a.t) / 1000;
//         const vx = (b.x - a.x) / dt;
//         const vy = (b.y - a.y) / dt;
//         cardPhysics.releaseWithVelocity(vx, vy);
//       }
//       window.removeEventListener("pointermove", move);
//       window.removeEventListener("pointerup", up);
//     };

//     window.addEventListener("pointermove", move);
//     window.addEventListener("pointerup", up);
//   };

//   const onCardDoubleClick = () => playDoubleClickSwing(cardPhysicsRef.current);
//   const onCardPointerEnter = () => (hoverRef.current = true);
//   const onCardPointerLeave = () => (hoverRef.current = false);

//   return (
//     <div
//       ref={sectionRef}
//       className="relative w-full lg:w-1/2 h-screen flex justify-center"
//       style={{ perspective: 1400 }}
//     >
//       <div
//         ref={badgeRef}
//         className="absolute left-1/2 -translate-x-1/2 -top-2 origin-top"
//         style={{ transformStyle: "preserve-3d" }}
//       >
//         {/* Ribbon — unchanged */}
//         <div
//           ref={ribbonRef}
//           className="absolute left-1/2 -translate-x-1/2 top-0"
//           style={{
//             transformOrigin: "top center",
//             transformStyle: "preserve-3d",
//           }}
//         >
//           <svg
//             width="120"
//             height="520"
//             viewBox="0 0 120 520"
//             className="overflow-visible"
//           >
//             <defs>
//               {/* Ribbon Gradient */}

//               <linearGradient
//                 id="ribbonGradient"
//                 x1="0%"
//                 y1="0%"
//                 x2="100%"
//                 y2="0%"
//               >
//                 <stop offset="0%" stopColor="#5B21B6" />
//                 <stop offset="50%" stopColor="#7C3AED" />
//                 <stop offset="100%" stopColor="#F97316" />
//               </linearGradient>

//               {/* Cloth Pattern */}

//               <pattern
//                 id="fabric"
//                 width="8"
//                 height="8"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <path
//                   d="M0 0L8 8M8 0L0 8"
//                   stroke="rgba(255,255,255,.08)"
//                   strokeWidth="1"
//                 />
//               </pattern>
//             </defs>

//             {/* Main Ribbon */}

//             <rect
//               x="38"
//               y="0"
//               width="44"
//               height="380"
//               rx="8"
//               fill="url(#ribbonGradient)"
//             />

//             {/* Fabric Texture */}

//             <rect
//               x="38"
//               y="0"
//               width="44"
//               height="330"
//               rx="8"
//               fill="url(#fabric)"
//             />

//             {/* Left Stitch */}

//             <line
//               x1="44"
//               y1="0"
//               x2="44"
//               y2="340"
//               stroke="rgba(255,255,255,.35)"
//               strokeDasharray="2 5"
//             />

//             {/* Right Stitch */}

//             <line
//               x1="76"
//               y1="0"
//               x2="76"
//               y2="340"
//               stroke="rgba(255,255,255,.35)"
//               strokeDasharray="2 5"
//             />

//             {/* Printed Text */}

//             <g transform="translate(62,25) rotate(90)">
//               <text
//                 fill="white"
//                 fontSize="12"
//                 fontWeight="700"
//                 letterSpacing="3"
//               >
//                 ANKIT • FULL STACK • REACT • GSAP •
//               </text>
//             </g>

//             {/* Top Fold */}

//             <rect
//               x="38"
//               y="0"
//               width="44"
//               height="20"
//               fill="rgba(255,255,255,.12)"
//             />
//           </svg>
//         </div>

//         {/* ================= METAL CONNECTOR (unchanged) ================= */}

//         <div className="absolute top-[370px] left-1/2 -translate-x-1/2 z-40">
//           {/* Clamp */}

//           <div
//             className="w-12 h-7 rounded-md
//                   bg-linear-to-b
//                   from-gray-100
//                   via-gray-300
//                   to-gray-500
//                   border
//                   border-gray-400
//                   shadow-lg
//                   relative"
//           >
//             <div
//               className="absolute
//                    left-1/2
//                    top-1/2
//                    -translate-x-1/2
//                    -translate-y-1/2
//                    w-5
//                    h-3
//                    rounded-sm
//                    bg-gray-600"
//             ></div>
//           </div>

//           {/* Ring */}

//           <div className="flex justify-center mt-1">
//             <div
//               className="w-8 h-8
//                      rounded-full
//                      border-[3px]
//                      border-gray-500"
//             ></div>
//           </div>

//           {/* Hook */}

//           <div className="flex justify-center">
//             <div
//               className="w-1
//                      h-4
//                      bg-gray-500
//                      rounded-full"
//             ></div>
//           </div>
//         </div>

//         {/* ================= ID CARD (unchanged, only drag handlers added) ================= */}

//         <div
//           ref={cardRef}
//           onPointerDown={onCardPointerDown}
//           onDoubleClick={onCardDoubleClick}
//           onPointerEnter={onCardPointerEnter}
//           onPointerLeave={onCardPointerLeave}
//           className="absolute
//       z-50
//       top-[450px]
//       left-1/2
//       -translate-x-1/2
//       w-[360px]
//       bg-white
//       rounded-2xl
//       shadow-[0_25px_50px_rgba(0,0,0,.25)]
//       overflow-hidden
//       origin-top
//       cursor-grab
//       active:cursor-grabbing"
//           style={{
//             transformStyle: "preserve-3d",
//             touchAction: "none",
//           }}
//         >
//           {/* Photo */}

//           <div className="p-3">
//             <img
//               src={profile}
//               alt="Profile"
//               className="w-full
//                    h-100
//                    object-cover
//                    rounded-md"
//             />
//           </div>

//           {/* Divider */}

//           <div className="w-full h-px bg-gray-200"></div>

//           {/* Info */}

//           <div className="py-4 text-center">
//             <h2 className="text-xl font-bold">Ankit Kumar</h2>

//             <p className="text-gray-500 mt-1">Full Stack Developer</p>
//           </div>
//         </div>

//         <div
//           ref={shadowRef}
//           className="absolute
//              top-[820px]
//              left-1/2
//              -translate-x-1/2
//              w-52
//              h-5
//              bg-black/20
//              blur-xl
//              rounded-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default RightSection;

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import profile from "../assets/profile.png";

import { PendulumPhysics } from "../physics/Physics.js";
import {
  seedEntranceSwing,
  runCoupledPhysicsLoop,
  startIdleBreathing,
  startWindGusts,
  playDoubleClickSwing,
} from "../physics/animations.js";

const RightSection = () => {
  const sectionRef = useRef(null); // outer wrapper — used to measure drop distance
  const ribbonRef = useRef(null);
  const shadowRef = useRef(null);
  const cardRef = useRef(null);
  const badgeRef = useRef(null);

  // Two independent pendulums, created once via refs so they survive
  // re-renders without re-triggering effects:
  //   cardPhysics   — the heavy body, drives everything (drag, flick,
  //                   wind, idle breathing).
  //   ribbonPhysics — the light body, has no gravity/interaction of
  //                   its own; it's coupled to (chases, with lag) the
  //                   card's angle every frame in animations.js. That
  //                   lag is what makes them swing as two separate
  //                   things instead of one rigid rod.
  const cardPhysicsRef = useRef(null);
  const ribbonPhysicsRef = useRef(null);
  if (!cardPhysicsRef.current) {
    cardPhysicsRef.current = new PendulumPhysics({
      length: 420,
      gravity: 1500,
      angularDamping: 0.987, // heavy — keeps swinging a long time
    });
    ribbonPhysicsRef.current = new PendulumPhysics({
      length: 130,
      gravity: 2000,
      angularDamping: 0.9, // light/stiff — settles fast, mostly just follows
    });
  }

  // Smoothed hover scale for the card (replaces the old CSS
  // `hover:scale` + `transition-all`, which would otherwise fight the
  // per-frame JS transform writes below and make the badge feel
  // laggy/delayed).
  const hoverRef = useRef(false);
  const scaleRef = useRef(1);

  // ---- fit-to-viewport scale ----------------------------------------
  // The ribbon + connector + card + shadow use fixed pixel offsets
  // (top-[370px], top-[450px], top-[820px], etc.) so the whole
  // assembly has a fixed natural height of roughly NATURAL_HEIGHT px.
  // On laptops with a shorter viewport than that, the bottom of the
  // card/shadow would render past the end of this `h-screen` section
  // and get visually covered by whatever section comes next — that's
  // the "cut off" bug. Scaling the assembly down to fit whatever
  // height is actually available fixes it for every screen, without
  // touching any of the ribbon/connector/card's internal positioning.
  const NATURAL_HEIGHT = 900; // ribbon top (0) down to the bottom of the card (~885px) + a small buffer
  const MIN_SCALE = 0.55;
  const fitWrapRef = useRef(null);
  const [fitScale, setFitScale] = useState(1);

  useEffect(() => {
    const recomputeScale = () => {
      const available = sectionRef.current?.clientHeight ?? window.innerHeight;
      const next = Math.min(1, available / NATURAL_HEIGHT);
      setFitScale(
        Number.isFinite(next) && next > 0 ? Math.max(next, MIN_SCALE) : 1,
      );
    };

    recomputeScale();
    window.addEventListener("resize", recomputeScale);
    return () => window.removeEventListener("resize", recomputeScale);
  }, []);

  useEffect(() => {
    const badge = badgeRef.current;
    const card = cardRef.current;
    const shadow = shadowRef.current;
    const cardPhysics = cardPhysicsRef.current;
    const ribbonPhysics = ribbonPhysicsRef.current;

    // ---- imperative per-frame writer -------------------------------
    // `badge` carries the ribbon+connector's own (small, lagging)
    // rotation. `card` carries its own independent rotation on top of
    // that — since it's nested inside `badge`, the two compound
    // visually exactly like a real two-segment lanyard: the card's
    // absolute lean is "however much the ribbon has drifted, plus
    // however much the card itself has swung beyond that."
    //
    // NOTE on the minus sign: CSS rotate() is applied in a y-down
    // coordinate system, so a positive `angle` (pointer dragged right)
    // actually renders as swinging LEFT unless negated here.
    const applyFrame = (cp, rp) => {
      scaleRef.current +=
        ((hoverRef.current ? 1.035 : 1) - scaleRef.current) * 0.15;

      const ribbonRotateZ = -rp.angleDeg;
      badge.style.transform = `rotateZ(${ribbonRotateZ.toFixed(2)}deg)`;

      const cardRotateZ = -cp.angleDeg;
      const cardRotateY = Math.max(
        -8,
        Math.min(8, -cp.angularVelocity * 2.4 + cp.wobble * 3),
      );
      const cardRotateX = Math.max(-5, Math.min(5, cp.wobble * 4));
      card.style.transform = `rotateZ(${cardRotateZ.toFixed(2)}deg) rotateY(${cardRotateY.toFixed(
        2,
      )}deg) rotateX(${cardRotateX.toFixed(2)}deg) scale(${scaleRef.current.toFixed(3)})`;

      // subtle motion blur on fast swings
      const speed = Math.abs(cp.angularVelocity);
      card.style.filter =
        speed > 0.14
          ? `blur(${Math.min(2, speed * 1.1).toFixed(2)}px)`
          : "none";

      // shadow: tracks the card's combined lean (ribbon + card), stays
      // a flat ellipse (counter-rotated against the inherited badge
      // rotation) instead of spinning — same size/color, just repositioned.
      if (shadow) {
        const combinedDeg = ribbonRotateZ + cardRotateZ;
        const dist = Math.min(1, Math.abs(cp.angle) * 1.4);
        shadow.style.transform = `rotate(${(-ribbonRotateZ).toFixed(2)}deg) translateX(${(
          combinedDeg * 1.4
        ).toFixed(1)}px)`;
        shadow.style.opacity = (0.35 - dist * 0.15).toFixed(2);
      }
    };

    // ---- entrance -> physics loop -> idle breathing / wind ---------
    let dropTl = null;
    let stopLoop = () => {};
    let stopIdle = () => {};
    let stopWind = () => {};
    let cancelled = false;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const beginLoop = () => {
      if (cancelled) return;
      stopLoop = runCoupledPhysicsLoop(cardPhysics, ribbonPhysics, applyFrame);
      stopIdle = startIdleBreathing(cardPhysics);
      stopWind = startWindGusts(cardPhysics);
    };

    // Drop distance: measured from the badge's natural resting spot up
    // to the top of the hero section itself, so it genuinely falls
    // from the very top of the section instead of a fixed, often-tiny
    // 120px. Falls back to a sane default if measurement isn't ready.
    const sectionRect = sectionRef.current?.getBoundingClientRect();
    const badgeRect = badge.getBoundingClientRect();
    const measuredDrop = sectionRect
      ? Math.max(badgeRect.top - sectionRect.top, 0)
      : 0;
    const dropDistance = Math.max(measuredDrop, 420);

    if (reduceMotion) {
      gsap.set(badge, { y: 0, opacity: 1 });
      cardPhysics.angle = 0;
      cardPhysics.angularVelocity = 0;
      ribbonPhysics.angle = 0;
      ribbonPhysics.angularVelocity = 0;
      applyFrame(cardPhysics, ribbonPhysics);
      stopLoop = runCoupledPhysicsLoop(cardPhysics, ribbonPhysics, applyFrame);
    } else {
      gsap.set(badge, { y: -dropDistance, opacity: 1 });

      dropTl = gsap
        .timeline({
          onComplete: () => {
            seedEntranceSwing(cardPhysics, ribbonPhysics); // smooth velocity kick, no angle jump
            beginLoop();
          },
        })
        // accelerating fall — power2.in front-loads the slow motion so
        // the drop stays clearly visible the whole way down
        .to(badge, { y: 0, duration: 0.62, ease: "power2.in" })
        // slight downward overshoot, like the lanyard going briefly taut
        .to(badge, { y: 16, duration: 0.12, ease: "power1.out" })
        // bounce back up and settle
        .to(badge, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.55)" });
    }

    return () => {
      cancelled = true;
      dropTl?.kill();
      stopLoop();
      stopIdle();
      stopWind();
    };
  }, []);

  // ---- dragging: grab the card, only the card's own pendulum reacts
  // directly — the ribbon is pulled along afterward via coupling ------
  const dragState = useRef({ samples: [] });

  const onCardPointerDown = (e) => {
    e.preventDefault();
    const cardPhysics = cardPhysicsRef.current;
    const card = cardRef.current;
    const pivotRect = card.getBoundingClientRect();
    const pivotX = pivotRect.left + pivotRect.width / 2;
    const pivotY = pivotRect.top; // top-center, matches the card's own `origin-top`

    cardPhysics.isDragging = true;
    dragState.current.samples = [
      { t: performance.now(), x: e.clientX, y: e.clientY },
    ];

    const move = (ev) => {
      const px = ev.clientX - pivotX;
      const py = ev.clientY - pivotY;
      cardPhysics.setDragAngle(px, py);
      dragState.current.samples.push({
        t: performance.now(),
        x: ev.clientX,
        y: ev.clientY,
      });
      if (dragState.current.samples.length > 6)
        dragState.current.samples.shift();
    };

    const up = () => {
      cardPhysics.isDragging = false;
      const samples = dragState.current.samples;
      if (samples.length >= 2) {
        const a = samples[0];
        const b = samples[samples.length - 1];
        const dt = Math.max(1, b.t - a.t) / 1000;
        const vx = (b.x - a.x) / dt;
        const vy = (b.y - a.y) / dt;
        cardPhysics.releaseWithVelocity(vx, vy);
      }
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const onCardDoubleClick = () => playDoubleClickSwing(cardPhysicsRef.current);
  const onCardPointerEnter = () => (hoverRef.current = true);
  const onCardPointerLeave = () => (hoverRef.current = false);

  return (
    <div
      ref={sectionRef}
      className="relative w-full lg:w-1/2 h-screen lg:h-full flex justify-center"
      style={{ perspective: 1400 }}
    >
      <div
        ref={fitWrapRef}
        className="relative w-full h-full"
        style={{
          transform: `scale(${fitScale})`,
          transformOrigin: "top center",
        }}
      >
        <div
          ref={badgeRef}
          className="absolute left-1/2 -translate-x-1/2 -top-2 origin-top"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Ribbon — unchanged */}
          <div
            ref={ribbonRef}
            className="absolute left-1/2 -translate-x-1/2 top-0"
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
            }}
          >
            <svg
              width="120"
              height="520"
              viewBox="0 0 120 520"
              className="overflow-visible"
            >
              <defs>
                {/* Ribbon Gradient */}

                <linearGradient
                  id="ribbonGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#5B21B6" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>

                {/* Cloth Pattern */}

                <pattern
                  id="fabric"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 0L8 8M8 0L0 8"
                    stroke="rgba(255,255,255,.08)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>

              {/* Main Ribbon */}

              <rect
                x="38"
                y="0"
                width="44"
                height="380"
                rx="8"
                fill="url(#ribbonGradient)"
              />

              {/* Fabric Texture */}

              <rect
                x="38"
                y="0"
                width="44"
                height="330"
                rx="8"
                fill="url(#fabric)"
              />

              {/* Left Stitch */}

              <line
                x1="44"
                y1="0"
                x2="44"
                y2="340"
                stroke="rgba(255,255,255,.35)"
                strokeDasharray="2 5"
              />

              {/* Right Stitch */}

              <line
                x1="76"
                y1="0"
                x2="76"
                y2="340"
                stroke="rgba(255,255,255,.35)"
                strokeDasharray="2 5"
              />

              {/* Printed Text */}

              <g transform="translate(62,25) rotate(90)">
                <text
                  fill="white"
                  fontSize="12"
                  fontWeight="700"
                  letterSpacing="3"
                >
                  ANKIT • FULL STACK • REACT • GSAP •
                </text>
              </g>

              {/* Top Fold */}

              <rect
                x="38"
                y="0"
                width="44"
                height="20"
                fill="rgba(255,255,255,.12)"
              />
            </svg>
          </div>

          {/* ================= METAL CONNECTOR (unchanged) ================= */}

          <div className="absolute top-[370px] left-1/2 -translate-x-1/2 z-40">
            {/* Clamp */}

            <div
              className="w-12 h-7 rounded-md
                  bg-gradient-to-b
                  from-gray-100
                  via-gray-300
                  to-gray-500
                  border
                  border-gray-400
                  shadow-lg
                  relative"
            >
              <div
                className="absolute
                   left-1/2
                   top-1/2
                   -translate-x-1/2
                   -translate-y-1/2
                   w-5
                   h-3
                   rounded-sm
                   bg-gray-600"
              ></div>
            </div>

            {/* Ring */}

            <div className="flex justify-center mt-1">
              <div
                className="w-8 h-8
                     rounded-full
                     border-[3px]
                     border-gray-500"
              ></div>
            </div>

            {/* Hook */}

            <div className="flex justify-center">
              <div
                className="w-[4px]
                     h-4
                     bg-gray-500
                     rounded-full"
              ></div>
            </div>
          </div>

          {/* ================= ID CARD (unchanged, only drag handlers added) ================= */}

          <div
            ref={cardRef}
            onPointerDown={onCardPointerDown}
            onDoubleClick={onCardDoubleClick}
            onPointerEnter={onCardPointerEnter}
            onPointerLeave={onCardPointerLeave}
            className="absolute
      z-50
      top-[450px]
      left-1/2
      -translate-x-1/2
      w-[350px]
      bg-white
      rounded-2xl
      shadow-[0_25px_50px_rgba(0,0,0,.25)]
      overflow-hidden
      origin-top
      cursor-grab
      active:cursor-grabbing"
            style={{
              transformStyle: "preserve-3d",
              touchAction: "none",
            }}
          >
            {/* Photo */}

            <div className="p-3">
              <img
                src={profile}
                alt="Profile"
                className="w-full
                   h-[320px]
                   object-cover
                   rounded-md"
              />
            </div>

            {/* Divider */}

            <div className="w-full h-px bg-gray-200"></div>

            {/* Info */}

            <div className="py-4 text-center">
              <h2 className="text-xl font-bold">Ankit Kumar</h2>

              <p className="text-gray-500 mt-1">Full Stack Developer</p>
            </div>
          </div>

          <div
            ref={shadowRef}
            className="absolute
             top-[820px]
             left-1/2
             -translate-x-1/2
             w-52
             h-5
             bg-black/20
             blur-xl
             rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RightSection;