import { useEffect, useState } from "react";
import "./Navbar.css";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "experience", label: "Experience" },
  { id: "connect", label: "Connect" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      const mid = window.scrollY + window.innerHeight * 0.4;
      let current = sections[0]?.id;
      for (const s of sections) {
        if (s.offsetTop <= mid) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`kn-nav ${solid ? "kn-nav--solid" : ""}`}>
      <button className="kn-nav__mark" onClick={() => go("home")} aria-label="Go to top">KN</button>
      <ul className="kn-nav__links">
        {LINKS.map((l) => (
          <li key={l.id}>
            <button
              className={active === l.id ? "is-active" : ""}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}