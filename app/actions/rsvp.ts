"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const rsvpSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    passportExpiresBefore2028: z.enum(["yes", "no"]),
    attending: z.enum(["yes", "maybe", "no"]),
    address: z.string().optional(),
    note: z.string().optional(),
  })
  .refine(
    (d) =>
      d.attending === "no" ||
      (d.address !== undefined && d.address.trim().length >= 5),
    { path: ["address"] }
  );

export type RsvpInput = z.infer<typeof rsvpSchema>;

export type RsvpResult =
  | { success: true }
  | { success: false; error: string };

export async function submitRsvp(data: RsvpInput): Promise<RsvpResult> {
  const parsed = rsvpSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data. Please check your entries." };
  }

  const { name, email, passportExpiresBefore2028, attending, address, note } =
    parsed.data;

  const supabase = await createClient();

  const { error } = await supabase.from("rsvp_responses").insert({
    name,
    email,
    passport_expires_before_2028: passportExpiresBefore2028 === "yes",
    attending,
    address: address?.trim() || null,
    note: note?.trim() || null,
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
