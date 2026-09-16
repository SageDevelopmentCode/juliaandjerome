import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type RsvpResponse = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  passport_expires_before_2028: boolean;
  attending: "yes" | "maybe" | "no";
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

function attendingLabel(value: RsvpResponse["attending"]) {
  switch (value) {
    case "yes":
      return "Yes";
    case "maybe":
      return "Maybe";
    case "no":
      return "No";
  }
}

function attendingStyle(value: RsvpResponse["attending"]) {
  switch (value) {
    case "yes":
      return "bg-forest/10 text-forest";
    case "maybe":
      return "bg-cream text-forest/80";
    case "no":
      return "bg-taupe/20 text-forest/60";
  }
}

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
      <p className="text-center text-sm text-sage-deep">
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
          <div
            key={stat.label}
            className="rounded-[2px] border border-forest/10 bg-paper-deep px-5 py-4 text-center"
          >
            <p className="font-serif text-xs uppercase tracking-[0.25em] text-forest/50">
              {stat.label}
            </p>
            <p className="font-heading mt-2 text-3xl text-forest">{stat.value}</p>
          </div>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="text-center text-forest/60">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-[2px] border border-forest/10">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-forest/10 bg-paper-deep">
                <th className="px-4 py-3 font-serif text-xs uppercase tracking-[0.2em] text-forest/50">
                  Date
                </th>
                <th className="px-4 py-3 font-serif text-xs uppercase tracking-[0.2em] text-forest/50">
                  Name
                </th>
                <th className="px-4 py-3 font-serif text-xs uppercase tracking-[0.2em] text-forest/50">
                  Email
                </th>
                <th className="px-4 py-3 font-serif text-xs uppercase tracking-[0.2em] text-forest/50">
                  Attending
                </th>
                <th className="px-4 py-3 font-serif text-xs uppercase tracking-[0.2em] text-forest/50">
                  Passport
                </th>
                <th className="px-4 py-3 font-serif text-xs uppercase tracking-[0.2em] text-forest/50">
                  Address
                </th>
                <th className="px-4 py-3 font-serif text-xs uppercase tracking-[0.2em] text-forest/50">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-forest/5 last:border-0"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-forest/70">
                    {formatDate(row.created_at)}
                  </td>
                  <td className="px-4 py-3 font-serif text-forest">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-forest/70">{row.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-serif uppercase tracking-wider ${attendingStyle(row.attending)}`}
                    >
                      {attendingLabel(row.attending)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-forest/70">
                    {row.passport_expires_before_2028 ? (
                      <span className="text-sage-deep">Expires before 2028</span>
                    ) : (
                      "OK"
                    )}
                  </td>
                  <td className="max-w-[200px] px-4 py-3 text-forest/70">
                    {row.address ?? "—"}
                  </td>
                  <td className="max-w-[200px] px-4 py-3 text-forest/70">
                    {row.note ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
