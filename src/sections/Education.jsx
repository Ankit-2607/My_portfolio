import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  GraduationCap,
  School,
  BookOpen,
  MapPin,
  CalendarDays,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    title: "Masters in Computer Application (M.C.A.)",
    institution: "Lovely Professional University",
    location: "Punjab",
    duration: "2025 — Present",
    icon: GraduationCap,
  },
  {
    title: "Graduation in Bachelor of Arts (B.A.)",
    institution: "Munger University",
    location: "Munger, Bihar",
    duration: "2020 — 2023",
    icon: BookOpen,
  },
  {
    title: "Higher Secondary Education (10+2)",
    institution: "S.B. Public School",
    location: "Tarapur, Bihar",
    duration: "2018 — 2020",
    icon: School,
  },
  {
    title: "Secondary Education (10th)",
    institution: "New Era Public School",
    location: "Munger, Bihar",
    duration: "2016 — 2018",
    icon: Award,
  },
];

// Alternating accent so the timeline has a bit of rhythm to it instead
// of every card looking identical.
const accents = [
  { glow: "rgba(168,85,247,0.55)", ring: "from-purple-500 to-fuchsia-500", text: "text-purple-300" },
  { glow: "rgba(251,191,36,0.55)", ring: "from-amber-500 to-orange-500", text: "text-amber-300" },
];

const Education = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 85%",
        onEnter: () =>
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }),
      });

      // Scroll-filling progress line — grows down the center of the
      // timeline as the visitor scrolls through it, like a "journey"
      // indicator, instead of a static decorative line.
      gsap.fromTo(
        fillRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      // Cards: alternate a slight rotation + horizontal slide-in with a
      // bouncy ease, instead of a plain fade-up, for a bit more character.
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const fromLeft = i % 2 === 0;
        gsap.set(el, {
          opacity: 0,
          x: fromLeft ? -70 : 70,
          rotate: fromLeft ? -4 : 4,
          scale: 0.94,
        });
        ScrollTrigger.create({
          trigger: el,
          start: "top 82%",
          onEnter: () =>
            gsap.to(el, {
              opacity: 1,
              x: 0,
              rotate: 0,
              scale: 1,
              duration: 1,
              ease: "back.out(1.4)",
            }),
        });
      });

      // Dots: pop in with an elastic ease once their card is in view.
      dotRefs.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, { scale: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 82%",
          onEnter: () =>
            gsap.to(el, { scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }),
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-linear-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] pt-32 pb-60 text-white overflow-hidden"
    >
      {/* Ambient glow orbs for depth */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Background fades */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-black/80 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Section Title */}
      <div className="text-center mb-28 relative z-10">
        <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.3em] mb-3">
          My Journey
        </p>
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-purple-400 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
        >
          Education
        </h1>
        <p className="text-gray-300 mt-4 text-lg">
          My Academic Journey &amp; Achievements
        </p>
      </div>

      {/* Timeline */}
      <div ref={trackRef} className="relative max-w-6xl mx-auto px-6">
        {/* base line (always faintly visible) */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/10 -translate-x-1/2" />
        {/* animated fill line — grows as you scroll */}
        <div
          ref={fillRef}
          className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-linear-to-b from-purple-400 via-fuchsia-400 to-amber-400 shadow-[0_0_12px_rgba(217,70,239,0.8)]"
          style={{ height: "0%" }}
        />

        <div className="flex flex-col gap-28">
          {timeline.map((item, index) => {
            const accent = accents[index % accents.length];
            const Icon = item.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div
                    className="group relative w-[92%] md:w-[85%] rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 p-6 md:p-7 transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/[0.09]"
                    style={{ "--glow": accent.glow }}
                  >
                    {/* glow ring on hover, colored per-card */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `0 0 45px 0 ${accent.glow}` }}
                    />

                    {/* duration pill */}
                    <div className="flex items-center gap-1.5 w-fit mb-4 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium tracking-wide text-gray-200">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {item.duration}
                    </div>

                    <div className="flex items-start gap-4 mb-3">
                      <div
                        className={`shrink-0 p-3 rounded-xl bg-linear-to-br ${accent.ring} shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug pt-1">
                        {item.title}
                      </h2>
                    </div>

                    <div className="ml-1 space-y-1.5 text-gray-300">
                      <p className="font-medium text-gray-100">{item.institution}</p>
                      <p className={`flex items-center gap-1.5 text-sm ${accent.text}`}>
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* spacer for the alternating layout on desktop */}
                <div className="hidden md:block md:w-1/2" />

                {/* Timeline dot */}
                <div
                  ref={(el) => (dotRefs.current[index] = el)}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-linear-to-r ${accent.ring} shadow-[0_0_18px_2px_var(--glow)]`}
                    style={{ "--glow": accent.glow }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;



// import React, { useEffect, useMemo, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // ------------------------------------------------------------------
// // Landmarks — positioned by fraction of total road length (t: 0-1),
// // not by index, since the camera moves continuously along the curve.
// // ------------------------------------------------------------------
// const LANDMARKS = [
//   {
//     t: 0.2,
//     sign: "BA — History Honours",
//     title: "Bachelor of Arts",
//     lines: ["History Honours", "Education milestone"],
//     side: "left",
//   },
//   {
//     t: 0.48,
//     sign: "The Turning Point",
//     title: "Started Learning Programming",
//     lines: ["HTML · CSS · JavaScript", "Python · React"],
//     side: "right",
//   },
//   {
//     t: 0.75,
//     sign: "MCA — Current Journey",
//     title: "Master of Computer Applications",
//     lines: ["Lovely Professional University", "Full-Stack Development goal"],
//     side: "left",
//     prominent: true,
//   },
//   {
//     t: 0.96,
//     sign: "Full-Stack Developer",
//     title: "Future Destination",
//     lines: ["The road continues..."],
//     side: "right",
//   },
// ];

// // ------------------------------------------------------------------
// // World geometry. Everything (road, barriers, decor, landmarks) lives
// // in this single tall coordinate space. t=0 is the near/start of the
// // road (large Y), t=1 is the distant summit (small Y) — the camera
// // moves from large Y to small Y as the visitor scrolls.
// // ------------------------------------------------------------------
// const VIEW_W = 1200;
// const VIEW_H = 800;
// const WORLD_W = 1200;
// const WORLD_H = 4000;

// // Start -> curve LEFT -> curve RIGHT -> continue deeper -> vanish.
// // This shape is the whole point of the brief, so keep it obvious.
// const ROAD_WAYPOINTS = [
//   { x: 600, y: 3900, w: 220 },
//   { x: 260, y: 3080, w: 190 },
//   { x: 960, y: 2180, w: 150 },
//   { x: 540, y: 1280, w: 90 },
//   { x: 600, y: 240, w: 0 },
// ];

// // ---- Catmull-Rom -> cubic bezier, shared by every curve we draw ----
// function catmullRomSegments(points) {
//   const segs = [];
//   for (let i = 0; i < points.length - 1; i++) {
//     const p0 = points[i - 1] || points[i];
//     const p1 = points[i];
//     const p2 = points[i + 1];
//     const p3 = points[i + 2] || p2;
//     segs.push({
//       p0: p1,
//       c1: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
//       c2: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
//       p1: p2,
//     });
//   }
//   return segs;
// }

// function segmentsToPathD(segs) {
//   let d = `M ${segs[0].p0.x},${segs[0].p0.y}`;
//   segs.forEach(
//     (s) =>
//       (d += ` C ${s.c1.x},${s.c1.y} ${s.c2.x},${s.c2.y} ${s.p1.x},${s.p1.y}`),
//   );
//   return d;
// }

// function sampleCubic(seg, u) {
//   const mt = 1 - u;
//   const x =
//     mt ** 3 * seg.p0.x +
//     3 * mt * mt * u * seg.c1.x +
//     3 * mt * u * u * seg.c2.x +
//     u ** 3 * seg.p1.x;
//   const y =
//     mt ** 3 * seg.p0.y +
//     3 * mt * mt * u * seg.c1.y +
//     3 * mt * u * u * seg.c2.y +
//     u ** 3 * seg.p1.y;
//   return { x, y };
// }

// // Fine, evenly (by arc-length) spaced samples of the centerline, each
// // with a tangent angle — this is what lets the camera "follow" the
// // curve smoothly and bank into turns, instead of just zooming.
// function buildFineSamples(waypoints, resolution = 240) {
//   const segs = catmullRomSegments(waypoints);
//   const raw = [];
//   const perSeg = 30;
//   segs.forEach((seg, wIdx) => {
//     for (let i = 0; i <= perSeg; i++) {
//       const u = i / perSeg;
//       const pt = sampleCubic(seg, u);
//       const w =
//         waypoints[wIdx].w + (waypoints[wIdx + 1].w - waypoints[wIdx].w) * u;
//       raw.push({ ...pt, w });
//     }
//   });
//   // cumulative length
//   let total = 0;
//   const withLen = raw.map((p, i) => {
//     if (i > 0) total += Math.hypot(p.x - raw[i - 1].x, p.y - raw[i - 1].y);
//     return { ...p, len: total };
//   });
//   // reparametrize to evenly-spaced arc-length samples
//   const samples = [];
//   for (let i = 0; i < resolution; i++) {
//     const targetLen = (i / (resolution - 1)) * total;
//     let j = 0;
//     while (j < withLen.length - 1 && withLen[j + 1].len < targetLen) j++;
//     const a = withLen[j];
//     const b = withLen[Math.min(j + 1, withLen.length - 1)];
//     const span = Math.max(b.len - a.len, 0.0001);
//     const localU = Math.min(Math.max((targetLen - a.len) / span, 0), 1);
//     const x = a.x + (b.x - a.x) * localU;
//     const y = a.y + (b.y - a.y) * localU;
//     const w = a.w + (b.w - a.w) * localU;
//     const angle = Math.atan2(b.x - a.x, -(b.y - a.y)) * (180 / Math.PI); // 0 = straight "up"
//     samples.push({ x, y, w, angle, t: i / (resolution - 1) });
//   }
//   return { samples, totalLength: total };
// }

// function buildEdgePath(waypoints, extraWidth = 0) {
//   const left = waypoints.map((p) => ({ x: p.x - (p.w + extraWidth), y: p.y }));
//   const right = waypoints
//     .map((p) => ({ x: p.x + (p.w + extraWidth), y: p.y }))
//     .reverse();
//   const leftSegs = catmullRomSegments(left);
//   const rightSegs = catmullRomSegments(right);
//   return `${segmentsToPathD(leftSegs)} ${segmentsToPathD(rightSegs).replace(/^M [^C]+/, "L ")} Z`;
// }

// // Deterministic PRNG (seeded) so barriers/decor render identically
// // every load without needing to store random data.
// function makeRng(seed) {
//   let n = seed;
//   return () => {
//     n = (n * 1103515245 + 12345) & 0x7fffffff;
//     return n / 0x7fffffff;
//   };
// }

// // Guardrail posts along both edges, spaced by arc-length.
// function buildBarrierPosts(samples, everyN = 7) {
//   const left = [];
//   const right = [];
//   for (let i = 0; i < samples.length; i += everyN) {
//     const s = samples[i];
//     const nx = Math.cos((s.angle * Math.PI) / 180);
//     const ny = Math.sin((s.angle * Math.PI) / 180);
//     // perpendicular to tangent
//     const px = -ny;
//     const py = nx;
//     const off = s.w + 18;
//     left.push({ x: s.x - px * off, y: s.y - py * off });
//     right.push({ x: s.x + px * off, y: s.y + py * off });
//   }
//   return { left, right };
// }

// // Scattered rocks/trees beyond the barriers.
// function buildRoadsideDecor(samples, seed = 51, count = 22) {
//   const rand = makeRng(seed);
//   const items = [];
//   for (let i = 0; i < count; i++) {
//     const t = 0.04 + rand() * 0.92;
//     const idx = Math.min(
//       Math.round(t * (samples.length - 1)),
//       samples.length - 1,
//     );
//     const s = samples[idx];
//     const angleRad = (s.angle * Math.PI) / 180;
//     const px = Math.sin(angleRad);
//     const py = -Math.cos(angleRad);
//     const side = rand() > 0.5 ? 1 : -1;
//     const off = s.w + 45 + rand() * 90;
//     items.push({
//       x: s.x + px * off * side,
//       y: s.y + py * off * side,
//       kind: rand() > 0.45 ? "tree" : "rock",
//       scale: 0.7 + rand() * 0.9,
//     });
//   }
//   return items;
// }

// function TreeIcon({ x, y, scale }) {
//   return (
//     <g transform={`translate(${x},${y}) scale(${scale})`}>
//       <rect x="-3" y="0" width="6" height="14" fill="#4a3627" />
//       <path d="M -22,0 L 0,-46 L 22,0 Z" fill="#2f4a34" />
//       <path d="M -16,-16 L 0,-56 L 16,-16 Z" fill="#3a5a40" />
//     </g>
//   );
// }

// function RockIcon({ x, y, scale }) {
//   return (
//     <g transform={`translate(${x},${y}) scale(${scale})`}>
//       <ellipse cx="0" cy="0" rx="20" ry="13" fill="#5b544c" />
//       <ellipse cx="-8" cy="-4" rx="9" ry="6" fill="#6f665c" opacity="0.8" />
//     </g>
//   );
// }

// const Education = () => {
//   const sectionRef = useRef(null);
//   const farRef = useRef(null);
//   const midRef = useRef(null);
//   const worldGroupRef = useRef(null);
//   const landmarkRefs = useRef([]);
//   const startRef = useRef(null);
//   const endRef = useRef(null);

//   const { samples, totalLength } = useMemo(
//     () => buildFineSamples(ROAD_WAYPOINTS),
//     [],
//   );
//   const roadFillPath = useMemo(() => buildEdgePath(ROAD_WAYPOINTS, 0), []);
//   const snowEdgePath = useMemo(() => buildEdgePath(ROAD_WAYPOINTS, 14), []);
//   const centerlinePath = useMemo(
//     () =>
//       segmentsToPathD(
//         catmullRomSegments(ROAD_WAYPOINTS.map((p) => ({ x: p.x, y: p.y }))),
//       ),
//     [],
//   );
//   const barriers = useMemo(() => buildBarrierPosts(samples), [samples]);
//   const decor = useMemo(() => buildRoadsideDecor(samples), [samples]);

//   const landmarkPositions = useMemo(
//     () =>
//       LANDMARKS.map((lm) => {
//         const idx = Math.min(
//           Math.round(lm.t * (samples.length - 1)),
//           samples.length - 1,
//         );
//         const s = samples[idx];
//         const angleRad = (s.angle * Math.PI) / 180;
//         const px = Math.sin(angleRad);
//         const py = -Math.cos(angleRad);
//         const side = lm.side === "left" ? -1 : 1;
//         const off = s.w + 60;
//         return { ...lm, x: s.x + px * off * side, y: s.y + py * off * side };
//       }),
//     [samples],
//   );

//   const sampleAt = (t) => {
//     const idx = Math.min(
//       Math.max(Math.round(t * (samples.length - 1)), 0),
//       samples.length - 1,
//     );
//     return samples[idx];
//   };

//   useEffect(() => {
//     const isDesktop = window.matchMedia("(min-width: 768px)").matches;
//     if (!isDesktop) return;

//     const TARGET_X = VIEW_W / 2;
//     const TARGET_Y = VIEW_H * 0.82; // where "the camera" sits on screen

//     const ctx = gsap.context(() => {
//       landmarkRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0 }));
//       const revealed = new Array(LANDMARKS.length).fill(false);
//       let startShown = true;
//       let endShown = false;

//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top top",
//         end: () => `+=${LANDMARKS.length * window.innerHeight * 1.3}`,
//         scrub: 0.7,
//         pin: true,
//         pinSpacing: true,
//         anticipatePin: 1,
//         invalidateOnRefresh: true,
//         onUpdate: (self) => {
//           const progress = self.progress;
//           const s = sampleAt(progress);

//           const translateX = TARGET_X - s.x;
//           const translateY = TARGET_Y - s.y;
//           const bank = Math.max(-9, Math.min(9, s.angle * 0.22));

//           if (worldGroupRef.current) {
//             worldGroupRef.current.setAttribute(
//               "transform",
//               `rotate(${bank.toFixed(2)} ${TARGET_X} ${TARGET_Y}) translate(${translateX.toFixed(
//                 1,
//               )} ${translateY.toFixed(1)})`,
//             );
//           }

//           // backdrop mountains — distant, so they barely shift; not
//           // literally passed like roadside content, just subtle drift
//           gsap.set(farRef.current, {
//             y: progress * -14,
//             x: (s.x - 600) * -0.02,
//           });
//           gsap.set(midRef.current, {
//             y: progress * -30,
//             x: (s.x - 600) * -0.05,
//             scale: 1 - progress * 0.03,
//           });

//           // landmarks: fade in on approach, fade out once passed
//           LANDMARKS.forEach((lm, i) => {
//             const el = landmarkRefs.current[i];
//             if (!el) return;
//             const dist = progress - lm.t;
//             const inRange = dist > -0.08 && dist < 0.06;
//             if (inRange && !revealed[i]) {
//               revealed[i] = true;
//               gsap.to(el, {
//                 opacity: 1,
//                 y: 0,
//                 duration: 0.5,
//                 ease: "power2.out",
//               });
//             } else if (!inRange && revealed[i]) {
//               revealed[i] = false;
//               gsap.to(el, {
//                 opacity: 0,
//                 y: dist > 0 ? -14 : 14,
//                 duration: 0.4,
//                 ease: "power2.in",
//               });
//             }
//           });

//           // start / end bookend screens
//           if (progress > 0.035 && startShown) {
//             startShown = false;
//             gsap.to(startRef.current, { opacity: 0, duration: 0.5 });
//           } else if (progress <= 0.035 && !startShown) {
//             startShown = true;
//             gsap.to(startRef.current, { opacity: 1, duration: 0.3 });
//           }
//           if (progress > 0.93 && !endShown) {
//             endShown = true;
//             gsap.to(endRef.current, {
//               opacity: 1,
//               y: 0,
//               duration: 0.6,
//               ease: "power2.out",
//             });
//           } else if (progress <= 0.93 && endShown) {
//             endShown = false;
//             gsap.to(endRef.current, { opacity: 0, y: 20, duration: 0.3 });
//           }
//         },
//       });

//       ScrollTrigger.refresh();
//     }, sectionRef);

//     return () => ctx.revert();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [samples]);

//   // ---- snowfall: independent of scroll, pure CSS animation ----
//   const snowflakes = useMemo(() => {
//     const rand = makeRng(99);
//     return Array.from({ length: 70 }).map((_, i) => {
//       const size = 2 + rand() * 4;
//       return {
//         id: i,
//         left: rand() * 100,
//         size,
//         duration: 8 + rand() * 10,
//         delay: -rand() * 18,
//         drift: (rand() - 0.5) * 60,
//         opacity: 0.35 + rand() * 0.5,
//       };
//     });
//   }, []);

//   return (
//     <section
//       id="education"
//       ref={sectionRef}
//       className="relative w-full h-screen overflow-hidden text-white"
//     >
//       <style>{`
//         @keyframes snowfall {
//           0% { transform: translate(0, -5vh) translateX(0); }
//           100% { transform: translate(var(--drift), 105vh) translateX(0); }
//         }
//       `}</style>

//       {/* cold Himalayan sky */}
//       <div className="absolute inset-0 bg-linear-to-b from-[#1c2b3f] via-[#4f6a82] to-[#dbe9ef]" />
//       <svg
//         viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
//         className="absolute inset-0 w-full h-full"
//         preserveAspectRatio="xMidYMax slice"
//       >
//         <defs>
//           <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
//             <stop offset="0%" stopColor="#fff9ec" stopOpacity="0.9" />
//             <stop offset="40%" stopColor="#eaf3fb" stopOpacity="0.4" />
//             <stop offset="100%" stopColor="#eaf3fb" stopOpacity="0" />
//           </radialGradient>
//           <linearGradient id="farGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#c3d5e3" />
//             <stop offset="100%" stopColor="#8ea3b8" />
//           </linearGradient>
//           <linearGradient id="midGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#5f7186" />
//             <stop offset="100%" stopColor="#37455a" />
//           </linearGradient>
//           <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#33363c" />
//             <stop offset="50%" stopColor="#54575e" />
//             <stop offset="100%" stopColor="#2c2f34" />
//           </linearGradient>
//         </defs>
//         <circle cx="820" cy="260" r="200" fill="url(#sunGlow)" />
//         <circle cx="820" cy="260" r="40" fill="#fffdf6" />
//       </svg>

//       {/* far / mid mountains — snow-capped, cold palette */}
//       <svg
//         ref={farRef}
//         viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
//         preserveAspectRatio="xMidYMax slice"
//         className="absolute inset-0 w-full h-full"
//       >
//         <path
//           d="M0,340 L80,220 160,300 260,180 360,290 460,200 560,310 660,190 760,300 860,210 960,320 1060,200 1200,300 L1200,800 L0,800 Z"
//           fill="url(#farGrad)"
//           opacity="0.85"
//         />
//       </svg>
//       <svg
//         ref={midRef}
//         viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
//         preserveAspectRatio="xMidYMax slice"
//         className="absolute inset-0 w-full h-full"
//       >
//         <path
//           d="M0,460 L100,300 220,420 340,250 460,400 600,220 740,410 860,260 980,420 1100,270 1200,400 L1200,800 L0,800 Z"
//           fill="url(#midGrad)"
//         />
//         <path
//           d="M95,308 L100,300 L106,309 Z M336,258 L340,250 L346,259 Z M596,228 L600,220 L606,229 Z M856,268 L860,260 L866,269 Z M1096,278 L1100,270 L1106,279 Z"
//           fill="#f4f8fb"
//           opacity="0.95"
//         />
//       </svg>

//       {/* Title */}
//       <div className="absolute top-10 left-0 w-full text-center z-30 px-6 pointer-events-none">
//         <p className="text-sky-100 font-semibold text-xs uppercase tracking-[0.35em] mb-2 drop-shadow">
//           My Journey
//         </p>
//         <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
//           Education
//         </h1>
//       </div>

//       {/* Main scrolling world: road, barriers, decor, landmarks */}
//       <svg
//         viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
//         className="absolute inset-0 w-full h-full"
//       >
//         <g ref={worldGroupRef}>
//           {/* roadside decor, behind the barriers */}
//           {decor.map((d, i) =>
//             d.kind === "tree" ? (
//               <TreeIcon key={i} x={d.x} y={d.y} scale={d.scale} />
//             ) : (
//               <RockIcon key={i} x={d.x} y={d.y} scale={d.scale} />
//             ),
//           )}

//           {/* snow-dusted shoulder, then the road surface */}
//           <path d={snowEdgePath} fill="#eef6fb" opacity="0.85" />
//           <path d={roadFillPath} fill="url(#roadGrad)" />
//           <path
//             d={centerlinePath}
//             stroke="#f2f2f2"
//             strokeWidth="6"
//             strokeDasharray="26 22"
//             strokeLinecap="round"
//             fill="none"
//             opacity="0.85"
//           />

//           {/* guardrails */}
//           {[barriers.left, barriers.right].map((line, li) => (
//             <g key={li}>
//               <path
//                 d={`M ${line.map((p) => `${p.x},${p.y}`).join(" L ")}`}
//                 stroke="#9aa1a8"
//                 strokeWidth="4"
//                 fill="none"
//               />
//               {line.map((p, i) => (
//                 <rect
//                   key={i}
//                   x={p.x - 3}
//                   y={p.y - 2}
//                   width="6"
//                   height="22"
//                   fill="#6b7076"
//                 />
//               ))}
//             </g>
//           ))}

//           {/* landmarks — sign + glass info panel via foreignObject so
//               real HTML/Tailwind renders inside the SVG world and
//               inherits the camera transform automatically */}
//           {landmarkPositions.map((lm, i) => (
//             <foreignObject
//               key={i}
//               ref={(el) => (landmarkRefs.current[i] = el)}
//               x={lm.x - 130}
//               y={lm.y - 150}
//               width="260"
//               height="180"
//               style={{ overflow: "visible" }}
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div
//                   className={`px-3 py-1 rounded-md font-bold text-xs uppercase tracking-wide mb-2 shadow-md ${
//                     lm.prominent
//                       ? "bg-sky-200 text-slate-900"
//                       : "bg-white/90 text-slate-800"
//                   }`}
//                 >
//                   {lm.sign}
//                 </div>
//                 <div className="bg-slate-900/50 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 max-w-[230px]">
//                   <p className="text-sky-200 font-semibold text-sm">
//                     {lm.title}
//                   </p>
//                   {lm.lines.map((l, li) => (
//                     <p key={li} className="text-gray-200 text-xs mt-1">
//                       {l}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </foreignObject>
//           ))}
//         </g>
//       </svg>

//       {/* Snowfall — ambient, independent of scroll */}
//       <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
//         {snowflakes.map((f) => (
//           <span
//             key={f.id}
//             className="absolute top-0 rounded-full bg-white"
//             style={{
//               left: `${f.left}%`,
//               width: f.size,
//               height: f.size,
//               opacity: f.opacity,
//               filter: f.size > 4 ? "blur(0.3px)" : "none",
//               "--drift": `${f.drift}px`,
//               animation: `snowfall ${f.duration}s linear ${f.delay}s infinite`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Start overlay */}
//       <div
//         ref={startRef}
//         className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
//       >
//         <p className="text-sky-100 text-xs font-semibold uppercase tracking-[0.4em] mb-4">
//           My Education Journey
//         </p>
//         <p className="text-white/80 text-base max-w-md mb-8">
//           Every destination begins with a single step.
//         </p>
//         <p className="text-white/60 text-sm animate-bounce">
//           ↓ Scroll to begin
//         </p>
//       </div>

//       {/* End overlay */}
//       <div
//         ref={endRef}
//         className="absolute inset-0 z-40 flex flex-col items-center justify-end pb-24 text-center px-6 opacity-0 translate-y-5"
//       >
//         <p className="text-sky-100 text-xs font-semibold uppercase tracking-[0.35em] mb-3">
//           The Journey Continues...
//         </p>
//         <p className="text-white text-lg font-medium mb-1">
//           Currently pursuing MCA
//         </p>
//         <p className="text-gray-300 text-sm mb-6">
//           Building toward Full-Stack Development
//         </p>
//         <a
//           href="#projects"
//           className="pointer-events-auto bg-sky-100 text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-white transition-colors shadow-lg"
//         >
//           View My Projects
//         </a>
//       </div>

//       {/* Mobile fallback — the camera-follow scene is desktop-only */}
//       <div className="md:hidden absolute inset-0 bg-[#1c2b3f] overflow-y-auto pt-24 pb-16 px-6">
//         <div className="text-center mb-10">
//           <p className="text-sky-200 font-semibold text-xs uppercase tracking-[0.3em] mb-2">
//             My Journey
//           </p>
//           <h1 className="text-3xl font-bold">Education</h1>
//         </div>
//         <div className="max-w-md mx-auto space-y-8">
//           {LANDMARKS.map((lm, i) => (
//             <div key={i} className="border-l-2 border-sky-300/50 pl-4">
//               <p className="text-sky-200 font-bold text-xs uppercase">
//                 {lm.sign}
//               </p>
//               <p className="text-white text-base font-medium mt-1">
//                 {lm.title}
//               </p>
//               {lm.lines.map((l, li) => (
//                 <p key={li} className="text-gray-400 text-sm">
//                   {l}
//                 </p>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Education;