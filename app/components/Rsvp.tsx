"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { cn, viewportOnce, EASE_SOFT } from "@/lib/utils";
import { couple, event } from "@/app/data/content";
import { submitRsvp } from "@/app/actions/rsvp";

const schema = z
  .object({
    name: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email"),
    passportExpiresBefore2028: z.enum(["yes", "no"], {
      message: "Please let us know about your passport",
    }),
    attending: z.enum(["yes", "maybe", "no"]),
    address: z.string().optional(),
    note: z.string().optional(),
  })
  .refine(
    (d) =>
      d.attending === "no" ||
      (d.address !== undefined && d.address.trim().length >= 5),
    {
      message: "Please enter your mailing address",
      path: ["address"],
    }
  );

type FormValues = z.infer<typeof schema>;

const fieldBase =
  "w-full border-0 border-b border-forest/20 bg-transparent pb-2 pt-1 text-forest placeholder:text-forest/35 focus:border-sage focus:outline-none transition-colors";
const labelBase =
  "font-serif text-xs uppercase tracking-[0.25em] text-forest/55";

function googleCalendarUrl() {
  const start = new Date(event.dateISO);
  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${couple.combined} Wedding`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: "We can't wait to celebrate with you in Lake Como!",
    location: `${event.venueName}, ${event.venueCity}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function PillGroup({
  options,
  value,
  register,
}: {
  options: { value: string; label: string }[];
  value: string | undefined;
  register: ReturnType<ReturnType<typeof useForm<FormValues>>["register"]>;
}) {
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            "flex-1 cursor-pointer rounded-[2px] border px-5 py-4 text-center font-serif text-sm transition-all duration-300",
            value === opt.value
              ? "border-forest bg-forest text-paper"
              : "border-forest/20 text-forest/70 hover:border-forest/50"
          )}
        >
          <input
            type="radio"
            value={opt.value}
            {...register}
            className="sr-only"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

export default function Rsvp() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { attending: "yes" },
  });

  const attending = watch("attending");
  const passportExpiresBefore2028 = watch("passportExpiresBefore2028");

  async function onSubmit(data: FormValues) {
    setSubmitError(null);
    const result = await submitRsvp(data);
    if (!result.success) {
      setSubmitError(result.error);
    }
  }

  return (
    <section id="rsvp" className="relative bg-paper-deep py-28 md:py-36">
      <div className="mx-auto max-w-2xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE_SOFT }}
          className="mb-12 text-center"
        >
          <span className="label text-sage-deep">save the date</span>
          <h2 className="font-heading mt-4 text-5xl text-forest md:text-6xl">
            Soft RSVP
          </h2>
          <p className="mt-5 leading-relaxed text-forest/70">
            Since we&apos;re celebrating abroad, we&apos;re gathering an early
            headcount to help everyone plan. This isn&apos;t final — a formal
            invitation will follow — but your early reply helps us enormously.
          </p>
          <p className="font-serif mt-4 text-sm uppercase tracking-[0.25em] text-forest/50">
            kindly reply by {event.rsvpBy}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSubmitSuccessful ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE_SOFT }}
              className="rounded-[2px] border border-sage/40 bg-paper p-10 text-center md:p-12"
            >
              <h3 className="font-heading text-4xl italic text-forest md:text-5xl">
                Thank You
              </h3>
              <p className="mt-4 text-forest/70">
                Your early response has been received. We cannot wait to
                celebrate with you in Lake Como.
              </p>

              <div className="mx-auto mt-8 max-w-md space-y-4 text-left">
                <p className="font-serif text-xs uppercase tracking-[0.25em] text-sage-deep">
                  Before you go — a few reminders
                </p>
                <ul className="space-y-4 text-sm leading-relaxed text-forest/70">
                  <li>
                    <span className="font-serif text-forest">Check your passport.</span>{" "}
                    Confirm it won&apos;t expire before January 2028 and remains
                    valid for at least 3 months after you leave Italy.
                  </li>
                  <li>
                    <span className="font-serif text-forest">Start watching flights.</span>{" "}
                    Milan Malpensa (MXP) and Milan Linate (LIN) are your best
                    options — we recommend beginning your search in January or
                    February 2027.
                  </li>
                  <li>
                    <span className="font-serif text-forest">
                      Sign up for calendar alerts.
                    </span>{" "}
                    Add the wedding weekend to your calendar now so you
                    don&apos;t miss any updates as plans come together.
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4">
                <a
                  href={googleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-forest px-8 py-3 font-serif text-xs uppercase tracking-[0.25em] text-paper transition-colors duration-300 hover:bg-forest-deep"
                >
                  Add to Calendar
                </a>
                <button
                  onClick={() => reset()}
                  className="font-serif text-xs uppercase tracking-[0.25em] text-sage-deep underline-offset-4 hover:underline"
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
              transition={{ duration: 0.5 }}
              className="space-y-9"
              noValidate
            >
              <div className="grid gap-9 sm:grid-cols-2">
                <div>
                  <label className={labelBase} htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    className={cn(fieldBase, "mt-3")}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-xs text-sage-deep">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelBase} htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={cn(fieldBase, "mt-3")}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-sage-deep">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <span className={labelBase}>
                  Do you have a passport that will expire before January 2028?
                </span>
                <p className="mt-2 text-sm leading-relaxed text-forest/55">
                  Your passport must be valid for at least 3 months beyond the
                  date you plan to leave Italy.
                </p>
                <PillGroup
                  options={[
                    { value: "no", label: "No, I'm good" },
                    { value: "yes", label: "Yes, it will" },
                  ]}
                  value={passportExpiresBefore2028}
                  register={register("passportExpiresBefore2028")}
                />
                {errors.passportExpiresBefore2028 && (
                  <p className="mt-2 text-xs text-sage-deep">
                    {errors.passportExpiresBefore2028.message}
                  </p>
                )}
                {passportExpiresBefore2028 === "yes" && (
                  <p className="mt-3 rounded-[2px] bg-cream/50 px-4 py-3 text-sm text-forest/75">
                    Please renew your passport soon — processing can take
                    several weeks, and you&apos;ll want it valid well beyond the
                    trip.
                  </p>
                )}
              </div>

              <div>
                <span className={labelBase}>
                  Will you and the guest (invited) attend?
                </span>
                <PillGroup
                  options={[
                    { value: "yes", label: "Yes, count us in" },
                    { value: "maybe", label: "Not sure yet" },
                    { value: "no", label: "Sadly, no" },
                  ]}
                  value={attending}
                  register={register("attending")}
                />
              </div>

              <AnimatePresence initial={false}>
                {attending !== "no" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: EASE_SOFT }}
                    className="overflow-hidden"
                  >
                    <label className={labelBase} htmlFor="address">
                      What is your address?
                    </label>
                    <p className="mt-1 text-xs text-forest/45">
                      So we can send your formal invitation.
                    </p>
                    <textarea
                      id="address"
                      rows={2}
                      {...register("address")}
                      className={cn(fieldBase, "mt-3 resize-none")}
                      placeholder="Street, City, State/Province, Postal Code, Country"
                    />
                    {errors.address && (
                      <p className="mt-2 text-xs text-sage-deep">
                        {errors.address.message}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className={labelBase} htmlFor="note">
                  A Note for the Couple
                </label>
                <textarea
                  id="note"
                  rows={3}
                  {...register("note")}
                  className={cn(fieldBase, "mt-3 resize-none")}
                  placeholder="Send your love..."
                />
              </div>

              {submitError && (
                <p className="text-center text-sm text-sage-deep">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-forest py-4 font-serif text-xs uppercase tracking-[0.3em] text-paper transition-colors duration-300 hover:bg-forest-deep disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Soft RSVP"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
