import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";
import experienceWall from "../assets/experience-wall.png";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    company: "Techvolt Software Pvt. Ltd.",
    role: "Frontend Developer Intern",
    period: "May 2025 – June 2025",
  },
  {
    company: "Crescent Infotech",
    role: "MERN Stack Development Intern",
    period: "2026 – 1 Month",
  },
  {
    company: "Elevate Labs",
    role: "Web Development Intern",
    period: "May 2026 – July 2026",
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".experience-content", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="experience-section"
      style={{
        backgroundImage: `url(${experienceWall})`,
      }}
    >
      <div className="experience-inner">

        <div className="experience-content">

          <p className="eyebrow-mono">
            05 &nbsp; EXPERIENCE
          </p>

          <h2>MY JOURNEY</h2>

          <div className="experience-timeline">

            {EXPERIENCE.map((item, index) => (
              <div className="experience-item" key={index}>

                <span className="experience-dot"></span>

                <div className="experience-info">
                  <h3>{item.company}</h3>

                  <p className="experience-role">
                    {item.role}
                  </p>

                  <p className="experience-period">
                    {item.period}
                  </p>
                </div>

              </div>
            ))}

          </div>

          <p className="experience-description">
            My professional experience and internship journey.
          </p>

        </div>

      </div>
    </section>
  );
}