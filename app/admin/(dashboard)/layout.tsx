import { signOut } from "@/app/actions/auth";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-forest/10 bg-paper-deep">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-10">
          <div>
            <span className="label text-sage-deep">admin</span>
            <h1 className="font-heading mt-1 text-2xl text-forest md:text-3xl">
              RSVP Submissions
            </h1>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="font-serif text-xs uppercase tracking-[0.25em] text-forest/60 transition-colors hover:text-forest"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 md:px-10">{children}</main>
    </div>
  );
}
