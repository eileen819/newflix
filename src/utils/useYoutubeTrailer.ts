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
    /* if (
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
        const p = playerRef.current;
        const state = p.getPlayerState?.();
        const t = p.getCurrentTime?.();
        if (state === 1 || (typeof t === "number" && t > 0.05)) {
          setHasPlayed(true);
          clearInterval(iv);
        } else if (tries > 20) {
          clearInterval(iv);
        }
      } catch {
        clearInterval(iv);
      }
    }, 100);

    return () => clearInterval(iv); */
    if (
      !showPlayer ||
      !trailerId ||
      hasPlayed ||
      !isReady ||
      !playerRef.current
    )
      return;

    const p = playerRef.current;
    const t = setTimeout(() => {
      try {
        console.log("retry");
        const state = p.getPlayerState?.(); // -1,0,1,2,3,5
        const cur = p.getCurrentTime?.(); // seconds
        if (state === 1 || (typeof cur === "number" && cur > 0.05)) {
          setHasPlayed(true); // ▶ 커버 내리기
        }
        // else: 추가 재시도 없음 (자연 전이 기다림)
      } catch {
        // no-op
      }
    }, 400); // 300~500ms 권장

    return () => clearTimeout(t);
  }, [showPlayer, trailerId, hasPlayed, isReady]);

  return { showPlayer, handleStateChange, hasPlayed, handleReady, isReady };
}
