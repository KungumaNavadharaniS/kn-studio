import { useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProjectGallery from "./ProjectGallery";

import sampleWall from "../assets/sample wall.png";

// =====================================================
// WORK PREVIEW IMAGES
// =====================================================

import websiteImg from "../assets/website (3).png";
import businessCardImg from "../assets/Business card.png";
import posterImg from "../assets/poster (2).png";
import brochureImg from "../assets/Brochures.png";
import brandingImg from "../assets/Branding (2).png";
import customDesignImg from "../assets/custom design (2).png";

// =====================================================
// WORK PREVIEW VIDEOS (used inside the gallery viewer)
// =====================================================

import websiteVideoLaunch from "../assets/lanuch.mp4";
import websiteVideo1 from "../assets/video1.mp4";
import websiteVideoFeedback from "../assets/feedback.mp4";

// =====================================================
// GALLERY PHOTOS (shown inside the accordion viewer)
// =====================================================
// import.meta.glob only pulls in files that actually exist on disk,
// so the build never breaks just because a category doesn't have its
// photos yet — that category's gallery simply falls back to the
// "MORE WORK COMING SOON" state until you add them.
//
// Save each photo as `<category>-<number>.<ext>` in src/assets — e.g.
// business-card-1.png, business-card-2.jpg, poster-1.webp — and it
// will show up automatically, sorted by that number. png/jpg/jpeg/webp
// all work, in either case.

const galleryPhotoModules = import.meta.glob(
  "../assets/{business-card,poster,brochure,branding,custom-design}-*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  { eager: true, import: "default" }
);

function getCategoryPhotos(prefix) {
  return Object.keys(galleryPhotoModules)
    .filter((path) => path.includes(`/${prefix}-`))
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    )
    .map((path) => galleryPhotoModules[path]);
}

import "./WorksScene.css";

gsap.registerPlugin(ScrollTrigger);


// =====================================================
// WORK CATEGORIES
// =====================================================

const WORKS = [
  {
    id: "website",
    title: "WEBSITES",
    description: "Websites & interactive experiences",
    // Shown as the static thumbnail on the wall frame.
    images: [websiteImg],
    // Shown inside the gallery viewer when this frame is opened —
    // all three demo videos, browsable via the thumbnail rail /
    // arrows / dots just like an image gallery would be.
    media: [websiteVideoLaunch, websiteVideo1, websiteVideoFeedback],
  },

  {
    id: "business-card",
    title: "BUSINESS CARDS",
    description: "Professional identity designs",
    images: [businessCardImg],
    media: getCategoryPhotos("business-card"),
  },

  {
    id: "poster",
    title: "POSTERS",
    description: "Creative poster designs",
    images: [posterImg],
    media: getCategoryPhotos("poster"),
  },

  {
    id: "brochure",
    title: "BROCHURES",
    description: "Brochure & catalog designs",
    images: [brochureImg],
    media: getCategoryPhotos("brochure"),
  },

  {
    id: "branding",
    title: "BRANDING",
    description: "Complete brand identity",
    images: [brandingImg],
    media: getCategoryPhotos("branding"),
  },

  {
    id: "custom-design",
    title: "CUSTOM DESIGN",
    description: "Creative custom design work",
    images: [customDesignImg],
    media: getCategoryPhotos("custom-design"),
  },
];


// =====================================================
// WORKS SCENE
// =====================================================

export default function WorksScene() {
  const root = useRef(null);

  const [selectedWork, setSelectedWork] = useState(null);
  const [failedPreviews, setFailedPreviews] = useState(() => new Set());


  // ===================================================
  // FRAME ENTRANCE ANIMATION
  // ===================================================

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".works-frame", {
        opacity: 0,
        y: 25,
        scale: 0.96,

        duration: 0.7,

        stagger: 0.08,

        ease: "power3.out",

        scrollTrigger: {
          trigger: root.current,

          start: "top 75%",

          once: true,
        },
      });

    }, root);

    return () => ctx.revert();

  }, []);


  // ===================================================
  // OPEN PROJECT
  // ===================================================

  const openWork = (work) => {
    setSelectedWork(work);
  };


  // ===================================================
  // CLOSE PROJECT
  // ===================================================

  const closeWork = () => {
    setSelectedWork(null);
  };


  // ===================================================
  // JSX
  // ===================================================

  return (
    <>
      <section
        ref={root}
        className="works-scene"
        id="works"
      >

        {/* =============================================
            WALL BACKGROUND
        ============================================= */}

        <div
          className="works-scene__background"
          style={{
            backgroundImage: `url("${sampleWall}")`,
          }}
        />


        {/* =============================================
            DARK OVERLAY
        ============================================= */}

        <div className="works-scene__overlay" />


        {/* =============================================
            MAIN WALL CONTENT
        ============================================= */}

        <div className="works-wall-content">


          {/* ===========================================
              SECTION TITLE
          =========================================== */}

          <div className="works-wall-title">

            <span>04</span>

            <h2>
              SAMPLE WORKS
            </h2>

          </div>


          {/* ===========================================
              WORK FRAME GRID
          =========================================== */}

          <div className="works-frame-grid">

            {WORKS.map((work) => {

              const previewImage =
                work.images?.[0] || null;

              const previewFailed = failedPreviews.has(work.id);


              return (

                <button
                  key={work.id}

                  className="works-frame"

                  onClick={() =>
                    openWork(work)
                  }

                  aria-label={`Open ${work.title}`}
                >


                  {/* =================================
                      IMAGE
                  ================================= */}

                  <div className="works-frame__image">

                    {previewImage && !previewFailed ? (

                      <img
                        src={previewImage}
                        alt={work.title}
                        onError={() =>
                          setFailedPreviews((prev) => {
                            const next = new Set(prev);
                            next.add(work.id);
                            return next;
                          })
                        }
                      />

                    ) : (

                      <div className="works-frame__placeholder">

                        IMAGE NOT FOUND

                      </div>

                    )}

                  </div>


                  {/* =================================
                      FRAME CONTENT
                  ================================= */}

                  <div className="works-frame__content">

                    <h3>
                      {work.title}
                    </h3>


                    <p>
                      {work.description}
                    </p>


                    <span className="works-frame__view">

                      CLICK TO EXPLORE →

                    </span>

                  </div>

                </button>

              );

            })}

          </div>

        </div>

      </section>


      {/* =============================================
          PROJECT GALLERY
      ============================================= */}

      {selectedWork && (

        <ProjectGallery
          key={selectedWork.id}
          work={selectedWork}
          onClose={closeWork}
        />

      )}

    </>
  );
}