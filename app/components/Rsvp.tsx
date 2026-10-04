"use client";

import { useState, type ReactNode } from "react";
import { useForm, useWatch, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { InitialTitle } from "@/app/components/ui";
import { cn, EASE_SOFT } from "@/lib/utils";
import { couple, event, rsvp } from "@/app/data/content";
import { submitRsvp } from "@/app/actions/rsvp";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name(s)"),
  email: z.string().trim().email("Please enter a valid email"),
  address: z.string().optional(),
  attending: z.enum(["yes", "maybe", "no"], { message: "Please choose an option" }),
  arrival: z.string().optional(),
  travelAfter: z.string().optional(),
  dietary: z.string().optional(),
  hasValidPassport: z.enum(["yes", "no"], { message: "Please let us know about your passport" }),
  passportExpiry: z.string().optional(),
  questions: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const field =
  "text-body mt-2 w-full border-0 border-b border-ivory/35 bg-transparent pb-1.5 pt-1 font-mono text-ivory placeholder:text-ivory/35 transition-colors focus:border-ivory focus:outline-none";

function googleCalendarUrl() {
  const start = new Date(event.dateISO);
  const end = new Date(start.getTime() + 9 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${couple.combined} Wedding`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: "We can't wait to celebrate with you in Lake Como!",
    location: `${event.venueName}, ${event.venueCity}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function Question({
  n,
  label,
  htmlFor,
  error,
  children,
}: {
  n: number;
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1.6rem_1fr]">
      <span className="text-body pt-px font-mono md:text-base">{n}.</span>
      <div>
        {htmlFor ? (
          <label htmlFor={htmlFor} className="text-body font-mono md:text-base">
            {label}
          </label>
        ) : (
          <p className="text-body font-mono md:text-base">{label}</p>
        )}
        {children}
        {error && <p className="mt-1.5 font-mono text-xs text-[#f2c9b8]">{error}</p>}
      </div>
    </div>
  );
}

function Choice({
  value,
  selected,
  register,
  children,
}: {
  value: string;
  selected: boolean;
  register: UseFormRegisterReturn;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "text-body flex cursor-pointer items-start gap-3 rounded-sm border px-3 py-2 font-mono transition-colors",
        selected ? "border-ivory bg-ivory text-olive" : "border-ivory/25 hover:border-ivory/60"
      )}
    >
      <input type="radio" value={value} {...register} className="sr-only" />
      {children}
    </label>
  );
}

export default function Rsvp() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const attending = useWatch({ control, name: "attending" });
  const hasValidPassport = useWatch({ control, name: "hasValidPassport" });

  async function onSubmit(data: FormValues) {
    setSubmitError(null);
    const result = await submitRsvp(data);
    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error);
    }
  }

  return (
    <section id="rsvp" className="scroll-mt-16 border-t-[18px] border-sand bg-olive text-ivory">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:px-10 md:py-24">
        <h2 aria-label="RSVP" className="relative mx-auto flex items-center justify-center select-none">
          <span aria-hidden className="text-rsvp-flourish font-script absolute -left-[0.3em] top-1/2 -translate-y-[56%] leading-none">
            R
          </span>
          <span aria-hidden className="text-rsvp-lockup font-display relative pl-[0.55em]">
            SVP
          </span>
        </h2>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE_SOFT }}
              className="text-center md:text-left"
            >
              <InitialTitle
                as="span"
                initial="T"
                rest="hank you"
                className="text-rsvp-thanks justify-center md:justify-start"
              />
              <p className="mt-5 font-mono text-sm leading-relaxed">
                Your soft RSVP has been received. We&apos;ll be in touch with more details as the
                date gets closer. We can&apos;t wait to celebrate with you in Lake Como!
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 md:items-start">
                <a
                  href={googleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ivory px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-olive transition-opacity hover:opacity-85"
                >
                  Add to calendar
                </a>
                <button
                  onClick={() => {
                    reset();
                    setSubmitted(false);
                  }}
                  className="font-mono text-xs uppercase tracking-[0.2em] underline-offset-4 hover:underline"
                >
                  Submit another response
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              noValidate
              className="space-y-6"
            >
              <Question n={1} label="Guests Name:" htmlFor="rsvp-name" error={errors.name?.message}>
                <input id="rsvp-name" {...register("name")} className={field} autoComplete="name" placeholder="Full name(s)" />
              </Question>

              <Question n={2} label="Email:" htmlFor="rsvp-email" error={errors.email?.message}>
                <input
                  id="rsvp-email"
                  type="email"
                  {...register("email")}
                  className={field}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </Question>

              <Question
                n={3}
                label="Mailing address (so we can send your invitation):"
                htmlFor="rsvp-address"
              >
                <input
                  id="rsvp-address"
                  {...register("address")}
                  className={field}
                  autoComplete="street-address"
                  placeholder="Street, city, state, ZIP"
                />
              </Question>

              <Question n={4} label="Are you thinking of joining us at Lake Como?" error={errors.attending?.message}>
                <div className="mt-3 space-y-2">
                  <Choice value="yes" selected={attending === "yes"} register={register("attending")}>
                    <span aria-hidden>💚</span> Yes — we’re hoping to be there!
                  </Choice>
                  <Choice value="maybe" selected={attending === "maybe"} register={register("attending")}>
                    <span aria-hidden>💛</span> Maybe — we’re still figuring things out
                  </Choice>
                  <Choice value="no" selected={attending === "no"} register={register("attending")}>
                    <span aria-hidden>🤍</span> Unfortunately, we don’t think we’ll be able to make it
                  </Choice>
                </div>
              </Question>

              <Question n={5} label="When are you thinking of arriving?" htmlFor="rsvp-arrival">
                <input id="rsvp-arrival" {...register("arrival")} className={field} placeholder="e.g. Saturday, October 2" />
              </Question>

              <Question n={6} label="Are you planning to travel anywhere after the wedding?" htmlFor="rsvp-after">
                <input id="rsvp-after" {...register("travelAfter")} className={field} placeholder="e.g. Rome & the Amalfi Coast" />
              </Question>

              <Question n={7} label="Dietary Requirements?" htmlFor="rsvp-dietary">
                <input id="rsvp-dietary" {...register("dietary")} className={field} placeholder="Allergies, vegetarian, etc." />
              </Question>

              <Question
                n={8}
                label="Do you currently have a valid passport? When does your passport expire?"
                error={errors.hasValidPassport?.message}
              >
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Choice value="yes" selected={hasValidPassport === "yes"} register={register("hasValidPassport")}>
                    Yes, I do
                  </Choice>
                  <Choice value="no" selected={hasValidPassport === "no"} register={register("hasValidPassport")}>
                    Not yet
                  </Choice>
                </div>
                <label htmlFor="rsvp-expiry" className="sr-only">
                  Passport expiry
                </label>
                <input
                  id="rsvp-expiry"
                  {...register("passportExpiry")}
                  className={field}
                  placeholder="Expiry date (e.g. 03/2031)"
                />
              </Question>

              <Question
                n={9}
                label="What questions do you have about the wedding or traveling to Italy? We'd love to help!"
                htmlFor="rsvp-questions"
              >
                <textarea id="rsvp-questions" rows={3} {...register("questions")} className={cn(field, "resize-none")} />
              </Question>

              {submitError && <p className="font-mono text-sm text-[#f2c9b8]">{submitError}</p>}

              <div className="pl-[1.6rem]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-ivory py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-olive transition-opacity hover:opacity-85 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : `Send soft RSVP · due ${rsvp.dueBy}`}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
