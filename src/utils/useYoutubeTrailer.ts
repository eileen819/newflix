import { useCallback, useEffect, useRef, useState } from "react";

interface IYoutubeStateEvent {
  data: number;
}

interface IUseYoutubeTrailerProp {
  detailLoading: boolean;
  trailerId: string | null | undefined;
}

export function useYoutubeTrailer(opts: IUseYoutubeTrailerProp) {
  const { detailLoading, trailerId } = opts;
  const [showPlayer, setShowPlayer] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isReady, setIsReady] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReady = useCallback((e: any) => {
    playerRef.current = e.target;
    setIsReady(true);
    try {
      console.log("[YT] ready");
      e.target.mute?.();
      e.target.playVideo?.();
    } catch {
      console.log("onReady error");
    }
  }, []);

  const handleStateChange = useCallback((event: IYoutubeStateEvent) => {
    if (event.data === 1) setHasPlayed(true);
    console.log(event.data);
  }, []);

  useEffect(() => {
    setHasPlayed(false);
    setIsReady(false);
  }, [trailerId]);

  useEffect(() => {
    if (!detailLoading && trailerId) {
      const delay = setTimeout(() => setShowPlayer(true), 150);
      return () => clearTimeout(delay);
    } else {
      setShowPlayer(false);
      setHasPlayed(false);
      setIsReady(false);
    }
  }, [detailLoading, trailerId]);

  useEffect(() => {
    if (
      !showPlayer ||
      !trailerId ||
      hasPlayed ||
      !isReady ||
      !playerRef.current
    )
      return;
    let tries = 0;
    const iv = setInterval(() => {
      tries += 1;
      try {
        console.log("retry playing");
        const p = playerRef.current;
        const state = p.getPlayerState?.();
        const t = p.getCurrentTime?.(); // 초 단위
        // 아무 신호나 먼저 오면 hasPlayed 확정
        if (state === 1 || (typeof t === "number" && t > 0.05)) {
          setHasPlayed(true);
          clearInterval(iv);
          console.log("retry success");
        } else if (tries > 20) {
          // 20 * 100ms = 2s 한도
          clearInterval(iv);
        }
      } catch {
        clearInterval(iv);
      }
    }, 100);

    return () => clearInterval(iv);
  }, [showPlayer, trailerId, hasPlayed, isReady]);

  return { showPlayer, handleStateChange, handleReady, hasPlayed, isReady };
}
