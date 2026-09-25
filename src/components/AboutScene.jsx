import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import aboutImg from "../assets/about-character.jpg";
import aboutMobileImg from "../assets/about-mobile.png";

import "./AboutScene.css";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Python",
  "Full Stack",
  "UI/UX",
];

export default function AboutScene() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-panel__inner > *", {
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",

        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="about-scene"
      style={{
        "--about-desktop-bg": `url("${aboutImg}")`,
        "--about-mobile-bg": `url("${aboutMobileImg}")`,
      }}
    >
      {/* Responsive background */}
      <div className="about-scene__bg" />

      {/* Very light readability layer */}
      <div className="about-scene__scrim" />

      {/* Content stays inside the wall */}
      <div className="about-panel">
        <div className="about-panel__inner">

          <p className="eyebrow-mono">
            who i am
          </p>

          <h2>
            Hi, I'm Kunguma Navadharani.S
          </h2>

          <p className="about-panel__lede">
            I'm a Computer Science Engineering student
            and aspiring full-stack developer passionate
            about building meaningful digital experiences.
          </p>

          <p>
            I enjoy turning ideas into interactive websites,
            applications and creative digital products —
            spending as much care on how something feels
            as on how it works.
          </p>

          <ul className="about-panel__tags">
            {SKILLS.map((skill) => (
              <li key={skill}>
                {skill}
              </li>
            ))}
          </ul>

          <a
            className="btn ghost"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </a>

        </div>
      </div>
    </section>
  );
}