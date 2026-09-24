import { useRef } from "react";
import { isVideoSrc } from "./mediaUtils";
import "./ProjectCard.css";

// Small vertical thumbnail used in the gallery viewer's side rail so
// visitors can jump between multiple images (or videos) of the same
// work item.
export default function ProjectCard({ image, active, label, onClick }) {
  const videoRef = useRef(null);
  const isVideo = isVideoSrc(image);

  // Videos don't show a frame until some data has loaded, so nudge the
  // playhead a touch once metadata is ready — this makes the thumbnail
  // display an actual frame instead of a blank/black box.
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.currentTime = Math.min(0.1, video.duration || 0);
    } catch {
      // Some browsers can throw if the video isn't seekable yet — safe to ignore.
    }
  };

  return (
    <button
      type="button"
      className={`gallery-thumb ${active ? "is-active" : ""}`}
      onClick={onClick}
      aria-label={label || "View image"}
      aria-pressed={active}
    >
      {image ? (
        isVideo ? (
          <>
            <video
              ref={videoRef}
              src={image}
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={handleLoadedMetadata}
              aria-hidden="true"
            />
            <span className="gallery-thumb__play" aria-hidden="true">
              ▶
            </span>
          </>
        ) : (
          <img src={image} alt="" aria-hidden="true" />
        )
      ) : (
        <span className="gallery-thumb__placeholder" />
      )}
    </button>
  );
}