// Shared helper so the gallery components can tell whether a given
// media source is a video (mp4/webm/mov/etc.) or a plain image, just
// by looking at the file extension. This lets WorksScene mix images
// and videos in the same `images`/`media` array without any extra
// per-item metadata.
export function isVideoSrc(src) {
    if (!src) return false;
    return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(src);
  }