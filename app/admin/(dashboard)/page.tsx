import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type RsvpResponse = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  attending: "yes" | "maybe" | "no";
  arrival: string | null;
  travel_after: string | null;
  dietary: string | null;
  has_valid_passport: boolean | null;
  passport_expiry: string | null;
  questions: string | null;
  /** v1 fields, only set on submissions made before the redesign. */
  passport_expires_before_2028: boolean | null;
  address: string | null;
  note: string | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const attendingLabel: Record<RsvpResponse["attending"], string> = {
  yes: "Yes",
  maybe: "Maybe",
  no: "No",
};

const attendingStyle: Record<RsvpResponse["attending"], string> = {
  yes: "bg-olive text-ivory",
  maybe: "bg-sand text-cocoa",
  no: "bg-cocoa/10 text-cocoa/70",
};

function passportSummary(row: RsvpResponse) {
  if (row.has_valid_passport === null) {
    if (row.passport_expires_before_2028 === null) return "—";
    return row.passport_expires_before_2028 ? "Expires before 2028" : "OK";
  }
  const status = row.has_valid_passport ? "Valid" : "No passport";
  return row.passport_expiry ? `${status} · exp. ${row.passport_expiry}` : status;
}

const columns = [
  "Date",
  "Name",
  "Email",
  "Address",
  "Attending",
  "Arriving",
  "Travel after",
  "Dietary",
  "Passport",
  "Questions",
];

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: responses, error } = await supabase
    .from("rsvp_responses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch RSVPs:", error);
    return (
      <p className="text-center font-mono text-sm text-cocoa">
        Failed to load submissions. Please try again.
      </p>
    );
  }

  const rows = (responses ?? []) as RsvpResponse[];
  const counts = {
    total: rows.length,
    yes: rows.filter((r) => r.attending === "yes").length,
    maybe: rows.filter((r) => r.attending === "maybe").length,
    no: rows.filter((r) => r.attending === "no").length,
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: counts.total },
          { label: "Yes", value: counts.yes },
          { label: "Maybe", value: counts.maybe },
          { label: "No", value: counts.no },
        ].map((stat) => (
          <div key={stat.label} className="border border-cocoa/15 bg-ivory px-5 py-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cocoa/60">{stat.label}</p>
            <p className="font-display mt-2 text-4xl text-cocoa">{stat.value}</p>
          </div>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="text-center font-mono text-sm text-cocoa/70">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto border border-cocoa/15 bg-ivory">
          <table className="w-full min-w-[1100px] text-left font-mono text-[0.8rem]">
            <thead>
              <tr className="border-b border-cocoa/15 bg-sand/60">
                {columns.map((c) => (
                  <th key={c} className="px-4 py-3 text-[0.7rem] uppercase tracking-[0.15em] text-cocoa/60">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-cocoa/80">
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-cocoa/10 align-top last:border-0">
                  <td className="whitespace-nowrap px-4 py-3">{formatDate(row.created_at)}</td>
                  <td className="px-4 py-3 font-medium text-cocoa">{row.name}</td>
                  <td className="px-4 py-3">{row.email}</td>
                  <td className="max-w-[200px] px-4 py-3">{row.address ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-wider ${attendingStyle[row.attending]}`}
                    >
                      {attendingLabel[row.attending]}
                    </span>
                  </td>
                  <td className="max-w-[160px] px-4 py-3">{row.arrival ?? "—"}</td>
                  <td className="max-w-[180px] px-4 py-3">{row.travel_after ?? "—"}</td>
                  <td className="max-w-[160px] px-4 py-3">{row.dietary ?? "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3">{passportSummary(row)}</td>
                  <td className="max-w-[240px] px-4 py-3">{row.questions ?? row.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
