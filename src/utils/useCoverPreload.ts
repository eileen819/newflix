import { useEffect, useState } from "react";

export function useCoverPreload(coverSrc: string | undefined) {
  const [coverLoaded, setCoverLoaded] = useState(false);

  useEffect(() => {
    setCoverLoaded(false);
    if (!coverSrc) return;
    const img = new Image();
    img.onload = () => setCoverLoaded(true);
    img.src = coverSrc;
  }, [coverSrc]);

  return coverLoaded;
}
