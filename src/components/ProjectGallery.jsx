import { useEffect, useRef, useState } from "react";
import SceneTransition from "./SceneTransition";
import { isVideoSrc } from "./mediaUtils";
import "./ProjectGallery.css";

// `work` comes straight from WorksScene: { id, title, description, images: [] }
// No external data file is required — everything the gallery needs is
// passed in directly, so adding a new work category is just one object
// in WorksScene's WORKS array.
//
// A work item can optionally carry a `media` array instead of (or in
// addition to) `images` — this is what the gallery actually browses,
// and its entries can be image files or video files (mp4/webm/mov/...),
// detected automatically by extension. `images` alone still works for
// image-only categories, since the gallery falls back to it.
//
// Layout: a whole category is either all-video or all-image, so the
// stage picks one of two display modes for the category:
//   - VIDEO categories keep the horizontal "accordion" of panels, one
//     per item. The active panel expands to fill most of the width and
//     autoplays; the rest collapse into narrow clickable strips.
//   - IMAGE categories render as a single flat full-bleed image with
//     no side strips at all — switching items is done purely with the
//     prev/next arrows and the dots below.
export default function ProjectGallery({ work, onClose }) {
  const [closing, setClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [erroredIndexes, setErroredIndexes] = useState(() => new Set());
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const videoRefs = useRef({});
  const imageStageRef = useRef(null);

  const images = work?.media || work?.images || [];
  const hasImages = images.length > 0;
  const hasMultiple = images.length > 1;
  const isVideoCategory = hasImages && isVideoSrc(images[0]);

  const requestClose = () => {
    setClosing(true);
  };

  const handleCloseAnimation = () => {
    setClosing(false);
    onClose();
  };

  const goPrev = () => {
    if (!hasMultiple) return;
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const goNext = () => {
    if (!hasMultiple) return;
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const markImageErrored = (index) => {
    setErroredIndexes((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const toggleImageFullscreen = () => {
    const el = imageStageRef.current;
    if (!el) return;

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el.requestFullscreen?.();
    }
  };

  // Keep the icon in sync if the visitor exits fullscreen with Esc or
  // their browser's own controls, not just our button.
  useEffect(() => {
    const handleChange = () => {
      setIsImageFullscreen(
        Boolean(document.fullscreenElement) &&
          document.fullscreenElement === imageStageRef.current
      );
    };

    document.addEventListener("fullscreenchange", handleChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  // Only the enlarged (active) panel's video should ever be playing.
  // Every time activeIndex changes, explicitly pause every other video
  // (switching panels does NOT automatically stop the one that was
  // playing) and autoplay the newly active one — including right when
  // the gallery first opens on a video.
  useEffect(() => {
    if (!isVideoCategory) return;

    Object.entries(videoRefs.current).forEach(([indexKey, video]) => {
      if (!video) return;

      if (Number(indexKey) === activeIndex) {
        video.currentTime = 0;

        const attempt = video.play();
        if (attempt !== undefined) {
          attempt.catch(() => {
            // Autoplay with sound was blocked by the browser — fall
            // back to a muted autoplay so it still plays; the visitor
            // can unmute it themselves from the native controls.
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      } else {
        video.pause();

        try {
          video.currentTime = Math.min(0.15, video.duration || 0);
        } catch {
          // Ignore — not seekable yet.
        }
      }
    });
  }, [activeIndex, isVideoCategory]);

  return (
    <div
      className="gallery-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${work?.title || "Project"} gallery`}
    >
      <SceneTransition closing={closing} onClose={handleCloseAnimation}>
        <div className="gallery-viewer">

          {/* =========================================
              TOP BAR
          ========================================= */}

          <header className="gallery-viewer__bar">

            <div className="gallery-viewer__brand">
              <span className="gallery-viewer__dot" />
              <span>{work?.title || "PROJECT"}</span>
            </div>

            <div className="gallery-viewer__actions">

              <button
                type="button"
                className="gallery-viewer__icon-btn"
                onClick={goPrev}
                disabled={!hasMultiple}
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                type="button"
                className="gallery-viewer__icon-btn"
                onClick={goNext}
                disabled={!hasMultiple}
                aria-label="Next image"
              >
                ›
              </button>

              <button
                type="button"
                className="gallery-viewer__icon-btn gallery-viewer__close"
                onClick={requestClose}
                aria-label="Close gallery"
              >
                ×
              </button>

            </div>

          </header>


          {/* =========================================
              STAGE
          ========================================= */}

          {!hasImages ? (

            <div className="gallery-viewer__empty">
              <h3>MORE WORK COMING SOON</h3>
              <p>
                New {work?.title ? work.title.toLowerCase() : "projects"} will
                be added to this collection.
              </p>
            </div>

          ) : isVideoCategory ? (

            /* ---------- VIDEO: original multi-panel accordion ---------- */

            <div className="gallery-accordion">

              {images.map((src, index) => {
                const active = index === activeIndex;

                const panelProps = active
                  ? {}
                  : {
                      role: "button",
                      tabIndex: 0,
                      onClick: () => setActiveIndex(index),
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveIndex(index);
                        }
                      },
                    };

                return (
                  <div
                    key={`${work.id}-${index}`}
                    className={`accordion-panel ${active ? "is-active" : ""}`}
                    aria-label={`${work.title} preview ${index + 1}`}
                    {...panelProps}
                  >

                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={src}
                      muted={!active}
                      controls={active}
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedMetadata={(e) => {
                        // Give collapsed video panels a real frame
                        // instead of a blank box.
                        if (!active) {
                          try {
                            e.currentTarget.currentTime = Math.min(
                              0.15,
                              e.currentTarget.duration || 0
                            );
                          } catch {
                            // Ignore — not seekable yet.
                          }
                        }
                      }}
                    />

                    {!active && <span className="accordion-panel__dot" />}

                  </div>
                );
              })}

            </div>

          ) : (

            /* ---------- IMAGE: single flat full-bleed image ---------- */

            <div className="gallery-image-stage" ref={imageStageRef}>
              {erroredIndexes.has(activeIndex) ? (
                <div className="gallery-image-stage__error">
                  IMAGE NOT FOUND
                </div>
              ) : (
                <>
                  <img
                    src={images[activeIndex]}
                    alt={`${work.title} preview ${activeIndex + 1}`}
                    onError={() => markImageErrored(activeIndex)}
                  />

                  <button
                    type="button"
                    className="gallery-image-stage__fullscreen"
                    onClick={toggleImageFullscreen}
                    aria-label={
                      isImageFullscreen ? "Exit fullscreen" : "View fullscreen"
                    }
                  >
                    {isImageFullscreen ? "⤡" : "⛶"}
                  </button>
                </>
              )}
            </div>

          )}


          {/* =========================================
              DOTS
          ========================================= */}

          {hasMultiple && (
            <div className="gallery-viewer__dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`gallery-viewer__dotnav ${
                    index === activeIndex ? "is-active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

        </div>
      </SceneTransition>
    </div>
  );
}