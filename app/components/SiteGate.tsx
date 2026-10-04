"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { verifySitePassword } from "@/app/actions/site-gate";
import { ScriptInitialWord } from "@/app/components/ui";
import { couple, event, images } from "@/app/data/content";
import { EASE_SOFT } from "@/lib/utils";

const UNLOCK_FLAG = "site-gate-unlocked";

const fieldBase =
  "w-full border-0 border-b border-ivory/50 bg-transparent pb-2 pt-1 text-left font-mono text-ivory placeholder:text-ivory/40 focus:border-ivory focus:outline-none transition-colors";
const labelBase =
  "font-mono text-xs uppercase tracking-[0.2em] text-ivory/70";

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1 1 0 0 1 0-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

export default function SiteGate() {
  const router = useRouter();
  const pendingRefresh = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [shake, setShake] = useState(false);
  const [phase, setPhase] = useState<"idle" | "exiting">("idle");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    const result = await verifySitePassword(password);

    if (!result.success) {
      setError(result.error);
      setShake(true);
      setIsSubmitting(false);
      return;
    }

    sessionStorage.setItem(UNLOCK_FLAG, "1");
    pendingRefresh.current = true;
    setPhase("exiting");
  }

  function handleExitComplete() {
    if (!pendingRefresh.current) return;
    pendingRefresh.current = false;
    router.refresh();
  }

  const exitDuration = reduceMotion ? 0.35 : 0.9;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex min-h-[100svh] flex-col overflow-hidden bg-olive text-ivory origin-center"
      initial={false}
      animate={
        phase === "exiting"
          ? reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 1.04 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: exitDuration, ease: EASE_SOFT }}
      onAnimationComplete={handleExitComplete}
    >
      {reduceMotion ? (
        <div className="absolute inset-0">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[66%_60%] md:object-[50%_60%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-olive/50 via-olive/25 to-olive/55" />
        </div>
      ) : (
        <>
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={images.video}
            poster={images.videoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-olive/45 via-olive/20 to-olive/50" />
        </>
      )}

      <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <p className="text-shadow-photo font-mono text-xs uppercase tracking-[0.22em] md:text-sm">
          Lake Como · October 6, 2027
        </p>

        <h1 className="text-shadow-photo mt-6 flex max-w-[min(100%,42rem)] flex-nowrap items-center justify-center gap-x-[clamp(0.75rem,4vw,3rem)] text-[clamp(2.25rem,8vw,4.5rem)] leading-[1.05]">
          <span className="shrink-0 whitespace-nowrap">
            <ScriptInitialWord
              word={couple.first}
              variant="name"
              initialClassName="-mr-[0.06em] overflow-visible pl-[0.08em]"
            />
          </span>
          <span className="font-display shrink-0 text-[0.38em] leading-none">+</span>
          <span className="shrink-0 whitespace-nowrap">
            <ScriptInitialWord
              word={couple.second}
              variant="name"
              initialClassName="-mr-[0.06em] overflow-visible pl-[0.08em]"
            />
          </span>
        </h1>

        <p className="text-shadow-photo mt-4 max-w-sm font-mono text-sm text-ivory/85">
          Enter the password from your invitation to view our wedding site.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-xs"
          animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
          onAnimationComplete={() => setShake(false)}
        >
          <div>
            <label className={labelBase} htmlFor="site-gate-password">
              Password
            </label>
            <div className="relative mt-4">
              <input
                id="site-gate-password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="off"
                autoFocus
                disabled={phase === "exiting"}
                className={`${fieldBase} pr-8`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-0 bottom-2 text-ivory/50 transition-colors hover:text-ivory"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-shadow-photo mt-4 font-mono text-sm text-ivory">{error}</p>
          )}

          <div className="mt-8 rounded-sm bg-olive/40 p-1 backdrop-blur-sm">
            <button
              type="submit"
              disabled={isSubmitting || phase === "exiting"}
              className="w-full bg-ivory px-8 py-3 font-mono text-xs uppercase tracking-[0.28em] text-olive shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-[filter,transform] hover:brightness-95 active:scale-[0.98] disabled:opacity-60"
            >
              {isSubmitting || phase === "exiting" ? "Checking…" : "Enter"}
            </button>
          </div>
        </motion.form>

        <p className="text-shadow-photo mt-8 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ivory/50">
          {event.venueCity}
        </p>
      </div>
    </motion.div>
  );
}
