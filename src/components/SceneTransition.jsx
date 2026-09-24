import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// Wraps any overlay content with a consistent "expand out of the wall
// toward camera" entrance and reverse exit, used for the project
// gallery and the contact modal so both feel like the same studio
// mechanic rather than two different UI patterns.
export default function SceneTransition({ onClose, children, closing }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.92, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "power3.out" }
    );
  }, []);

  useLayoutEffect(() => {
    if (!closing) return;
    gsap.to(ref.current, {
      opacity: 0,
      scale: 0.94,
      y: 16,
      duration: 0.35,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [closing]);

  return (
    <div className="scene-transition" ref={ref}>
      {children}
    </div>
  );
}
