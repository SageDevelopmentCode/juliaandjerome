"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TRACK_SRC = "/assets/web/luna-amore.mp3";
const VOLUME = 0.35;
const FADE_MS = 1400;
const UNLOCK_KEY = "wedding-music-unlocked";

function isSessionUnlocked() {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

function markSessionUnlocked() {
  try {
    sessionStorage.setItem(UNLOCK_KEY, "1");
  } catch {
    /* private mode */
  }
}

type FadeCancel = () => void;

function clampVolume(value: number) {
  return Math.min(1, Math.max(0, value));
}

function fadeVolume(
  audio: HTMLAudioElement,
  target: number,
  durationMs: number,
  onComplete?: () => void
): FadeCancel {
  const startVol = clampVolume(audio.volume);
  const endVol = clampVolume(target);
  const startTime = performance.now();
  let rafId = 0;
  let cancelled = false;

  const tick = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - startTime) / durationMs);
    audio.volume = clampVolume(startVol + (endVol - startVol) * t);
    if (t < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      audio.volume = endVol;
      onComplete?.();
    }
  };

  rafId = requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

function MusicOnIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function MusicOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
      />
    </svg>
  );
}

function WaveformIcon({ className }: { className?: string }) {
  return (
    <span className={`flex h-5 items-end justify-center gap-[3px] ${className ?? ""}`} aria-hidden>
      <span className="music-wave-bar h-3 w-[2px] rounded-full bg-current" style={{ animationDelay: "0ms" }} />
      <span className="music-wave-bar h-4 w-[2px] rounded-full bg-current" style={{ animationDelay: "120ms" }} />
      <span className="music-wave-bar h-2.5 w-[2px] rounded-full bg-current" style={{ animationDelay: "240ms" }} />
    </span>
  );
}

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fadeCancelRef = useRef<FadeCancel | null>(null);
  const needsUnmuteRef = useRef(true);
  const userWantsMusicRef = useRef(true);
  const audibleRef = useRef(false);
  const [userWantsMusic, setUserWantsMusic] = useState(true);
  const [startFailed, setStartFailed] = useState(false);
  const [isAudible, setIsAudible] = useState(false);

  const cancelFade = useCallback(() => {
    fadeCancelRef.current?.();
    fadeCancelRef.current = null;
  }, []);

  const unmuteInPlace = useCallback(
    (audio: HTMLAudioElement) => {
      cancelFade();
      audio.muted = false;
      audio.volume = 0;
      audibleRef.current = true;
      needsUnmuteRef.current = false;
      setIsAudible(true);
      setStartFailed(false);
      fadeCancelRef.current = fadeVolume(audio, VOLUME, FADE_MS);
      markSessionUnlocked();
    },
    [cancelFade]
  );

  /** Must run synchronously inside click handlers — async play() loses user activation. */
  const unmuteFromGestureSync = useCallback((): boolean => {
    const audio = audioRef.current;
    if (!audio || !userWantsMusicRef.current) return false;
    if (!needsUnmuteRef.current && audibleRef.current) return false;

    if (!audio.paused) {
      unmuteInPlace(audio);
      return true;
    }

    cancelFade();
    audio.muted = true;
    const pending = audio.play();
    pending
      ?.then(() => {
        audio.muted = false;
        audio.volume = 0;
        audibleRef.current = true;
        needsUnmuteRef.current = false;
        setIsAudible(true);
        setStartFailed(false);
        fadeCancelRef.current = fadeVolume(audio, VOLUME, FADE_MS);
        markSessionUnlocked();
      })
      .catch(() => {
        needsUnmuteRef.current = true;
        audibleRef.current = false;
        setIsAudible(false);
        setStartFailed(false);
      });
    return true;
  }, [cancelFade, unmuteInPlace]);

  const syncPlaybackState = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !userWantsMusicRef.current) return;

    const sessionUnlocked = isSessionUnlocked();

    if (!audio.paused && !audio.muted) {
      audibleRef.current = true;
      needsUnmuteRef.current = false;
      setIsAudible(true);
      setStartFailed(false);
      return;
    }

    if (!audio.paused && audio.muted) {
      needsUnmuteRef.current = true;
      audibleRef.current = false;
      setIsAudible(false);
      setStartFailed(false);
      if (sessionUnlocked) {
        unmuteInPlace(audio);
      }
      return;
    }

    needsUnmuteRef.current = true;
    setStartFailed(false);
  }, [unmuteInPlace]);

  useEffect(() => {
    let disposed = false;

    const audio = audioRef.current;
    if (!audio) return;

    const onMediaReady = () => {
      if (disposed) return;
      syncPlaybackState();
    };

    const onPlaying = () => {
      if (disposed) return;
      syncPlaybackState();
    };

    audio.addEventListener("canplay", onMediaReady);
    audio.addEventListener("playing", onPlaying);

    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      syncPlaybackState();
    }

    const removeGestureListeners = () => {
      document.removeEventListener("click", onDocumentClick, true);
    };

    const tryUnmuteSync = () => {
      if (disposed || !needsUnmuteRef.current) return;
      if (unmuteFromGestureSync()) {
        removeGestureListeners();
      }
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (buttonRef.current?.contains(event.target as Node)) return;
      tryUnmuteSync();
    };

    document.addEventListener("click", onDocumentClick, true);

    return () => {
      disposed = true;
      audio.removeEventListener("canplay", onMediaReady);
      audio.removeEventListener("playing", onPlaying);
      removeGestureListeners();
      cancelFade();
    };
  }, [syncPlaybackState, cancelFade, unmuteFromGestureSync]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (needsUnmuteRef.current && userWantsMusicRef.current) {
      unmuteFromGestureSync();
      return;
    }

    if (userWantsMusic && !audio.paused && audibleRef.current) {
      userWantsMusicRef.current = false;
      setUserWantsMusic(false);
      needsUnmuteRef.current = false;
      audibleRef.current = false;
      setIsAudible(false);
      cancelFade();
      fadeCancelRef.current = fadeVolume(audio, 0, FADE_MS, () => {
        audio.volume = 0;
        audio.pause();
        audio.muted = false;
        fadeCancelRef.current = null;
      });
      return;
    }

    userWantsMusicRef.current = true;
    setUserWantsMusic(true);
    setStartFailed(false);
    unmuteFromGestureSync();
  }, [userWantsMusic, cancelFade, unmuteFromGestureSync]);

  const showOnIcon = userWantsMusic && !startFailed;

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACK_SRC}
        loop
        preload="auto"
        autoPlay
        muted
        playsInline
        onError={() => {
          setStartFailed(true);
          setIsAudible(false);
        }}
      />
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-label={showOnIcon ? "Mute background music" : "Play background music"}
        className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/40 bg-olive/85 text-ivory shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-colors hover:bg-olive"
      >
        {!showOnIcon ? (
          <MusicOffIcon className="h-5 w-5" />
        ) : isAudible ? (
          <WaveformIcon />
        ) : (
          <MusicOnIcon className="h-5 w-5" />
        )}
      </button>
    </>
  );
}
