declare global {
  interface Window {
    YT: {
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Player: any; // 필요하면 더 구체적으로 선언 가능
    };
  }
}

export {};
