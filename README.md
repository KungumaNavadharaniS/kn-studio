# Kunguma Navadharani — Digital Studio Portfolio

A cinematic, scroll-driven portfolio built with React, Vite, and GSAP
ScrollTrigger. Instead of stacked content blocks, the site is framed as
one continuous walk through a studio: desk → about wall → works wall →
door.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. To build for production:

```bash
npm run build
npm run preview   # serve the production build locally to check it
```

## Structure

```
src/
  assets/            reference room photos + placeholder project thumbnails
    projects/        per-category project thumbnails (swap these for real work)
  components/        Navbar, HeroScene, AboutScene, WorksScene, ProjectCard,
                      ProjectGallery, ConnectScene, ContactModal,
                      SceneTransition, Footer — one file + one CSS file each
  data/projects.js   the single source of truth for every project shown
                      in the Works gallery
  hooks/useSmoothScroll.js   wires Lenis into GSAP's ticker so
                      ScrollTrigger stays in sync with eased scrolling
  styles/tokens.css  color, type and spacing tokens used everywhere
```

## Adding your real project images

Open `src/data/projects.js`. Each category (`websites`, `businesscards`,
`posters`, `brochures`, `packaging`, `branding`) is a plain array —
add, remove, or reorder entries freely:

```js
websites: [
  { id: "web-4", title: "New Client Site", tag: "Web App", image: img("my-new-shot.jpg") },
],
```

Drop the actual image file into `src/assets/projects/` with that
filename and it will show up automatically in the gallery — no other
code changes needed.

## Swapping the room photography

The four large scene backgrounds live in `src/assets/`:
`hero-studio.jpeg`, `about-character.jpg`, `works-wall.jpeg`,
`door-hallway.jpeg`. Replace any of them (keep the same filename, or
update the `import` at the top of the matching scene component) with a
higher-resolution version of your own studio photography whenever you
have one — they're already compressed for the web, so re-export any
replacement at a similar file size (150–300KB) to keep load times fast.

## Resume

`View Resume` currently links to `/resume.pdf`. Drop your resume PDF
into the `public/` folder as `resume.pdf` and the link will work as-is.

## Notes on the interaction design

- **Scroll:** Lenis smooths the raw scroll input; GSAP ScrollTrigger
  reads that smoothed position to scrub background scale/opacity so
  each scene feels like a camera move rather than a page jump.
- **Works wall cards:** tilt toward the cursor with GSAP, using
  `perspective` + `rotateX/rotateY`, and open a full-screen gallery
  scene (not a route) built from `data/projects.js`.
- **Door:** hover intensifies the warm light and a soft glow; clicking
  opens the contact form using the same `SceneTransition` mechanic as
  the project gallery, so both overlays feel like part of one system.
- **Reduced motion:** `useSmoothScroll` skips Lenis entirely when
  `prefers-reduced-motion` is set, and `tokens.css` clamps animation/
  transition durations globally as a second line of defense.
- **Contact form:** currently just shows a confirmation message on
  submit. Wire `handleSubmit` in `ContactModal.jsx` up to Formspree,
  EmailJS, or a small serverless function when you're ready to receive
  real submissions.
