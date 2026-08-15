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

