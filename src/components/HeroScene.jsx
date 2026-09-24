import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "../assets/hero-studio.jpeg";
import "./HeroScene.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene() {
  const root = useRef(null);
  const bg = useRef(null);
  const copy = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // entrance
      gsap.timeline({ delay: 0.15 })
        .from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.7, ease: "power3.out" })
        .from(".hero-title span", { opacity: 0, y: 40, stagger: 0.08, duration: 0.9, ease: "power3.out" }, "-=0.4")
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(".hero-scrollcue", { opacity: 0, duration: 0.6 }, "-=0.3");

      // camera-forward feel on scroll: background scales up slightly and
      // dims while the copy drifts up and fades, as if walking into the room
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      })
        .to(bg.current, { scale: 1.18, filter: "brightness(0.55) saturate(1.05)", ease: "none" }, 0)
        .to(copy.current, { y: -80, opacity: 0, ease: "none" }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={root} className="hero-scene">
      <div className="hero-scene__bg" ref={bg} style={{ backgroundImage: `url(${heroImg})` }} />
      <div className="hero-scene__vignette" />

      <div className="hero-scene__copy" ref={copy}>
        <p className="hero-eyebrow eyebrow-mono">hello, i'm</p>
        <h1 className="hero-title">
          <span>Kunguma</span> <span>Navadharani</span>
        </h1>
        <p className="hero-sub">Full Stack Developer &middot; Designer &middot; Creator</p>
        <button className="btn hero-cta" onClick={() => {
          const t = document.getElementById("experience");
          window.__lenis ? window.__lenis.scrollTo(t, { duration: 1.4 }) : t.scrollIntoView({ behavior: "smooth" });
        }}>
          Explore My Work
        </button>
      </div>

      <div className="hero-scrollcue">
        <span className="hero-scrollcue__line" />
        scroll
      </div>
    </section>
  );
}
