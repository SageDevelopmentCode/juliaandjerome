"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const optionalText = z.string().trim().max(2000).optional();

const rsvpSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  address: optionalText,
  attending: z.enum(["yes", "maybe", "no"]),
  arrival: optionalText,
  travelAfter: optionalText,
  dietary: optionalText,
  hasValidPassport: z.enum(["yes", "no"]),
  passportExpiry: optionalText,
  questions: optionalText,
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

export type RsvpResult =
  | { success: true }
  | { success: false; error: string };

const orNull = (value: string | undefined) => value?.trim() || null;

export async function submitRsvp(data: RsvpInput): Promise<RsvpResult> {
  const parsed = rsvpSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data. Please check your entries." };
  }

  const d = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.from("rsvp_responses").insert({
    name: d.name,
    email: d.email,
    address: orNull(d.address),
    attending: d.attending,
    arrival: orNull(d.arrival),
    travel_after: orNull(d.travelAfter),
    dietary: orNull(d.dietary),
    has_valid_passport: d.hasValidPassport === "yes",
    passport_expiry: orNull(d.passportExpiry),
    questions: orNull(d.questions),
  });

  if (error) {
    console.error("RSVP insert error:", error);
    return {
      success: false,
      error: "Something went wrong — please try again.",
    };
  }

  return { success: true };
}
