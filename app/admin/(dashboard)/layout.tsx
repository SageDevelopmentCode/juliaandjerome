import { signOut } from "@/app/actions/auth";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sand">
      <header className="bg-olive text-ivory">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-ivory/70">admin</span>
            <h1 className="font-display mt-1 text-3xl md:text-4xl">RSVP Submissions</h1>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="font-mono text-xs uppercase tracking-[0.2em] text-ivory/75 transition-colors hover:text-ivory"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-10">{children}</main>
    </div>
  );
}
