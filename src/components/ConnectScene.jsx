import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import doorImg from "../assets/door-hallway.jpeg";
import ContactModal from "./ContactModal";
import "./ConnectScene.css";

gsap.registerPlugin(ScrollTrigger);

export default function ConnectScene() {
  const root = useRef(null);
  const door = useRef(null);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".connect-copy > *", {
        opacity: 0,
        y: 26,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });

      // approach the door as the visitor scrolls toward it
      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: 0.7 },
      })
        .fromTo(door.current, { scale: 1.02 }, { scale: 1.12, ease: "none" }, 0)
        .to(".connect-scene__scrim", { opacity: 0.55, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    gsap.to(door.current, { filter: "brightness(1.25) saturate(1.1)", duration: 0.5 });
    gsap.to(".connect-scene__glow", { opacity: 1, duration: 0.5 });
  };
  const handleLeave = () => {
    gsap.to(door.current, { filter: "brightness(1) saturate(1)", duration: 0.6 });
    gsap.to(".connect-scene__glow", { opacity: 0, duration: 0.6 });
  };

  return (
    <section id="connect" ref={root} className="connect-scene">
      <div className="connect-scene__bg" ref={door} style={{ backgroundImage: `url(${doorImg})` }} />
      <div className="connect-scene__scrim" />
      <div className="connect-scene__glow" />

      <div className="connect-copy">
        <p className="eyebrow-mono">have an idea?</p>
        <h2>Let's build it<br />together.</h2>
        <p className="connect-copy__sub">
          Have a project, website or creative idea in mind? Let's turn it into something real.
        </p>
        <button
          className="btn connect-cta"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onClick={() => setOpen(true)}
        >
          Connect With Me
        </button>
      </div>

      {open && <ContactModal onClose={() => setOpen(false)} />}
    </section>
  );
}
